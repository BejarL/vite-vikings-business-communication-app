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

export default function TextArea({ channel }) {
  const [messages, setMessages] = useState([]);
  const [messageField, setMessageField] = useState("");
  const [loading, setLoading] = useState(false);
  const [messagesLimit, setMessagesLimit] = useState(10);
  const [users, setUsers] = useState([]);

  const messagesEndRef = useRef(null); // keep track messages for auto-scrolling
  const chatRef = collection(db, `Chats/${channel.channelId}`, "messages");

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
          messagesData.unshift(data); // Prepends the new message to maintain order after sorting by 'createdAt' desc
        });
        setMessages(messagesData);
        setLoading(false);
      });

      return () => unsubscribe();
    }
  }, [channel, messagesLimit]);

  useEffect(() => {
    if (!loading) {
      getUsers();
    }
  }, [loading])

  const getUsers = async() => {
    const usersData = [];
    //get the collection of users in the channel
    const usersQuery = query(chatRef)
    const querySnapshot = await getDocs(usersQuery);
    const dataArray = querySnapshot.docs;
    for (let i in dataArray) {
      const userSnap = await getDoc(doc(db, "users", dataArray[i].data().userId))
      if (userSnap.exists()) {
        usersData.push({uid: userSnap.data().uid, displayName: userSnap.data().displayName})
      }
      
    }
    setUsers(usersData);
  }

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
      displayName: auth.currentUser.displayName
    };

    setMessageField("");

    try {
      await addDoc(
        chatRef,
        newMessage
      );
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
            "body": msgContent
        })
    });
}

  // Delete a message by messageId
  const deleteMsg = async (msgId) => {
    const q = query(
      chatRef,
      where("messageId", "==", msgId)
    );

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

  const messagesElems = messages.map((msg) => {
    let timeStamp = convertDate(msg.createdAt);

    //set it to the name be one in the msg by default
    let displayName = msg.displayName;
    //check the users array for the updated one.
    for (let i = 0; i < users.length; i++) {
      if (users[i].uid === msg.userId) {
        displayName = users[i].displayName;
      }
    }
    return (
      <div key={msg.messageId}>
        <div>
          <div className="flex items-center">
            <img
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
              }}
              src={msg.authorProfilePic}
              alt="Profile picture"
            />
            <p className="ps-2 text-orange-400">{displayName}</p>
            <p className="p-4 text-sm">{timeStamp}</p>
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
        <p>{msg.body}</p>
      </div>
    );
  });

  return (
    <div className="flex flex-col items-center w-full h-full overflow-hidden text-gray-400 bg-gray-900">
      <h1 className="flex items-center w-full px-3 mt-3">
        <span className="ml-2 text-lg font-bold p-3">
          {channel.channelName}
        </span>
      </h1>
      <div className="w-full px-2 overflow-y-auto border-blue-900 border-t">
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
          {loading && <p>Loading...</p>}
          <div>
            {messagesElems}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>
      <div className="flex w-[98%] h-auto mt-auto m-3 rounded bg-gray-800 hover:bg-gray-700 hover:text-gray-300">
        <input
          className="flex-1 pl-2 bg-transparent h-10"
          value={messageField}
          placeholder="Type your message here"
          onChange={handleMessageField}
          onKeyDown={handleKeyDown}
        />
        <button
          className="h-10 w-32 rounded bg-blue-500 text-white"
          onClick={sendMessage}
          disabled={loading || !messageField.trim()}
          aria-label="Send message"
        >
          Send
        </button>
      </div>
    </div>
  );
}
