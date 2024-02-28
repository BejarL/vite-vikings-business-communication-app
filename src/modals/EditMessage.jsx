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

function EditMessage({ msgId, messageContent, updateMsg }) {
  const [openModal, setOpenModal] = useState(false);
  const [messageField, setMessageField] = useState(messageContent);

  const updateMessageField = (e) => {
    setMessageField(e.target.value)
  }

  const resetModal = () => {
    setOpenModal(false);
    setMessageField(messageContent);
  }

  //handler function for updating the message
  const handleUpdate = () => {
    updateMsg(msgId, messageField);
    resetModal();
  }
  
  return (
    <div>
      <button
        onClick={() => setOpenModal(true)}
        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-[100%]"
      >
        Edit
      </button>
      <Modal
        show={openModal}
        size="md"
        onClose={resetModal}
        popup
        className="md:ps-[280px]"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              <textarea 
                value={messageField}
                placeholder="Enter the message here"
                onChange={updateMessageField}
                className="w-[90%] min-h-[100px] max-h-[500px]"
              ></textarea>
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="gray" onClick={resetModal}>
                Cancel
              </Button>
              <Button color="success" onClick={handleUpdate}>
                Save
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default EditMessage;
