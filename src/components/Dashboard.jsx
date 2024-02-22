// Importing necessary dependencies and styles
import "./Dashboard.css";
import { IconContext } from "react-icons";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../FirebaseConfig";
import { useNavigate } from "react-router-dom";
import NewChannel from "./NewChannel";
import { onSnapshot, collection, doc } from "firebase/firestore";

// Main Dashboard component
function Dashboard() {  
  // State variables
  const [channels, setChannels] = useState([]);
  // const [channel, setChannel] = useState("");
  const [showChannel, setShowChannel] = useState(true);
  const [currentUser, setCurrentUser] = useState("")

  useEffect(() => {
      onAuthStateChanged(auth, (currentUser) => {
        setCurrentUser(currentUser);
      });

      if (currentUser.uid) {
        const unsubscribe= onSnapshot(doc(db, "users", currentUser.uid), function (doc) {
          setChannels(doc.data().chat);
        })
        return unsubscribe;
      }
  }, [currentUser])
  
  // Derived lists based on type
  // const directMenu = channels.filter((item) => item.type === "direct");
  // const channelMenu = channels.filter((item) => item.type === "channel");

  // Mapping channel and direct items
  // const directElems = directMenu.map((item) => (
  //   <div key={item.id}>{item.name}</div>
  // ));

  let channelElems = []
  if (channels) {
    channelElems = channels.map((item) => {
      
      const obj = JSON.parse(item);
      return (
        <div key={obj.channelId}>{obj.channelName}</div>
        )
    });
    } 
      

  // Function to route back to home for an authenticated user 
  function home() {
    navigate("/");
  }
  // Function to toggle the visibility of the channel or direct menu
  const chevron = (set) => {
    set((prev) => !prev);
  };

  // Navigation hook
  const navigate = useNavigate();

  // Function to handle user logout
  const handleLogout = async () => {
    await signOut(auth);
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    navigate("/login");
  };

  // JSX structure
  return (
    <div className="dashboard--wrapper">
      {/* Navbar */}
      <nav className="dashboard--navbar">
      <div className="flex flex-col items-center w-40 h-full overflow-hidden text-amber-700 bg-orange-300">
		<a className="flex items-center w-full px-3 mt-3" href="#">
			<svg className="w-8 h-8 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" onClick={home}>
				<path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
			</svg>
			<span className="ml-2 text-sm font-bold">Emanate</span>
		</a>
		<div className="w-full px-2">
			<div className="flex flex-col items-center w-full mt-3 border-t border-blue-900">
				<Link className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300" to="/profile">
          <svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
			    </svg>
					<span className="ml-2 text-sm font-medium">Profile</span>
				</Link>
					<NewChannel />
			</div>
		</div>
		<Link className="flex items-center justify-center w-full h-16 mt-auto bg-gray-800 hover:bg-gray-700 hover:text-gray-300" to="/" onClick={handleLogout}>
		<svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="3em" viewBox="0 0 24 24"><path fill="currentColor" d="M5 3h6a3 3 0 0 1 3 3v4h-1V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-4h1v4a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3m3 9h11.25L16 8.75l.66-.75l4.5 4.5l-4.5 4.5l-.66-.75L19.25 13H8z"/></svg>
			<span className="ml-2 text-sm font-medium">Log Out</span>
		</Link>
    <div className="flex flex-col items-center w-full mt-3 border-t border-blue-900">
        
    </div>
	</div>
      </nav>


        {/* Channel List kept but not sure if needed */}
        {/* <div className="channel-List">
          <div
            className={showChannel ? "direct--overflow" : "dashboard--hidden"}
          >
            {channelElems}
          </div>
        </div> */}
        {/* Direct Messages */}
        {/* <div className="direct--Header">
           <button onClick={() => addItem("direct")}>Direct Messages</button>
          <button onClick={() => chevron(setShowDirect)}> 
            <svg
              className={showDirect ? "dashboard--down" : "dashboard--left"}
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path fill="currentColor" d="m7 10l5 5l5-5z" />
            </svg>
          </button>
        </div> */}
        {/* Direct List */}
        {/* <div className="direct-List">
          <div
            className={showDirect ? "direct--overflow" : "dashboard--hidden"}
          >
            {directElems}
          </div>
        </div> */}
      
      <div>
        {/* Additional components, e.g., NewChannel, textbox, etc. */}
        <div className="dashboard--textbox"></div>
        <div className="textbox"></div>
        <div className="title">
          <div className="title-wrapper">
            <h1 className="channel-title">Vite Vikings Channel</h1>
            <button className="settings-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
              </svg>
            </button>
          </div>
        </div>

        <div className="message-box">
          <div className="sender-info">
            <svg
              className="icon"
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 15 15"
            >
              <path
                fill="currentColor"
                d="M4.5 11.5H4a.5.5 0 0 0 .5.5zm6 0v.5a.5.5 0 0 0 .5-.5zm-6 .5h6v-1h-6zm6.5-.5v-2h-1v2zm-7-2v2h1v-2zM7.5 6A3.5 3.5 0 0 0 4 9.5h1A2.5 2.5 0 0 1 7.5 7zM11 9.5A3.5 3.5 0 0 0 7.5 6v1A2.5 2.5 0 0 1 10 9.5zm3 2c0 .245-.114.52-.406.816c-.294.299-.745.59-1.341.846c-1.191.51-2.871.838-4.753.838v1c1.984 0 3.804-.344 5.147-.92c.67-.287 1.245-.642 1.659-1.061c.416-.422.694-.936.694-1.519zM7.5 14c-1.882 0-3.562-.328-4.753-.838c-.596-.256-1.047-.547-1.341-.846C1.114 12.02 1 11.747 1 11.5H0c0 .583.278 1.097.694 1.519c.414.42.989.774 1.66 1.062C3.695 14.656 5.515 15 7.5 15zM1 11.5c0-.242.11-.513.394-.805c.286-.294.725-.582 1.306-.837l-.4-.916c-.656.287-1.218.64-1.622 1.056C.27 10.416 0 10.925 0 11.5zm11.3-1.642c.581.255 1.02.543 1.305.837c.284.292.395.563.395.805h1c0-.575-.27-1.084-.678-1.502c-.404-.416-.966-.769-1.622-1.056zM7.5 4A1.5 1.5 0 0 1 6 2.5H5A2.5 2.5 0 0 0 7.5 5zM9 2.5A1.5 1.5 0 0 1 7.5 4v1A2.5 2.5 0 0 0 10 2.5zM7.5 1A1.5 1.5 0 0 1 9 2.5h1A2.5 2.5 0 0 0 7.5 0zm0-1A2.5 2.5 0 0 0 5 2.5h1A1.5 1.5 0 0 1 7.5 1z"
              ></path>
            </svg>
            <span className="sender-name">Aarron</span>
            <span className="message-date">02/09/2024</span>

            <div className="message">
              <p className="message content">
                Group Project: Business Communication App
              </p>
              <ul className="message-list">
                <li>Functional Requirements</li>
                <li>
                  Add the ability for users to select a channel from a list of
                  channels on a menu.
                </li>
                <li>
                  List all messages from a given channel, with the following
                  fields
                </li>
                <ul>
                  <li>Avatar image</li>
                  <li>User name</li>
                  <li>Message send date</li>
                  <li>Message text</li>
                  <li>
                    Add a text box that allows users to send a message in a
                    channel.
                  </li>
                  <li>Add a delete button to each message the user sends.</li>
                </ul>
              </ul>
              <button className="delete-button">

                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  <line x1="10" y1="11" x2="10" y2="17"></line>
                  <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="reply.box">
          <textarea
            className="reply-textarea"
            placeholder="type your reply here..."
            rows={3}
            cols={50}
          />
          <button className="reply-button" disabled>
            Reply
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;