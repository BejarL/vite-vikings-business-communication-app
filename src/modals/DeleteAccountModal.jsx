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
    <div>
      <button
        onClick={() => setOpenModal(true)}
        className="py-3 px-7 mt-3 inline-flex items-center text-md font-semibold rounded-lg border border-transparent bg-teal-900 text-white hover:bg-teal-600 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
      >
        Delete Account
      </button>
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
        className="md:ps-[280px]"
      >
        <Modal.Header className="bg-slate-700" />
        <Modal.Body className="bg-slate-700 ">
          <div className="text-center ">
            <h3 className="text-lg font-normal text-white dark:text-gray-400">
              Are you sure you want to delete your Account?
            </h3>
          </div>
        </Modal.Body>
        <Modal.Footer className="bg-slate-700">
          <div className="flex justify-between w-full">
            <button
              className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded"
              onClick={() => deleteAccount}
            >
              {"Yes, I'm sure"}
            </button>
            <button
              className="bg-white hover:bg-gray-200 text-black font-bold py-2 px-4 rounded"
              onClick={() => setOpenModal(false)}
            >
              No, cancel
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
