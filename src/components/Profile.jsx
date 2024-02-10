import React from 'react';
import EditUserNameModal from './EditUserNameModal'
import DeleteAccountModal from './DeleteAccoutModal';
import { onAuthStateChanged } from 'firebase/auth'
import { auth, storage } from '../../FirebaseConfig.js'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import './Profile.css'

export default function Profile({ userID }) {
    const [currentName, setCurrentName] = React.useState("xlnvis")
    const [img, setImg] = React.useState("")
    const [userId, setUserId] = React.useState("");

    onAuthStateChanged(auth, (currentUser) => {
        setUserId(currentUser.uid);
    });
    
    React.useEffect(() => {
        if (userId) {
            const imageRef = ref(storage, `profilePicture/${userId}/profilePic`)
            const url = getDownloadURL(imageRef)
                .then((res) => setImg(res))
                .catch(() => console.log("initial load failed or doesnt exist"))
        }
    }, [userId])
    
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
            const imageRef = ref(storage, `profilePicture/${userId}/profilePic`)
            uploadBytes(imageRef, file)
                .then(() => {
                    const url = getDownloadURL(imageRef)
                        .then((res) => setImg(res))
                        .catch(() => console.log("error getting url"))
                })
                .catch(() => console.log("upload failed"));
        }
    }

    const deleteProfile = () => {
        
    }

    return (
        <div className='profile--wrapper'>
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