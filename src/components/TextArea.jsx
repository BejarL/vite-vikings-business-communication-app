import { useState, useEffect } from "react";
import {
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  collection,
  query,
  where,
  getDocs,
  orderBy,
} from "firebase/firestore";
import { auth, db } from "../../FirebaseConfig";
import useFirebaseImage from "./utils/useFirebaseImage";
import  Dropdown  from "../modals/Dropdown";

export default function TextArea({ channel }) {
  const [messages, setMessages] = useState([]);
  const [messageField, setMessageField] = useState("");
  const [loading, setloading] = useState(false);

  const chat = collection(db, `Chats/${channel.channelId}`, "messages");

  useEffect(() => {
    if (channel) {
      const messageQuery = query(chat, orderBy("createdAt"));

      const unsubscribe = onSnapshot(messageQuery, (snapshot) => {
        let messagesData = [];
        snapshot.forEach((doc) => {
          messagesData.push(doc.data());
        });
        setMessages(messagesData);
      });
      return unsubscribe;
    }
  }, [channel]);

  const handleMessageField = (e) => {
    setMessageField(e.target.value);
  };

    const sendMessage = async () => {
        const newMessage = {
            authorProfilePic: auth.currentUser.photoURL,
            body: messageField,
            createdAt: new Date(),
            messageId: crypto.randomUUID(),
            // userId: auth.currentUser.uid
        }
    setMessageField("");
    await addDoc(chat, newMessage);
  };

    const convertDate = (date) => {

        const options = {
            // or 'short' or 'narrow'
            year: 'numeric',
            month: 'long', // or 'short' or 'narrow'
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
          };
        
        const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
        return formattedDate.replace('at', '');
        
    }

    const updateMessage = () => {
        
    }

    const deleteMsg = async (msgId) => {
        const q = query(chat, where("messageId", "==", msgId));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (msg) => {
            const docRef = doc(db, `Chats/${channel.channelId}/messages`, msg.id);
            await deleteDoc(docRef)
        });
    }

    const messagesElems = messages.map(msg => {

        let timeStamp = convertDate(msg.createdAt)

        return (
            <div key={msg.messageId}>
                <div>
                    <div className = 'flex items-center'>
                        <img 
                        style={{
                            width: '50px', // Adjust the width as needed
                            height: '50px', // Adjust the height as needed
                            borderRadius: '15%', // Optional: To make it a circular profile picture
                        }}                            
                            src={msg.authorProfilePic} 
                            alt="profile picture">
                          </img>
                    
                    <p>{timeStamp}</p>
                    </div>
                </div>
                <p>{msg.body}</p>
                {auth.currentUser.uid === msg.userId ? <Dropdown deleteMsg={deleteMsg} msgId={msg.messageId}/> : null}
            </div>
        )
    })

    

  return (
    <div className="flex flex-col items-center w-full h-full overflow-hidden text-gray-400 bg-gray-900">
		<a className="flex items-center w-full px-3 mt-3" href="#">
			<span className="ml-2 text-sm font-bold p-3">{channel.channelName}</span>
		</a>
		<div className="w-full px-2 overflow-y-auto border-blue-900 border-t">
			<div className="flex flex-col w-full max-h-[100%] mt-3  pe">
        <div>
				<div className="flex items-center w-full h-full px-3 mt-2 rounded" href="#">
          <div>{loading ? "loading" : messagesElems}</div>
				</div>
        </div>
			</div>
		</div>
		<div className="flex flex-col bottom-0 items-center justify-center w-[100%] h-16 mt-auto bg-gray-800 hover:bg-gray-700 hover:text-gray-300" href="#">
      <input
          className="w-[100%]"
          value={messageField}
          placeholder="Type your message here"
          onChange={handleMessageField}
        />
        <button className="w-full p-2 bg-blue-500 text-white" onClick={sendMessage}>
          Send
        </button>
		</div>
	</div>
  );
}





{/*<div>
      <span>{channel.channelName}</span>
      <div className="text-area overflow-y-auto">
        <div>{loading ? "loading" : messagesElems}</div>
      </div>

      <div className="absolute bottom-0 w-[100%] flex flex-col">
        <input
          className="w-[100%]"
          value={messageField}
          placeholder="Type your message here"
          onChange={handleMessageField}
        />
        <button className="p-2 bg-blue-500 text-white" onClick={sendMessage}>
          Send
        </button>
      </div>
  </div> */}

{
  /* <div key={msg.messageId}>
                <div>
                    <div>
                        <img src={msg.profilePic} alt="profile picture"></img>
                        <p>{displayName}</p>
                    </div>
                    <p>{msg.createdAt}</p>
                </div>
                <p>{msg.body}</p>
            </div> */
};
