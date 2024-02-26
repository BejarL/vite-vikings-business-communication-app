import { Button, Modal } from 'flowbite-react';
import { useState } from 'react';

export default function DeleteAccountModal({ deleteProfile }) {
  const [openModal, setOpenModal] = useState(false);

  const updateConfirm = (e) => {
    setConfirm(e.target.value);
  };

  const deleteAccount = () => {
      setOpenModal(false)
      deleteProfile();
  };

  return (
    <div>
      <Button onClick={() => setOpenModal(true)} className="bg-slate-900 hover:bg-gray-100" >Delete Account</Button>
      <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup className="md:ps-[280px]">        
        <Modal.Header />
        <Modal.Body >
          <div className="text-center">
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete your Account?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={() => deleteAccount}>
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
