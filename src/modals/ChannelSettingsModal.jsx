import { Button, Modal, Tabs } from "flowbite-react";
import { HiAdjustments, HiClipboardList, HiUserCircle } from 'react-icons/hi';
import { MdDashboard } from 'react-icons/md';
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

function ChannelSettingsModal({ channel, currentUser, users }) {
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

  const usersElems = users.map(user => {
    return (
      <div>{user.displayName}</div>
    )
  })

  return (
    <div>
      <button
        onClick={() => setOpenModal(true)}
        onContextMenu={(e) => {
          e.preventDefault();
          setOpenModal(true);
        }}
      >
        <svg className="text-orange-500" xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24"><path fill="currentColor" d="M12.012 2.25c.734.008 1.465.093 2.182.253a.75.75 0 0 1 .582.649l.17 1.527a1.384 1.384 0 0 0 1.927 1.116l1.4-.615a.75.75 0 0 1 .85.174a9.793 9.793 0 0 1 2.205 3.792a.75.75 0 0 1-.272.825l-1.241.916a1.38 1.38 0 0 0 0 2.226l1.243.915a.75.75 0 0 1 .272.826a9.798 9.798 0 0 1-2.204 3.792a.75.75 0 0 1-.849.175l-1.406-.617a1.38 1.38 0 0 0-1.926 1.114l-.17 1.526a.75.75 0 0 1-.571.647a9.518 9.518 0 0 1-4.406 0a.75.75 0 0 1-.572-.647l-.169-1.524a1.382 1.382 0 0 0-1.925-1.11l-1.406.616a.75.75 0 0 1-.85-.175a9.798 9.798 0 0 1-2.203-3.796a.75.75 0 0 1 .272-.826l1.243-.916a1.38 1.38 0 0 0 0-2.226l-1.243-.914a.75.75 0 0 1-.272-.826a9.793 9.793 0 0 1 2.205-3.792a.75.75 0 0 1 .85-.174l1.4.615a1.387 1.387 0 0 0 1.93-1.118l.17-1.526a.75.75 0 0 1 .583-.65a10.72 10.72 0 0 1 2.201-.252M12 9a3 3 0 1 0 0 6a3 3 0 0 0 0-6"/></svg>
      </button>
      <Modal
        dismissible 
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
        className="md:ps-[280px]"
      >
        
        <Tabs aria-label="Tabs with underline" style="underline">
        
          <Tabs.Item active title="Profile" icon={HiUserCircle}>
          {usersElems}
          <Button color="gray" onClick={() => setOpenModal(false)}>
            No, cancel
          </Button>
        </Tabs.Item>
      <Tabs.Item title="Settings" icon={HiAdjustments}>
        This is <span className="font-medium text-gray-800 dark:text-white">Settings tab's associated content</span>.
        Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
        control the content visibility and styling.
        <Button color="gray" onClick={() => setOpenModal(false)}>
        No, cancel
      </Button>
      </Tabs.Item>
    </Tabs>

      </Modal>
    </div>
  );
}

export default ChannelSettingsModal;

{/* <Modal.Header />
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
</Modal.Body> */}