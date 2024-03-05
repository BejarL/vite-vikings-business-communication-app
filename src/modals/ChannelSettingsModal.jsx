import { Button, Modal, Tabs } from "flowbite-react";
import { HiAdjustments, HiClipboardList, HiOutlineLogout, HiOutlineTrash } from 'react-icons/hi';
import { MdDashboard } from 'react-icons/md';
import { useState, useEffect } from "react";
import {
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  arrayRemove,
  getDocs,
  arrayUnion,
  collection,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../../FirebaseConfig";
import '../CustomScroll.css';

function ChannelSettingsModal({ channel, users, homeView, setChannelObj }) {
  const [openModal, setOpenModal] = useState(false);
  const [role, setRole] = useState("member");
  const [newUser, setNewUser] = useState("");
  const [newName, setNewName] = useState(channel.channelName);
  const currentUser = auth.currentUser;
  const membersRef = collection(db, `Chats/${channel.channelId}/members`);

  useEffect(() => {
    getRole(channel);
    setNewName(channel.channelName);
  }, [channel]);

  const updateNewUser = (e) => {
    setNewUser(e.target.value);
  };

  const updateNewName = (e) => {
    setNewName(e.target.value);
  };

  //gets the role of the signed in user and if they are the creator update the state
  const getRole = async () => {
    const q = query(membersRef, where("userId", "==", currentUser.uid));
    const querySnap = await getDocs(q);

    const usersRole = querySnap.docs[0].data().role;

    if (role !== usersRole) {
      setRole(usersRole);
    }
  };

  const removeChannel = async () => {
    //check the role of the user (saved in state)
    if (role === "creator") {
      //need to iterate through the members and remove it from their chats
      //first get the docs for each member of the chat
      const allMembers = await getDocs(
        collection(db, `Chats/${channel.channelId}/members`)
      );

      //gp through each doc and delete it from that users array of chats
      allMembers.forEach(async (member) => {
        //create a reference, then delete the
        const userRef = doc(db, "users", member.data().userId);
        await updateDoc(userRef, {
          chat: arrayRemove(JSON.stringify(channel)),
        });
      });
      //then delete the chat entirely (doesnt delete the subcollections, firebase wont let you from the front end)
      await deleteDoc(doc(db, "Chats", channel.channelId));

      //if the user is not the creator, do the following
    } else {
      //remove the chat from just the current users array
      const userRef = doc(db, "users", currentUser.uid);
      await updateDoc(userRef, {
        chat: arrayRemove(JSON.stringify(channel)),
      });
      //then remove them from the member collection
      //first need to query which doc is theres, then delete it
      const q = query(membersRef, where("userId", "==", currentUser.uid));
      const querySnapshot = await getDocs(q);
      // querySnapshot should return one doc, but in the event theres multiple we want to delete them to be safe.
      querySnapshot.forEach(async (memberDoc) => {
        await deleteDoc(
          doc(db, `Chats/${channel.channelId}/members`, memberDoc.id)
        );
      });
    }
    //lastly, close the modal
    setOpenModal(false);
    homeView();
  };

  //checks if the user exists, and if so return the uid
  const validateUser = async (username) => {
    const usersCollectionRef = collection(db, "users");
    const querySnapshot = await getDocs(
      query(usersCollectionRef, where("displayName", "==", username))
    );

    if (querySnapshot.empty) {
      return false;
    } else {
      return querySnapshot.docs[0].data().uid;
    }
  };

  const addUserTochannel = async () => {
    //create the channel obj to save
    const channelObj = {
      channelId: channel.channelId,
      channelName: channel.channelName,
    };

    //iterate through the users already added to the channel to prevent being added twice
    for (let i = 0; i < users.length; i++) {
      if (users[i].displayName === newUser) {
        window.alert("User already added");
        return;
      }
    }

    //make sure the user exists
    const uid = await validateUser(newUser);
    if (!uid) {
      window.alert("Failed to add user: Invalid username");
      return;
    }

    //add the user to the members collection of that chat
    const membersRef = collection(db, `Chats/${channel.channelId}/`, "members");
    await addDoc(membersRef, {
      userId: uid,
      role: "member",
    });

    //create a doc to add to the users array
    const userDoc = doc(db, "users", uid);
    await updateDoc(userDoc, {
      chat: arrayUnion(JSON.stringify(channelObj)),
    });
  };

  const updateChannelName = async () => {
    //need to update the name in the channel doc, and in each members doc
    //firs update the channels doc
    const channelRef = doc(db, "Chats", channel.channelId);
    await updateDoc(channelRef, {
      title: newName,
    });
    //now update each users doc.
    const membersQuery = query(membersRef);

    const querySnapshot = await getDocs(membersQuery);
    querySnapshot.forEach(async (user) => {
      const docRef = doc(db, "users", user.data().userId);

      //need to remove initial instance from the user array.
      await updateDoc(docRef, {
        chat: arrayRemove(JSON.stringify(channel)),
      });
      //now need to add the new one
      await updateDoc(docRef, {
        chat: arrayUnion(
          JSON.stringify({ channelId: channel.channelId, channelName: newName })
        ),
      });
    });

    setChannelObj({ channelId: channel.channelId, channelName: newName });
  };

  const usersElems = users.map((user) => {
    return (
      <div className="m-2 flex items-center" key={user.uid}>
        <img
          className="rounded-full w-[50px] h-[50px] me-2"
          src={user.profilePic}
        ></img>
        {user.displayName}
      </div>
    )
  })
  


  return (
    <>
      <button
        onClick={() => setOpenModal(true)}
        onContextMenu={(e) => {
          e.preventDefault();
          setOpenModal(true);
        }}
        >
        <svg
          className="text-teal-500"
          xmlns="http://www.w3.org/2000/svg"
          width="3em"
          height="3em"
          viewBox="0 0 24 24"
          >
          <path
            fill="currentColor"
            d="M12.012 2.25c.734.008 1.465.093 2.182.253a.75.75 0 0 1 .582.649l.17 1.527a1.384 1.384 0 0 0 1.927 1.116l1.4-.615a.75.75 0 0 1 .85.174a9.793 9.793 0 0 1 2.205 3.792a.75.75 0 0 1-.272.825l-1.241.916a1.38 1.38 0 0 0 0 2.226l1.243.915a.75.75 0 0 1 .272.826a9.798 9.798 0 0 1-2.204 3.792a.75.75 0 0 1-.849.175l-1.406-.617a1.38 1.38 0 0 0-1.926 1.114l-.17 1.526a.75.75 0 0 1-.571.647a9.518 9.518 0 0 1-4.406 0a.75.75 0 0 1-.572-.647l-.169-1.524a1.382 1.382 0 0 0-1.925-1.11l-1.406.616a.75.75 0 0 1-.85-.175a9.798 9.798 0 0 1-2.203-3.796a.75.75 0 0 1 .272-.826l1.243-.916a1.38 1.38 0 0 0 0-2.226l-1.243-.914a.75.75 0 0 1-.272-.826a9.793 9.793 0 0 1 2.205-3.792a.75.75 0 0 1 .85-.174l1.4.615a1.387 1.387 0 0 0 1.93-1.118l.17-1.526a.75.75 0 0 1 .583-.65a10.72 10.72 0 0 1 2.201-.252M12 9a3 3 0 1 0 0 6a3 3 0 0 0 0-6"
            />
        </svg>
      </button>
      <Modal
        dismissible
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
        >
        <Tabs aria-label="Tabs with underline" style="underline" className="bg-modalblue rounded text-white" >
          <Tabs.Item active title="Users" icon={HiClipboardList} className="h-[150px]" >
          <div id="custom-scroll" className="h-[150px] ms-[5px] me-[5px] flex items-start flex-wrap">
            {usersElems}
          </div>
          { role === "creator" ?
            <div className="w-[100%] ps-3 pe-3 flex justify-evenly">
            <input 
              className="border p-1 text-black"
              placeholder="Add a user"
              value={newUser}
              onChange={updateNewUser}
              ></input>
            <button 
              className="text-xl ps-1 pe-1 bg-cyan-700 rounded hover:bg-cyan-800"
              onClick={addUserTochannel}
              >Add</button>
            </div>
            : null
          }
        </Tabs.Item>
        { role === "creator" ? <Tabs.Item title="Channel Name" icon={HiAdjustments}>
          <div className="flex flex-col justify-evenly items-center h-[100px]">
            <p className="m-1">Change the channel name here</p>
          <input
            onChange={updateNewName}
            value={newName}
            placeholder="Edit Channel Name"
            className="text-black p-1 mb-2"
            ></input>
          <button 
            onClick={updateChannelName}
            className="text-xl ps-1 pe-1 bg-cyan-700 rounded hover:bg-cyan-800"
            >Save</button>
          </div>
        </Tabs.Item> 
          : null
        }
        <Tabs.Item active title={role === "creator" ? "Delete Channel" : "Leave Channel"} 
                  icon={role === "creator" ? HiOutlineTrash : HiOutlineLogout}>
          <div className="flex flex-col items-center h-[100px] justify-evenly">
            <p>
              { role === "creator" ?
                "Are you sure? This action cannot be undone"
                : "Are you sure you want to leave this channel?"
              }
            </p>
            <button 
              className="text-xl ps-1 pe-1 bg-red-700 hover:bg-red-900 rounded"
              onClick={() => removeChannel(channel)}>
                {role === "creator" ? "Delete Channel" : "Leave Channel"}
            </button>
          </div>
        </Tabs.Item>
    </Tabs>

      </Modal>
    </>
  );
}

export default ChannelSettingsModal;
