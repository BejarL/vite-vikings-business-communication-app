import React  from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function DeleteAccountModal() {
  const [show, setShow] = React.useState(false);
  const [confirm, setConfirm] = React.useState("");
  
  const toggleModal = () => {
    setShow(prevState => {
        setConfirm("");
        return !prevState;
    })
  }

  const updateConfirm = (e) => {
    setConfirm(e.target.value)
  }

  const deleteAccount = () => {
    if (confirm.toLowerCase() === "confirm") {
        console.log("confirmed");
    } else {
        
    }
  }

  return (
    <div>
        <button onClick={toggleModal} className="profile--modal-btn">Delete Account</button>
        { show ? <div className="profile--modal-darken"></div> : null }

      <Modal
        show={show}
        onHide={toggleModal}
        backdrop="static"
        keyboard={false}
        className="profile--modal-wrapper"
      >
          <Modal.Body className="profile--modal-body">
            <h4>Type Confirm to Delete</h4>
            <input className="profile--invalid-username" value={confirm} placeholder="Confirm" onChange={updateConfirm}/>
          </Modal.Body>
          <Modal.Footer className="profile--modal-footer">
            <Button variant="secondary" onClick={toggleModal}>
              Close
            </Button>
            <Button variant="primary" onClick={deleteAccount}>Confirm</Button>
          </Modal.Footer>
      </Modal>
    </div>
  )
}

export default DeleteAccountModal;