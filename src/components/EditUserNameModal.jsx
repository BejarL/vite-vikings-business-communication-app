import React  from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function EditUserNameModal({ currentName, setCurrentName }) {
  //used to show the modal or not
  const [show, setShow] = React.useState(false);
  const [errorMessage,setErrorMessage] = React.useState(false)
  //used to control the input field in the modal
  const [username, setUsername] = React.useState(currentName);
  
  const handleUsername = (e) => {
    let value = e.target.value
    setUsername(value);
  }
  
  const toggleModal = () => {
    setUsername(currentName);
    setErrorMessage(false);
    setShow(prevState => {
      return !prevState
    })
  }
  
  let nameRegex = /^[a-zA-Z0-9 ]{3,15}$/
  const updateName = (e) => {
    if (nameRegex.test(username)) {
      setCurrentName(username);
      toggleModal();
    } else {
      setErrorMessage('min of 3 characters max 12, letters and numbers only')
    }
  }

  return (
    <div>
        <button onClick={toggleModal} className="profile--edit-btn">
            <svg className="profile--edit-name-btn" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M19 19V5H5v14zm0-16a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-2.3 6.35l-1 1l-2.05-2.05l1-1c.21-.22.56-.22.77 0l1.28 1.28c.22.21.22.56 0 .77M7 14.94l6.06-6.06l2.06 2.06L9.06 17H7z"/></svg>
        </button>

      { show ? <div className="profile--modal-darken"></div> : null }
      <Modal
        show={show}
        onHide={toggleModal}
        backdrop="static"
        keyboard={false}
        className="profile--modal-wrapper"
      >
          <Modal.Body className="profile--modal-body">
            <h4>Enter a new username</h4>
            <input className="profile--invalid-username" value={username} placeholder="Enter a username" onChange={handleUsername}/>
            {errorMessage && <div className="profile--error-message">{errorMessage}</div>}
          </Modal.Body>
          <Modal.Footer className="profile--modal-footer">
            <Button variant="secondary" onClick={toggleModal}>
              Close
            </Button>
            <Button variant="primary" onClick={updateName}>Confirm</Button>
          </Modal.Footer>
      </Modal>
    </div>
  )
}

export default EditUserNameModal;