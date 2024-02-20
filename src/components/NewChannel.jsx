import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";


function NewChannel() {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [recipient, setRecipient] = useState("");


  const toggleModal = () => {
    setShow((prevState) => {
      return !prevState;
    });
  };

  const updateTitle = e => {
    setTitle(e.target.value);
  }
  const updateRecipient = e => {
    setRecipient(e.target.value);
  }

  

  return (
    <>
      <button onClick={toggleModal} className="dashboard--link">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="0.88em"
          height="1em"
          viewBox="0 0 448 512"
        >
          <path
            fill="currentColor"
            d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32v144H48c-17.7 0-32 14.3-32 32s14.3 32 32 32h144v144c0 17.7 14.3 32 32 32s32-14.3 32-32V288h144c17.7 0 32-14.3 32-32s-14.3-32-32-32H256z"
          />
        </svg>
        <p>New Channel</p>
      </button>

      <Modal
        show={show}
        onHide={toggleModal}
        backdrop="static"
        keyboard={false}
        className="dashboard--modal-wrapper"
      >
        <Modal.Body>
          <div className="dashboard--modal-form"> 
            <input 
              type="input"
              onChange={updateTitle}
              placeHolder="Enter Channel Name"
              value={title}
              className="dashboard--modal-input"
              />
              <div>
              <input 
                type="input"  
                placeholder="Add recipients" 
                onChange={updateRecipient}
                className="dashboard--modal-input-2"
                />
              <button className="dashboard--modal-add-btn">Add</button>
              </div>
          </div>

        </Modal.Body>
        <Modal.Footer>
          <div className="dashboard--modal-footer">
            <Button variant="secondary" onClick={toggleModal}>Cancel</Button>
            <Button variant="primary">Create</Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default NewChannel;
