import { useState, useEffect } from "react";
import { onAuthStateChanged, deleteUser, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../../FirebaseConfig.js";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, getDocs, query, where, deleteDoc, updateDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import EditUserNameModal from "./EditUserNameModal";
import DeleteAccountModal from "./DeleteAccountModal";
import "./Profile.css";
import useFirebaseImage from "./utils/useFirebaseImage.js";

function Profile() {
  const [img, setImg] = useState("");
  const [currentUser, setCurrentUser] = useState("");

   // Fetch background image URL from Firebase Storage
   const backgroundImageUrl = useFirebaseImage('bg-images/emanate-bg.png');

  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setCurrentUser(currentUser);
    });

    if (currentUser.uid) {
      const imageRef = ref(
        storage,
        `profilePicture/${currentUser.uid}/profilePic`
      );
      const url = getDownloadURL(imageRef)
        .then((res) => {
          setImg(res);
        })
        .catch((e) =>
          setImg(
            "https://images.unsplash.com/photo-1706795140056-2f9ce0ce8cb0?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          )
        );
    }
  }, [currentUser]);

  //is used to handle any file that gets uploaded.
  // 1st - checks to see if a file has been uploaded, if its undefined then do nothing
  // 2nd- creates an image ref unique to the signed in user, the img ref file path is profilePicture/${userId}/profilePic in storage
  // 3rd - once the image ref is made, then upload the file to that img ref in storage, and if it fails then console log 'upload failed'
  // 4th - if the upload is successfull, then try to get the URL of the img in storage, otherwise log an error about getting the url
  // 5th - when it successfully gets the img url, then set state to update what the user sees
  const handleFileUpload = (e) => {
    // const userId = auth.currentUser.uid
    const file = e.target.files[0];
    if (file !== undefined) {
      const imageRef = ref(
        storage,
        `profilePicture/${currentUser.uid}/profilePic`
      );
      uploadBytes(imageRef, file)
        .then(() => {
          const url = getDownloadURL(imageRef)
            .then((res) => setImg(res))
            .catch(() => console.log("error getting url"));
        })
        .catch(() => console.log("upload failed"));
    }
  };

  // deletes the user from authentication
  // then delete the users doc from the database
  const deleteProfile = async () => {
    localStorage.clear();
    await deleteDoc(doc(db, "users", currentUser.uid))
    deleteUser(currentUser)
    .then(() => {
      navigate("/login");
    })
    .catch((error) => {
      console.error("Error deleting user:", error);
    });
  };

  //checks to see if the username is already being used or not.
  const validateUser = async (username) => {
    const usersCollectionRef = collection(db,"users");
    const querySnapshot = await getDocs(
      query(usersCollectionRef, where("displayName", "==", username))
    );

    return querySnapshot.empty;
  };

  
  // check if no one else has the username
  // update their displayName in authentication
  // then update their displayName in their user doc
  const updateDisplayName = async (username) => {
    const query = await validateUser(username);
    if (!query) {
      window.alert("username already taken");
      return;
    }

    updateProfile(auth.currentUser, { displayName: username })
      .then(async () => {
        const userDoc = doc(db, "users", currentUser.uid);
        await updateDoc(userDoc, { displayName: username })
        navigate("/profile");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updatePassword = () => {
    navigate("/updatepassword");
  };

  return (
    // style used so the profile component fills in entire right side of sidebar
    <div
      className="profile--wrapper"
      style={{
        width: "1500%",
        padding: "20px",
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
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
          <label htmlFor="fileInput" className="custom-button">
            Choose a File
          </label>
          <img className="profile--img" src={img}></img>
        </div>
        <div className="profile--settings-wrapper">
          <div className="profile--user-wrapper">
            <p className="profile--user-name bg-amber-500">{currentUser.displayName !== null ? currentUser.displayName : ""}</p>
            <EditUserNameModal
              displayName={currentUser.displayName !== null ? currentUser.displayName : ""}
              updateDisplayName={updateDisplayName}
            />
          </div>
          <div className="profile--edit-password-wrapper">
            <button
              className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-amber-500 text-white hover:bg-amber-600 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" data-hs-overlay="#hs-focus-management-modal"
              data-toggle="modal"
              data-target="#editpassword"
              onClick={updatePassword}
            >
              Change Password
            </button>
            <div>
              <DeleteAccountModal deleteProfile={deleteProfile} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
