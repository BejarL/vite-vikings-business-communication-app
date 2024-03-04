// Importing necessary dependencies and styles
import "./Dashboard.css";
import "./Profile";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../FirebaseConfig";
import { useNavigate } from "react-router-dom";
import NewChannel from "../modals/NewChannel";
import { doc, onSnapshot } from "firebase/firestore";
import DeleteChannelModal from "../modals/DeleteChannelModal";
// import { updateDoc, deleteDoc, arrayRemove } from "firebase/firestore";
import TextArea from "./TextArea";
// import exp from "constants";
import Profile from "./Profile";
import HomePage from "./HomePage";

function Dashboard() {
  const [channels, setChannels] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const [currentChannel, setCurrentChannel] = useState("");
  const navigate = useNavigate();
  const [isChannelShown, setIsChannelShown] = useState(false);
  const [isProfileShown, setIsProfileShown] = useState(false);
  const [isHomeShown, setIsHomeShown] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setCurrentUser(currentUser);
    });
    if (currentUser.uid) {
      const unsubscribe = onSnapshot(
        doc(db, "users", currentUser.uid),
        function (doc) {
          setChannels(doc.data().chat);
        }
      );
      return unsubscribe;
    }
  }, [currentUser]);

  // Function to handle user logout
  const handleLogout = async () => {
    await signOut(auth);
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    navigate("/login");
  };

  const profileView = () => {
    () => navigate("/profile");
    setIsChannelShown(false);
    setIsProfileShown(true);
    setIsHomeShown(false);
  };

  const homeView = () => {
    () => navigate("/");
    setIsChannelShown(false);
    setIsProfileShown(false);
    setIsHomeShown(true)
  }
  //removes the channel from the users array of channels in firebase

  // first checking if the current user is the creator
  // if they arent, just delete the channel from their chats and remove them from the members list of the chat
  // if they are, need to remove the channel from their chat and every other member in the chat, then delete the channel

  // const click = (obj) => {
  //   console.log("clicked");
  //   removeChannel(obj);
  // };
  const goToChannel = (channel) => {
    setCurrentChannel(channel);
    setIsProfileShown(false);
    setIsChannelShown(true);
    setIsHomeShown(false);
  };

  let channelElems = channels.map((item) => {
    // Ensured correct mapping and key usage
    const channel = JSON.parse(item);
    return (
      <DeleteChannelModal
        key={channel.channelId}
        channel={channel}
        currentUser={currentUser}
        goToChannel={goToChannel}
      />
    );
  });

  // JSX structure
  return (
    <div className="dashboard--wrapper border-8 border-radio border-slate-700">
      {/* Navbar */}
      <nav className="dashboard--navbar border-r-8 border-slate-700">
        <div className="flex flex-col items-center w-52 h-full overflow-hidden text-teal-400 bg-slate-900 ">
          <a className="flex items-center w-full px-3 mt-3" href="#">
            <img src="https://firebasestorage.googleapis.com/v0/b/emanate-demo.appspot.com/o/bg-images%2Fblue-logo.png?alt=media&token=c0b3ae42-ebfc-43d3-bc49-e614b221c4c5" 
            className="h-10 w-10 m-0"
            onClick={homeView}
            />
            <span className="ml-3 text-lg font-bold">Emanate</span>
          </a>
          <div className="w-full px-2">
            <div className="flex flex-col items-center w-full mt-3 border-t border-b border-teal-900">
              <button
                className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-slate-700 hover:text-gray-300"
                onClick={profileView}
              >
                <svg
                  className="w-6 h-6 stroke-current"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="ml-2 text-md font-medium">Profile</span>
              </button>
               <NewChannel currentUser={currentUser.displayName} />
            </div>
          </div>
          <div className="flex flex-col items-center w-full overflow-y-auto max-h-[100%] mt-3">
            <div className="">{channelElems}</div>
          </div>
          <Link
            className="flex items-center justify-center w-full h-16 mt-auto text-white bg-slate-800 hover:bg-slate-700 hover:text-gray-300"
            to="/"
            onClick={handleLogout}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.5em"
              height="3em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M5 3h6a3 3 0 0 1 3 3v4h-1V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-4h1v4a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3m3 9h11.25L16 8.75l.66-.75l4.5 4.5l-4.5 4.5l-.66-.75L19.25 13H8z"
              />
            </svg>
            <span className="ml-2 text-sm font-medium">Log Out</span>
          </Link>
        </div>
      </nav>
      { isHomeShown && (<HomePage />)}
      {isChannelShown && <TextArea channel={currentChannel} homeView={homeView}/>}
      {isProfileShown && <Profile />}
    </div>
  );
}
export default Dashboard;
