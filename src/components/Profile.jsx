import React from 'react';
import EditUserNameModal from './EditUserNameModal'
import DeleteAccountModal from './DeleteAccoutModal';
import './Profile.css'

export default function Profile({ userID }) {
    const [currentName, setCurrentName] = React.useState("xlnvis")
    const [img, setImg] = React.useState("https://source.unsplash.com/random")
    console.log(img);

    const handleFileUpload = (e) => {
        setImg(() => URL.createObjectURL(e.target.files[0]));
    }


    return (
        // style used so the profile component fills in entire right side of sidebar
        <div className='profile--wrapper'  style={{ width: '1500%', padding: '20px' }}>
            <div>
                <div className="profile--img-wrapper">
                    <div className="profile--img-shadow"></div>
                    <input 
                        className="profile--file-upload" 
                        id="fileInput" 
                        type="file" 
                        accept=".jpg, .jpeg, .png"
                        onChange={handleFileUpload}
                    />
                    <label htmlFor="fileInput" className="custom-button">Choose a File</label>
                    <img className="profile--img" alt="profile picture" src={img}></img>
                </div>
                <div className="profile--settings-wrapper">
                    <div className="profile--user-wrapper">
                        <p className="profile--user-name">{currentName}</p>
                        <EditUserNameModal 
                            currentName={currentName} 
                            setCurrentName={setCurrentName} 
                        />
                    </div>
                    <div className="profile--edit-password-wrapper">
                        <button className="profile--modal-btn" data-toggle="modal" data-target="#editpassword">Reset Password</button>
                        <DeleteAccountModal />
                    </div>
                </div>
            </div>
        </div>
    )
}