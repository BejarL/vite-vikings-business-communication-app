import { Button, Modal } from "flowbite-react";
import { useState } from "react";

function EditMessage({ msgId, messageContent, updateMsg }) {
  const [openModal, setOpenModal] = useState(false);
  const [messageField, setMessageField] = useState(messageContent);

  const updateMessageField = (e) => {
    setMessageField(e.target.value);
  };

  const resetModal = () => {
    setOpenModal(false);
    setMessageField(messageContent);
  };

  //handler function for updating the message
  const handleUpdate = () => {
    updateMsg(msgId, messageField);
    resetModal();
  };

  return (
    <div>
      <a
        href="#"
        onClick={() => setOpenModal(true)}
        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
      >
        Edit
      </a>
      <Modal
        show={openModal}
        size="md"
        onClose={resetModal}
        popup
        className="md:ps-[280px]"
      >
        <Modal.Header className="bg-slate-700" />
        <Modal.Body className="bg-slate-700">
          <div className="text-center">
            <h3 className="text-lg font-normal text-black dark:text-gray-400">
              <textarea
                value={messageField}
                placeholder="Enter the message here"
                onChange={updateMessageField}
                className="w-[90%] min-h-[100px] max-h-[500px] bg-gray-200 rounded placeholder-gray-500"
              ></textarea>
            </h3>
          </div>
        </Modal.Body>
        <Modal.Footer className="bg-slate-700">
          <div className="flex justify-between w-full ">
            <Button color="gray" onClick={resetModal}>
              Cancel
            </Button>
            <Button className="bg-slate-900" onClick={handleUpdate}>
              Save
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditMessage;
