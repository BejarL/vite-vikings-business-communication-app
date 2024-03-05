import { useState, useEffect, useRef } from "react";
import {
  onSnapshot,
  addDoc,
  getDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
  collection,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import { auth, db } from "../../FirebaseConfig";
import Dropdown from "../modals/Dropdown";
import ChannelSettingsModal from "../modals/ChannelSettingsModal";

export default function TextArea({ channel, homeView }) {
  const [messages, setMessages] = useState([]);
  const [messageField, setMessageField] = useState("");
  const [loading, setLoading] = useState(false);
  const [messagesLimit, setMessagesLimit] = useState(10);
  const [users, setUsers] = useState([]);
  const [channelObj, setChannelObj] = useState(channel)

  const messagesEndRef = useRef(null); // keep track messages for auto-scrolling
  const chatRef = channel
    ? collection(db, `Chats/${channel.channelId}`, "messages")
    : "";
  const membersRef = channel
    ? collection(db, `Chats/${channel.channelId}`, "members")
    : "";

  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Fetch messages with a limit that can be increased to load more messages
  useEffect(() => {
    if (channel && channel.channelId) {
      setLoading(true);
      const messageQuery = query(
        chatRef,
        orderBy("createdAt", "desc"),
        limit(messagesLimit)
      );

      const unsubscribe = onSnapshot(messageQuery, (snapshot) => {
        let messagesData = [];
        snapshot.docs.forEach((doc) => {
          const data = doc.data();
          data.createdAt = data.createdAt?.toDate
            ? data.createdAt.toDate()
            : data.createdAt;
          messagesData.push(data); // Prepends the new message to maintain order after sorting by 'createdAt' desc
        });
        setMessages(messagesData);
        setLoading(false);
      });
      setChannelObj(channel)
      return () => unsubscribe();
    }
  }, [channel, messagesLimit]);

  //
  useEffect(() => {
    if (!loading && channel) {

      const membersQuery = query(
        membersRef
      );

      const unsubscribe = onSnapshot(membersQuery, async (snapshot) => {
        let usersData = [];
        const dataArray = snapshot.docs
        for (let i in dataArray) {
          const userSnap = await getDoc(doc(db, "users", dataArray[i].data().userId))
          if (userSnap.exists()) {
              usersData.push({uid: userSnap.data().uid, 
                              displayName: userSnap.data().displayName,  
                              authorProfilePic: userSnap.data().authorProfilePic
                            })
          }
        }
        setUsers(usersData);
      });
      return () => unsubscribe();
    }
  }, [loading]);


  const handleMessageField = (e) => {
    setMessageField(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Send a new message to Firestore and optimistically update the UI
  const sendMessage = async () => {
    if (!channel || !channel.channelId || !messageField.trim()) return;
    const newMessage = {
      authorProfilePic: auth.currentUser.photoURL,
      body: messageField.trim(),
      createdAt: new Date(),
      messageId: crypto.randomUUID(),
      userId: auth.currentUser.uid,
      displayName: auth.currentUser.displayName,
    };

    setMessageField("");

    try {
      await addDoc(chatRef, newMessage);
    } catch (error) {
      console.log("Error sending message:", error);
      alert("Failed to send message. Please try again.");
    }
  };

  const updateMsg = async (msgId, msgContent) => {
    //query to find the correct message based off its msgId we are saving.
    const q = query(chatRef, where("messageId", "==", msgId));
    const querySnapshot = await getDocs(q);
    //go through each doc (should only be one with that ID) and update it with the msgContent
    querySnapshot.forEach(async (msg) => {
      const docRef = doc(db, `Chats/${channel.channelId}/messages`, msg.id);
      await updateDoc(docRef, {
        body: msgContent,
      });
    });
  };

  // Delete a message by messageId
  const deleteMsg = async (msgId) => {
    const q = query(chatRef, where("messageId", "==", msgId));

    try {
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const docRef = doc(
          db,
          `Chats/${channel.channelId}/messages`,
          querySnapshot.docs[0].id
        );
        await deleteDoc(docRef);
      }
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  // Convert Firestore Timestamp or other date formats to a readable string
  const convertDate = (createdAt) => {
    let date;
    if (createdAt?.toDate) {
      date = createdAt.toDate();
    } else if (createdAt instanceof Date) {
      date = createdAt;
    } else if (typeof createdAt === "number") {
      date = new Date(createdAt);
    } else {
      console.error("Unexpected createdAt type:", typeof createdAt);
      return createdAt;
    }
    // Define custom options for the date format
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };

    // Return the formatted date string
    return new Intl.DateTimeFormat("default", options).format(date);
  };
  // console.log(messages);
  console.log(users);
  const messagesElems = messages.map((msg) => {
    let timeStamp = convertDate(msg.createdAt);

    //set it to the name be one in the msg by default
    let displayName = msg.displayName;
    let profilePic = msg.authorProfilePic;
    //check the users array for the updated one.
    for (let i = 0; i < users.length; i++) {
      if (users[i].uid === msg.userId) {
        displayName = users[i].displayName;
        profilePic = users[i].authorProfilePic;
      }
    }
    return (
      <div key={msg.messageId}>
        <div>
          <div className="flex items-center">
            <img
              className="w-10 h-10 rounded-full mt-2"
              src={profilePic}
              alt="Profile picture"
            />
            <p className="ml-2 text-orange-400 text-lg">{displayName}</p>
            <p className="px-4 text-sm">{timeStamp}</p>
              {auth.currentUser.uid === msg.userId ? (
                <Dropdown
                  deleteMsg={deleteMsg}
                  updateMsg={updateMsg}
                  msgId={msg.messageId}
                  messageContent={msg.body}
                />
              ) : null}
          </div>
        </div>
        <p className="pt-2">{msg.body}</p>
      </div>
    );
  });

  return (
    <div className="flex flex-col items-center w-full h-full overflow-hidden text-teal-400 bg-slate-800">
      <h1 className="flex items-center w-full px-3 mt-3">
        <span className="ml-2 text-lg font-bold p-3 mr-auto">
          {channelObj.channelName}
        </span>
        { channel ?
          <ChannelSettingsModal channel={channelObj} users={users} homeView={homeView} setChannelObj={setChannelObj}/>
          : null
        }
      </h1>
      <div className="w-full h-full px-2 overflow-y-auto  border-teal-900 border-t">
        <div className="flex flex-col w-full max-h-[100%] pl-4 mt-3">
          {messages.length > 0 && messages.length >= messagesLimit && (
            <button
              onClick={() => setMessagesLimit((prevLimit) => prevLimit + 10)}
              aria-label="Load more messages"
              className="load-more-btn"
              style={{ alignSelf: "center", margin: "10px 0" }}
            >
              Load More
            </button>
          )}
          <div>
            {loading ? 
              <div className="flex justify-center items-center h-screen">
                  <div role="status">
                      <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                      </svg>
                      <span className="sr-only">Loading...</span>
                  </div>
              </div>
              : messagesElems.reverse()
              }
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>
      <div className="flex w-[96%] h-auto mt-auto m-3 rounded bg-gray-900 hover:bg-gray-700 hover:text-gray-300">
        <input
          className="flex-1 pl-2 bg-transparent h-10"
          style={{ marginRight: "5px" }}
          value={messageField}
          placeholder="Type your message here"
          onChange={handleMessageField}
          onKeyDown={handleKeyDown}
        />
        <button type="button" 
          className="px-4 py-2 text-xs font-medium text-center text-white bg-teal-900 rounded-lg hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={sendMessage}
          disabled={loading || !messageField.trim()}
          aria-label="Send message"
        >
          <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
          </svg>
          <span className="sr-only">Icon description</span>
        </button>
      </div>
    </div>
  );
}
