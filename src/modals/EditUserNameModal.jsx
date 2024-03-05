import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

// Define nameRegex outside the component to avoid re-declaration on each render
const nameRegex = /^[a-zA-Z0-9 ]{3,15}$/;

function EditUserNameModal({ displayName, updateDisplayName }) {
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUsername] = useState(displayName);

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const toggleModal = () => {
    setUsername(displayName);
    setErrorMessage("");
    setShow(!show);
  };

  const updateName = async () => {
    if (nameRegex.test(username)) {
      updateDisplayName(username);
      toggleModal();
    } else {
      setErrorMessage(
        "Min of 3 characters, max of 15, letters and numbers only."
      );
    }
  };

  return (
    <div>
      <Button onClick={toggleModal} className="profile--edit-btn">
        <svg
          className="profile--edit-name-btn"
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M19 19V5H5v14zm0-16a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-2.3 6.35l-1 1l-2.05-2.05l1-1c.21-.22.56-.22.77 0l1.28 1.28c.22.21.22.56 0 .77M7 14.94l6.06-6.06l2.06 2.06L9.06 17H7z"
          />
        </svg>
      </Button>
      {show && <div className="profile--modal-darken"></div>}
      <Modal
        show={show}
        onHide={toggleModal}
        backdrop="static"
        keyboard={false}
        className="profile--modal-wrapper"
      >
        <Modal.Header>
          <Modal.Title className="text-white font-bold text-xl mb-1">
            Edit username
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <label
            htmlFor="input-label"
            className="block text-white text-sm font-medium mb-2 dark:text-white"
          >
            Username
          </label>
          <input
            type="email"
            id="input-label"
            className="py-3 px-4 block w-full border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 mb-4"
            placeholder="New username"
            autoFocus
            onChange={handleUsername}
          ></input>
        </Modal.Body>
        <Modal.Footer>
          <button
            onClick={updateName}
            className="w-full bg-slate-800 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded"
          >
            Save Changes
          </button>
          <button
            onClick={toggleModal}
            className="w-full mt-2 bg-white hover:bg-gray-200 text-black font-bold py-2 px-4 rounded"
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditUserNameModal;
