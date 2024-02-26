import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import {
  updateDoc,
  deleteDoc,
  doc,
  arrayRemove,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../FirebaseConfig";

export default function DeleteChannelModal({ channel, currentUser }) {
  const [openModal, setOpenModal] = useState(false);

  // const updateConfirm = (e) => {
  //   setConfirm(e.target.value);
  // };

  //   const removeChannel = () => {
  //     setOpenModal(false)
  //     removeChannel();
  // };

  const removeChannel = async (channelObj) => {
    const membersRef = collection(db, `Chats/${channelObj.channelId}/members`);
    const q = query(membersRef, where("userId", "==", currentUser.uid));
    const querySnap = await getDocs(q);

    if (querySnap.docs[0].role === "creator") {
      //need to iterate through the members and remove it from their chats
      const allMembers = await getDocs(
        collection(db, `Chats/${channelObj.channelId}/members`)
      );
      allMembers.forEach(async (member) => {
        //create a reference, then delete the
        const userRef = doc(db, "users", member.userId);
        await updateDoc(userRef, {
          chat: arrayRemove(JSON.stringify(channelObj)),
        });
      });

      //then delete the chat entirely
      await deleteDoc(doc(db, "Chats", channelObj.channelId));
    } else {
      //remove the chat from just the current users array
      const userRef = doc(db, "users", currentUser.uid);
      await updateDoc(userRef, {
        chat: arrayRemove(JSON.stringify(channelObj)),
      });
      //then remove them from the member collection
      await deleteDoc(doc(db, "Chats", channelObj.channelId));
    }
  };

  return (
    <div>
      <button
        onContextMenu={() => setOpenModal(true)}
        className="flex flex-col items-center w-40 h-full overflow-hidden text-amber-700 bg-orange-300 mb-5 hover:bg-gray-300"
      >
        {channel.channelName}
      </button>
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
        className="md:ps-[280px]"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete your Channel?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={() => removeChannel(channel)}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
