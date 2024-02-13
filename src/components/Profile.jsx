import { useState } from 'react';
import EditUserNameModal from './EditUserNameModal'
import './Profile.css'
import { useNavigate } from 'react-router-dom';

export default function Profile({ userID }) {
    const [currentName, setCurrentName] = useState("xlnvis")

    const navigate = useNavigate()


    function click() {
        console.log("click");
    }
    
    function updatePassword () {
        navigate('/updatepassword')
    }

    return (
        <div className='profile--wrapper'>
            <div>
                <button className="profile--img-after" onClick={click}>
                    <img className="profile--img" alt="profile picture" src="https://source.unsplash.com/random"></img>
                </button>
                <div className="profile--settings-wrapper">
                    <div className="profile--user-wrapper">
                        <p className="profile--user-name">{currentName}</p>
                        <EditUserNameModal currentName={currentName} setCurrentName={setCurrentName} />
                    </div>
                    <div className="profile--edit-password-wrapper">
                        <button data-toggle="modal" data-target="#editpassword" onClick={updatePassword}>Change Password</button>
                  
                        <button>Delete Account</button>
                    </div>
                </div>
            </div>
        </div>
    )
}