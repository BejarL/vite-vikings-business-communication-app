import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { auth, db } from "../../FirebaseConfig";
import {collection, addDoc} from "firebase/firestore";


function NewChannel() {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [recipient, setRecipient] = useState("");
  const [recipientMsg, setRecipientMsg] = useState("")


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

  const createChannel = async () => {
    // create a new channel document inside of
    // channels collection
    const channelsRef = collection(db, "channels");
    const newChannelRef = await addDoc(channelsRef, {
      title: title,
      createdBy: auth.currentUser.uid,
      createdAt: new Date(),
    })

    // add creator as first member of the channel
    const membersRef = collection(newChannelRef, "members");
    await addDoc(membersRef, {
    userId: auth.currentUser.uid,
    role: "creator",
    })

    // add other recipients
    if (recipient) {
      const recipients = recipient.split(",").map((r) => r.trim());
      recipients.forEach(async (rec) => {
        await addDoc(membersRef, {
          userId: rec,
          role: "member",
        });
      });
      setRecipientMsg("Recipients added successfully!")
    }

    // close modal after creating the channel
    toggleModal();

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
              placeholder="Enter Channel Name"
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
          {recipientMsg && (
            <div className="recipient-message">{recipientMsg}</div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <div className="dashboard--modal-footer">
            <Button variant="secondary" onClick={toggleModal}>Cancel</Button>
            <Button variant="primary" onClick={createChannel}>Create</Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default NewChannel;
