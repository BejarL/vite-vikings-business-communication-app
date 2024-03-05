import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import {
  collection,
  doc,
  getDocs,
  query,
  where,
  addDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { db, storage, auth } from "../../FirebaseConfig";
import { ref, getDownloadURL } from "firebase/storage";

function NewChannel({ currentUser }) {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [recipient, setRecipient] = useState("");
  const [users, setUsers] = useState([]);

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

  const updateTitle = (e) => {
    setTitle(e.target.value);
  };
  const updateRecipient = (e) => {
    setRecipient(e.target.value);
  };

  //validates that a user with display name exists, and return their data
  const validateUser = async (username) => {
    const usersCollectionRef = collection(db, "users");
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
    //check if the recipient is the current user
    if (recipient == currentUser) {
      window.alert("You are already added by default");
      return;
    }

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
      query.forEach((doc) => {
        setUsers((prev) => [...prev, doc.data()]);
      });
      // if the result is falsey, need to alert the user that its invalid
    } else {
      window.alert("user doesnt exist");
    }
  };

  const createChannel = async () => {
    // create a new channel document inside of
    // channels collection
    const channelsRef = collection(db, "Chats");
    const newChannelRef = await addDoc(channelsRef, {
      title: title,
      createdBy: auth.currentUser.uid,
      createdAt: new Date(),
    });
    // add creator as first member of the channel
    const membersRef = collection(newChannelRef, "members");
    await addDoc(membersRef, {
      userId: auth.currentUser.uid,
      role: "creator",
    });

    // add messages collection to channel
    const messagesRef = collection(newChannelRef, "messages");
    await addDoc(messagesRef, {
      userId: "System",
      body: "This is the start of the Channel!",
      createdAt: new Date(),
      authorProfilePic: "https://firebasestorage.googleapis.com/v0/b/emanate-demo.appspot.com/o/bg-images%2Fblue-logo.png?alt=media&token=c0b3ae42-ebfc-43d3-bc49-e614b221c4c5",
      messageId: crypto.randomUUID(),
    });

    // add other recipients
    if (users) {
      users.forEach(async (rec) => {
        await addDoc(membersRef, {
          userId: rec.uid,
          role: "member",
        });
      });
    }

    // call the function to add the channels to each user array
    addChannelsToUsers(newChannelRef.id);

    // close modal after creating the channel
    toggleModal();
  }; // end createChannel

  const addChannelsToUsers = (channelId) => {
    //create the channel obj to save
    const channelObj = { channelId: channelId, channelName: title };

    //add the current user into the array of users being save in state
    const allUsers = users;
    allUsers.push(auth.currentUser);

    //iterate through each user and add the new channelObj to their chat array
    allUsers.forEach(async (user) => {
      const userDoc = doc(db, "users", user.uid);
      await updateDoc(userDoc, {
        chat: arrayUnion(JSON.stringify(channelObj)),
      });
    });
  };

  //map through the added recipients to render
  const defaultProfilePic =
    "https://images.unsplash.com/photo-1706795140056-2f9ce0ce8cb0?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const userElems = users.map((user) => {
    return (
      <div key={user.uid} className="dashboard--recipient-card">
        <img
          src={user.profilepic || defaultProfilePic}
          className="dashboard--recipient-img"
        ></img>
        <p>{user.displayName}</p>
      </div>
    );
  });

  return (
    <>
      <button
        onClick={toggleModal}
        className="flex items-center mb-2 w-full h-12 px-3 mt-2 rounded hover:bg-slate-700 hover:text-gray-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1rem"
          height="1rem"
          className="w-6 h-6 stroke-current pe-1"
          viewBox="0 0 448 512"
        >
          <path
            fill="currentColor"
            d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32v144H48c-17.7 0-32 14.3-32 32s14.3 32 32 32h144v144c0 17.7 14.3 32 32 32s32-14.3 32-32V288h144c17.7 0 32-14.3 32-32s-14.3-32-32-32H256z"
          />
        </svg>
        <span className="ml-2 text-sm font-medium">New Channel</span>
      </button>

      <Modal
        show={show}
        onHide={toggleModal}
        backdrop="static"
        keyboard={false}
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-500 h-300 p-2.5 bg-amber-500 rounded-md"
      >
        <Modal.Body>
          <div className="h-260 m-3 flex flex-col text-white items-center overflow-y-auto">
            <input
              type="input"
              onChange={updateTitle}
              placeholder="Enter Channel Name"
              value={title}
              className="w-340 p-1 text-2xl pl-4 placeholder-gray-300 outline-0 bg-amber-600 -ml-10 rounded"
            />
            <div className="flex items-center">
              <input
                type="input"
                placeholder="Add recipients"
                onChange={updateRecipient}
                className="w-340 p-1 mt-2.5 bg-amber-600 placeholder-gray-300 text-2xl outline-0 pl-4 ml-1 rounded"
              />
              <button
                className="text-white mt-3 bg-amber-700 hover:bg-amber-600 p-1 w-30 ml-2 text-lg rounded"
                onClick={addRecipient}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1rem"
                  height="1rem"
                  className="w-6 h-6 stroke-current"
                  viewBox="0 0 448 512"
                >
                  <path
                    fill="currentColor"
                    d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32v144H48c-17.7 0-32 14.3-32 32s14.3 32 32 32h144v144c0 17.7 14.3 32 32 32s32-14.3 32-32V288h144c17.7 0 32-14.3 32-32s-14.3-32-32-32H256z"
                  />
                </svg>
              </button>
            </div>
            <div className="dashboard--cards">{userElems}</div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex justify-between mt-10 w-full">
            <button
              onClick={toggleModal}
              className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              onClick={createChannel}
              className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Create
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default NewChannel;
