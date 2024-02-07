import React from 'react';
import './Profile.css'

export default function Profile({ userID }) {

    const [pic, setPic] = React.useState("https://source.unsplash.com/random")

    function click() {
        console.log("click");
    }

    function ChangePic() {
        
    }


    return (
        <div className='profile--wrapper'>
            <div>
                <button className="profile--img-after" onClick={click}>
                    <img className="profile--img" alt="profile picture" src={pic}></img>
                </button>
                <div className="profile--settings-wrapper">
                    <div className="profile--user-wrapper">
                        <p className="profile--user-name">xlnvis</p>
                        <button onClick={click} className="profile--edit-btn">
                            <svg className="profile--edit-name-btn" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M19 19V5H5v14zm0-16a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-2.3 6.35l-1 1l-2.05-2.05l1-1c.21-.22.56-.22.77 0l1.28 1.28c.22.21.22.56 0 .77M7 14.94l6.06-6.06l2.06 2.06L9.06 17H7z"/></svg>
                        </button>
                    </div>
                    <div className="profile--edit-password-wrapper">
                        <button data-toggle="modal" data-target="#editpassword">Change Password</button>
                        <button>Delete Account</button>
                    </div>
                </div>
            </div>
        </div>
    )
}