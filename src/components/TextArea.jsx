import { useState, useEffect } from "react";
import {
  onSnapshot,
  updateDoc,
  deleteDoc,
  doc,
  arrayRemove,
  collection,
} from "firebase/firestore";
import { auth, db } from "../../FirebaseConfig";

export default function TextArea({ channel }) {
  const [messages, setMessages] = useState([]);
  const [messageField, setMessageField] = useState("");
  console.log(messages);

  useEffect(() => {
    if (channel) {
      const channels = collection(db, `Chats/${channel.channelId}`, "messages");

      const unsubscribe = onSnapshot(channels, (snapshot) => {
        const messagesData = snapshot.docs.map((doc) => doc.data());
        setMessages(messagesData);
      });
      return unsubscribe;
    }
  }, []);

  const handleMessageField = (e) => {
    setMessageField(e.target.value);
  };

  const messagesElems = messages.map((msg) => {
    return <p key={msg.messageId}>{msg.body}</p>;
  });

  return (
    <div className="relative dashboard--textbox w-[100%] flex flex-col">
      <div className="w-100 h-8 mt-3 border-b border-blue-900 m-1">
        <p className="ml-7 text-base">{channel.channelName}</p>
      </div>
      <div className="text-area overflow-y-auto">{messagesElems}</div>

      <div className="absolute bottom-0 w-[100%] ">
        <input
          className="w-[100%]"
          value={messageField}
          placeholder="Type your message here"
          onChange={handleMessageField}
        />
      </div>
    </div>
  );
}
