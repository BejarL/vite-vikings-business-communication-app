import { Modal } from "flowbite-react";
import { useState } from "react";

export default function DeleteAccountModal({ deleteProfile }) {
  const [openModal, setOpenModal] = useState(false);

  const updateConfirm = (e) => {
    setConfirm(e.target.value);
  };

  const deleteAccount = () => {
    setOpenModal(false);
    deleteProfile();
  };

  return (
    <div className="m-2 abs">
      <button onClick={() => setOpenModal(true)} 
      className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-amber-500 text-white hover:bg-red-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
        Delete Account
      </button>
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
        className="md:ps-[280px]"
      >
        <Modal.Header className="bg-amber-500"/>
        <Modal.Body className="bg-amber-500 ">
          <div className="text-center ">
            <h3 className="mb-5 text-lg font-normal text-white dark:text-gray-400">
              Are you sure you want to delete your Account?
            </h3>
            <div className="flex justify-center gap-4">
              <button className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded" onClick={() => deleteAccount}>
                {"Yes, I'm sure"}
              </button>
              <button className="bg-white hover:bg-gray-200 text-black font-bold py-2 px-4 rounded" onClick={() => setOpenModal(false)}>
                No, cancel
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
