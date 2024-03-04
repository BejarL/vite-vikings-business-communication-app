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

function DeleteChannelModal({ channel, currentUser, goToChannel }) {
  const [openModal, setOpenModal] = useState(false);

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
        onClick={() => goToChannel(channel)}
        onContextMenu={(e) => {
          e.preventDefault();
          setOpenModal(true);
        }}
        className="flex items-center  text-md font-semibold mb-2 w-full h-12 px-5 mt-1 rounded hover:bg-slate-700 hover:text-gray-300"
      >
        {channel.channelName}
      </button>
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
        className="md:ps-[280px] bg-black"
      >
        <Modal.Header className="bg-slate-700" />
        <Modal.Body className="bg-slate-700">
          <div className="text-center">
            <h3 className="mb-5 text-lg font-normal text-white dark:text-gray-400">
              Are you sure you want to delete your Channel?
            </h3>
          </div>
        </Modal.Body>
        <Modal.Footer className=" bg-slate-700">
          <div className="flex justify-between w-full ">
            <Button color="failure" onClick={() => removeChannel(channel)}>
              {"Yes, I'm sure"}
            </Button>
            <Button color="gray" onClick={() => setOpenModal(false)}>
              No, cancel
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default DeleteChannelModal;
