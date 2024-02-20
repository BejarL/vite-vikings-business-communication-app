import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db, storage } from '../../FirebaseConfig'
import { ref, getDownloadURL } from "firebase/storage";

function NewChannel() {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [recipient, setRecipient] = useState("");
  const [users, setUsers] = useState([]);
  console.log(users);
  

  //toggles the modal, and resets the state so the forms dont remember data when closed
  const toggleModal = () => {
    setShow((prevState) => {
      if (prevState) {
        setTitle("");
        setRecipient("");
        setUsers([]);
      }
      return !prevState;
    });
  };

  const updateTitle = e => {
    setTitle(e.target.value);
  }
  const updateRecipient = e => {
    setRecipient(e.target.value);
  }

  //validates that a user with display name exists, and return their data
  const validateUser = async (username) => {
    const usersCollectionRef = collection(
      db,
      "users",
      "allUsers",
      "users-info"
    );
    const querySnapshot = await getDocs(
      query(usersCollectionRef, where("displayName", "==", username))
    );
    if (querySnapshot.empty) {
      return "";
    }
    return querySnapshot;
  };

  //adds a user to the array of users to be added
  const addRecipient = async () => {
    //check if the user was already added 
    for (let i in users) {
      if (users[i].displayName === recipient) {
        window.alert("User already added");
        return;
      }
    }

    const query = await validateUser(recipient);
    //if the result from the query is not a falsey value, then add the data to the users
    if (query) {
      query.forEach(doc => {
        setUsers(prev => [...prev, doc.data()]);
      })

    // if the result is falsey, need to alert the user that its invalid
    } else {
      window.alert("user doesnt exist")
    }
  }
  
  //map through the added recipients to render
  const defaultProfilePic = "https://images.unsplash.com/photo-1706795140056-2f9ce0ce8cb0?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const userElems = users.map(user => {
    
    return (
      <div key={user.uid} className="dashboard--recipient-card">
        <img src={user.profilepic || defaultProfilePic} className="dashboard--recipient-img"></img>
        <p>{user.displayName}</p>
      </div>
    )
  })

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
              <button className="dashboard--modal-add-btn" onClick={addRecipient}>Add</button>
              </div>
              <div className="dashboard--cards">
                {userElems}
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
