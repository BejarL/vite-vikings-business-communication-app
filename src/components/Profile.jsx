import React from 'react';
import EditUserNameModal from './EditUserNameModal'
import DeleteAccountModal from './DeleteAccoutModal';
import { onAuthStateChanged, deleteUser, updateProfile } from 'firebase/auth'
import { auth, storage } from '../../FirebaseConfig.js'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { useNavigate } from "react-router-dom";
import './Profile.css'

export default function Profile() {
    const [img, setImg] = React.useState("")
    const [currentUser, setCurrentUser] = React.useState("");
    
    React.useEffect(() => {

        onAuthStateChanged(auth, (currentUser) => {
            setCurrentUser(currentUser);
        });
        
        if (currentUser.uid) {
            const imageRef = ref(storage, `profilePicture/${currentUser.uid}/profilePic`)
            const url = getDownloadURL(imageRef)
                .then((res) => {
                    setImg(res);
                })
                .catch((e) => setImg("https://images.unsplash.com/photo-1706795140056-2f9ce0ce8cb0?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"))
        }
    }, [currentUser])
    
    //is used to handle any file that gets uploaded.
    // 1st - checks to see if a file has been uploaded, if its undefined then do nothing
    // 2nd- creates an image ref unique to the signed in user, the img ref file path is profilePicture/${userId}/profilePic in storage
    // 3rd - once the image ref is made, then upload the file to that img ref in storage, and if it failes then console log 'upload failed'
    // 4th - if the upload is successfull, then try to get the URL of the img in storage, otherwise log an error about getting the url
    // 5th - when it successfully gets the img url, then set state to update what the user sees
    const handleFileUpload = (e) => {
        // const userId = auth.currentUser.uid
        const file = e.target.files[0];
        if (file !== undefined) {
            const imageRef = ref(storage, `profilePicture/${currentUser.uid}/profilePic`)
            uploadBytes(imageRef, file)
                .then(() => {
                    const url = getDownloadURL(imageRef)
                        .then((res) => setImg(res))
                        .catch(() => console.log("error getting url"))
                })
                .catch(() => console.log("upload failed"));
        }
    }
    
    const navigate = useNavigate();
    const deleteProfile = async () => {
        navigate("/login")
        localStorage.clear();
        deleteUser(currentUser).then(() => {
            console.log("user deleted");
          }).catch((error) => {
            
          });
    }

    const updateDisplayName = async (username) => {
        updateProfile(auth.currentUser, {
            displayName: username
          }).then(() => {
            navigate("/profile");
          }).catch((error) => {
            console.log(error);
          });
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
                    <img className="profile--img" src={img}></img>
                </div>
                <div className="profile--settings-wrapper">
                    <div className="profile--user-wrapper">
                        <p className="profile--user-name">{currentUser.displayName}</p>
                        <EditUserNameModal
                        displayName={currentUser.displayName}
                        updateDisplayName={updateDisplayName}
                        />
                    </div>
                    <div className="profile--edit-password-wrapper">
                        <button className="profile--modal-btn">Reset Password</button>
                        <DeleteAccountModal deleteProfile={deleteProfile} />
                    </div>
                </div>
            </div>
        </div>
    )
}