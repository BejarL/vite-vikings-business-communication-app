
import './Dashboard.css'
import { IconContext } from 'react-icons';
import NewChannel from './NewChannel';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../FirebaseConfig';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  // State variables
  const [channels, setChannels] = useState([
    { id: 0, name: 'Direct 1', type: 'direct' },
    { id: 1, name: 'Channel 2', type: 'channel' },
    { id: 2, name: 'Direct 3', type: 'direct' },
    { id: 3, name: 'Channel 4', type: 'channel' },
  ]);
  const [channel, setChannel] = useState('');
  const [showChannel, setShowChannel] = useState(true);
  const [showDirect, setShowDirect] = useState(true);

  // Derived lists based on type
  const directMenu = channels.filter((item) => item.type === 'direct');
  const channelMenu = channels.filter((item) => item.type === 'channel');

    const directElems = directMenu.map(item => {
        return (
            <div key={item.id}>
                {item.name}
            </div>
        )
    })
    const channelElems = channelMenu.map(item => {
        return (
            <div  key={item.id}>
                {item.name}
            </div>
        )
    })
            function addItem(type) {
                console.log("clicked");
                setChannels(prevChannels => {
             return ( 
                [...prevChannels,  {id: prevChannels.length + 1, name: "New Channel", type: type}]
                )
            }) 
}

  // JSX elements for direct and channel menus
  const directElems = directMenu.map((item) => (
    <div key={item.id}>{item.name}</div>
  ));
  const channelElems = channelMenu.map((item) => (
    <div key={item.id}>{item.name}</div>
  ));

  // Function to add a new item to channels
  const addItem = (type) => {
    console.log('clicked');
    setChannels((prevChannels) => [
      ...prevChannels,
      { id: prevChannels.length + 1, name: 'New Channel', type: type },
    ]);
  };

  // Function to toggle the visibility of the channel or direct menu
  const chevron = (set) => {
    set((prev) => !prev);
  };

  // Navigation hook
  const navigate = useNavigate();

  // Function to handle user logout
  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  // JSX structure
    return (
        <div className="dashboard--wrapper">
        <nav className="dashboard--navbar">
          <div className="dashboard--link-wrappers">
            <Link to='/profile' className="dashboard--link">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M8 7a4 4 0 1 1 8 0a4 4 0 0 1-8 0m0 6a5 5 0 0 0-5 5a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3a5 5 0 0 0-5-5z" clipRule="evenodd"/></svg>
                <p>Profile</p>
            </Link>
            <a href="" className="dashboard--link">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M21 19v1H3v-1l2-2v-6c0-3.1 2.03-5.83 5-6.71V4a2 2 0 0 1 2-2a2 2 0 0 1 2 2v.29c2.97.88 5 3.61 5 6.71v6zm-7 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2"/></svg>
                <p>Notifs</p>
            </a>
            <a href="" className="dashboard--link">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512"><path fill="currentColor" d="M271.514 95.5h-32v178.111l115.613 54.948l13.737-28.902l-97.35-46.268z"/><path fill="currentColor" d="M256 16C123.452 16 16 123.452 16 256s107.452 240 240 240s240-107.452 240-240S388.548 16 256 16m0 448c-114.875 0-208-93.125-208-208S141.125 48 256 48s208 93.125 208 208s-93.125 208-208 208"/></svg>
                <p>Recents</p>                   
            </a>
            <a href="" className="dashboard--link">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16"><path fill="currentColor" d="M7 14s-1 0-1-1s1-4 5-4s5 3 5 4s-1 1-1 1zm4-6a3 3 0 1 0 0-6a3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5a2.5 2.5 0 0 0 0 5"/></svg>                        
                <p>Community</p>                   
            </a>
            <a href="" className="dashboard--link">
                <svg xmlns="http://www.w3.org/2000/svg" width="0.88em" height="1em" viewBox="0 0 448 512"><path fill="currentColor" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32v144H48c-17.7 0-32 14.3-32 32s14.3 32 32 32h144v144c0 17.7 14.3 32 32 32s32-14.3 32-32V288h144c17.7 0 32-14.3 32-32s-14.3-32-32-32H256z"/></svg>
                <p>New Channel</p>
            </a>
        </div>
            <Link to="/" className="dashboard--link dashboard--logout" onClick={handleLogout}>
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h7v2H5v14h7v2zm11-4l-1.375-1.45l2.55-2.55H9v-2h8.175l-2.55-2.55L16 7l5 5z"/></svg>
            <p>Log Out</p>
          </Link>
      </nav>

            <div className="dashboard--channels">
        {/* Channel Header */}
        <div className="channel--Header">
          <button onClick={() => addItem('channel')}>Channels</button>
          <button onClick={() => chevron(setShowChannel)}>
            <svg
              className={showChannel ? 'dashboard--down' : 'dashboard--left'}
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path fill="currentColor" d="m7 10l5 5l5-5z" />
            </svg>
          </button>
        </div>
                <div className="direct-List">
                    <div className={showDirect ? "direct--overflow" : "dashboard--hidden"}>
                        {directElems}
                    </div>
                </div>
            </div>
           
            <div className="dashboard--textbox">
            <div className= "textbox">

            </div>
            </div>

        {/* Channel List */}
        <div className="channel-List">
          <div className={showChannel ? 'direct--overflow' : 'dashboard--hidden'}>{channelElems}</div>
        </div>

        {/* Direct Header */}
        <div className="direct--Header">
          <button onClick={() => addItem('direct')}>Direct Messages</button>
          <button onClick={() => chevron(setShowDirect)}>
            <svg
              className={showDirect ? 'dashboard--down' : 'dashboard--left'}
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
          <div className={showDirect ? 'direct--overflow' : 'dashboard--hidden'}>{directElems}</div>
        </div>
      </div>

      <div className="dashboard--textbox"></div>
    </div>
  );
}

export default Dashboard;