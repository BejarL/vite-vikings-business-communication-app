import { useState, useEffect } from 'react';
import { onSnapshot, addDoc, collection, query, getDocs, orderBy } from "firebase/firestore";
import { auth, db } from "../../FirebaseConfig";

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
                    messagesData.push(doc.data())
                });
                setMessages(messagesData);
            })
            return unsubscribe;
        }
    }, [channel])

    const handleMessageField = (e) => {
        setMessageField(e.target.value)
    }

    const sendMessage = async () => {
        const newMessage = {
            authorProfilePic: "",
            body: messageField,
            createdAt: new Date(),
            messageId: crypto.randomUUID(),
            userId: auth.currentUser.uid
        }

        await addDoc(chat, newMessage);
    }

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

    const deleteMsg = () => {
        
    }

    const messagesElems = messages.map(msg => {


        let timeStamp = convertDate(msg.createdAt)

        return (
            <div key={msg.messageId}>
                <div>
                    <div>
                        <img src={msg.profilePic} alt="profile picture"></img>
                        <p>{msg.userId}</p>
                    </div>
                    <p>{timeStamp}</p>
                </div>
                <p>{msg.body}</p>
            </div>
        )
    })

    

    return (
        <div className="relative dashboard--textbox w-[100%] flex flex-col">
            <div className="w-100 h-8 mt-3 border-b border-blue-900 m-1">
                <p className="ml-7 text-base">{channel.channelName}</p>
            </div>
            <div className="text-area overflow-y-auto">{loading ? "loading" : messagesElems}</div>

            <div className="absolute bottom-0 w-[100%] flex flex-col">
                <input className="w-[100%]" value={messageField} placeholder="Type your message here" onChange={handleMessageField}/>
                <button className="p-2 bg-blue-500 text-white" onClick={sendMessage}>Send</button>
            </div>
        </div>
  )
}



{/* <div key={msg.messageId}>
                <div>
                    <div>
                        <img src={msg.profilePic} alt="profile picture"></img>
                        <p>{displayName}</p>
                    </div>
                    <p>{msg.createdAt}</p>
                </div>
                <p>{msg.body}</p>
            </div> */}