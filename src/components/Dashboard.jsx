// Importing necessary dependencies and styles
import "./Dashboard.css";
import { IconContext } from "react-icons";
import { useState } from "react";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../FirebaseConfig";
import { useNavigate } from "react-router-dom";
import NewChannel from "./NewChannel";

// Main Dashboard component
function Dashboard() {
  // State variables
  const [channels, setChannels] = useState([
    { id: 0, name: "Direct 1", type: "direct" },
    { id: 1, name: "Channel 1", type: "channel" },
    { id: 2, name: "Direct 2", type: "direct" },
    { id: 3, name: "Channel 2", type: "channel" },
  ]);
  const [channel, setChannel] = useState("");
  const [showChannel, setShowChannel] = useState(true);
  const [showDirect, setShowDirect] = useState(true);

  // Derived lists based on type
  const directMenu = channels.filter((item) => item.type === "direct");
  const channelMenu = channels.filter((item) => item.type === "channel");

  // Mapping channel and direct items
  const directElems = directMenu.map((item) => (
    <div key={item.id}>{item.name}</div>
  ));

  const channelElems = channelMenu.map((item) => (
    <div key={item.id}>{item.name}</div>
  ));

  // Function to add a new channel or direct message
  function addItem(type) {
    console.log("clicked");
    setChannels((prevChannels) => [
      ...prevChannels,
      { id: prevChannels.length + 1, name: "New Channel", type: type },
    ]);
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
        <div className="dashboard--link-wrappers">
          {/* Links to different sections */}
          <Link to="/profile" className="dashboard--link">
            {/* Profile icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M8 7a4 4 0 1 1 8 0a4 4 0 0 1-8 0m0 6a5 5 0 0 0-5 5a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3a5 5 0 0 0-5-5z"
                clipRule="evenodd"
              />
            </svg>
            <p>Profile</p>
          </Link>
          {/* ... (other links) ... */}
          <a href="" className="dashboard--link">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M21 19v1H3v-1l2-2v-6c0-3.1 2.03-5.83 5-6.71V4a2 2 0 0 1 2-2a2 2 0 0 1 2 2v.29c2.97.88 5 3.61 5 6.71v6zm-7 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2"
              />
            </svg>
            <p>Notifs</p>
          </a>
          <a href="" className="dashboard--link">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M271.514 95.5h-32v178.111l115.613 54.948l13.737-28.902l-97.35-46.268z"
              />
              <path
                fill="currentColor"
                d="M256 16C123.452 16 16 123.452 16 256s107.452 240 240 240s240-107.452 240-240S388.548 16 256 16m0 448c-114.875 0-208-93.125-208-208S141.125 48 256 48s208 93.125 208 208s-93.125 208-208 208"
              />
            </svg>
            <p>Recents</p>
          </a>
          <a href="" className="dashboard--link">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
            >
              <path
                fill="currentColor"
                d="M7 14s-1 0-1-1s1-4 5-4s5 3 5 4s-1 1-1 1zm4-6a3 3 0 1 0 0-6a3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5a2.5 2.5 0 0 0 0 5"
              />
            </svg>
            <p>Community</p>
          </a>
          <a href="" className="dashboard--link">
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
          </a>
        </div>
        {/* Logout link */}
        <Link
          to="/"
          className="dashboard--link dashboard--logout"
          onClick={handleLogout}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h7v2H5v14h7v2zm11-4l-1.375-1.45l2.55-2.55H9v-2h8.175l-2.55-2.55L16 7l5 5z"
            />
          </svg>
          <p>Log Out</p>
        </Link>
      </nav>

      {/* Channel Header and Lists */}
      <div className="dashboard--channels">
        {/* Channels */}
        <div className="channel--Header">
          <button onClick={() => addItem("channel")}>Channels</button>
          <button onClick={() => chevron(setShowChannel)}>
            <svg
              className={showChannel ? "dashboard--down" : "dashboard--left"}
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path fill="currentColor" d="m7 10l5 5l5-5z" />
            </svg>
          </button>
        </div>
        {/* Channel List */}
        <div className="channel-List">
          <div
            className={showChannel ? "direct--overflow" : "dashboard--hidden"}
          >
            {channelElems}
          </div>
        </div>
        {/* Direct Messages */}
        <div className="direct--Header">
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
        </div>
        {/* Direct List */}
        <div className="direct-List">
          <div
            className={showDirect ? "direct--overflow" : "dashboard--hidden"}
          >
            {directElems}
          </div>
        </div>
      </div>
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
              <button className="delete-button" onClick>
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
