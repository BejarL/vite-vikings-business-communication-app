import React  from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Example({ currentName, setCurrentName }) {
  const [show, setShow] = React.useState(false);
  const [username, setUsername] = React.useState(currentName);
  let nameRegex = /[]/

  const handleUsername = (e) => {
    
    let value = e.target.value
    setUsername(value);
  }

  const toggleModal = () => {
    setShow(prevState => {
      return !prevState
    })
  }

  const updateName = () => {
    setCurrentName(username);
    toggleModal();
  }

  return (
    <div>
        <button onClick={toggleModal} className="profile--edit-btn">
            <svg className="profile--edit-name-btn" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M19 19V5H5v14zm0-16a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-2.3 6.35l-1 1l-2.05-2.05l1-1c.21-.22.56-.22.77 0l1.28 1.28c.22.21.22.56 0 .77M7 14.94l6.06-6.06l2.06 2.06L9.06 17H7z"/></svg>
        </button>

      <Modal
        show={show}
        onHide={toggleModal}
        backdrop="static"
        keyboard={false}
        className="profile--modal-wrapper"
      >
        <Modal.Body>
          <input value={username} placeholder="Enter a username" onChange={handleUsername}/>
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

export default Example;