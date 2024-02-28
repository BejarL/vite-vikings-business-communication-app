import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, deleteUser, updateProfile } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { auth, storage, db } from "../../FirebaseConfig";
import EditUserNameModal from "../modals/EditUserNameModal";
import DeleteAccountModal from "../modals/DeleteAccountModal";
import useFirebaseImage from "./utils/useFirebaseImage";
import ChangePasswordModal from "../modals/ChangePasswordModal";
import './Profile.css'

function Profile() {
  const [img, setImg] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  const backgroundImageUrl = useFirebaseImage("bg-images/emanate-bg.png");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        fetchProfilePicture(user.uid);
      } else {
        // Handle case when user is not signed in or has been signed out.
        navigate("/login");
      }
    });

    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, [navigate]);

  const fetchProfilePicture = (uid) => {
    const imageRef = ref(storage, `profilePicture/${uid}/profilePic`);
    getDownloadURL(imageRef)
      .then(setImg)
      .catch((e) =>
        setImg(
          "https://images.unsplash.com/photo-1706795140056-2f9ce0ce8cb0?..."
        )
      );
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageRef = ref(
      storage,
      `profilePicture/${currentUser.uid}/profilePic`
    );
    uploadBytes(imageRef, file)
      .then(() => getDownloadURL(imageRef))
      .then((fileURL) => {
        // update user profile picture URL in authentication
        updateProfile(auth.currentUser, {photoURL: fileURL});

        // update user profile picture URL  in firestore document 
        const userDocRef = doc(db, "users", currentUser.uid);
        updateDoc(userDocRef, {authorProfilePic: fileURL})

        setImg(fileURL);
      })
      // .then(setImg)
      .catch((e) => console.error("Error uploading or retrieving URL", e));
  };

  const deleteProfile = async () => {
    if (!currentUser) return;

    try {
      await deleteDoc(doc(db, "users", currentUser.uid));
      await deleteUser(currentUser);
      navigate("/login");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const validateUser = async (username) => {
    const querySnapshot = await getDocs(
      query(collection(db, "users"), where("displayName", "==", username))
    );
    return querySnapshot.empty;
  };

  const updateDisplayName = async (username) => {
    const isUnique = await validateUser(username);
    if (!isUnique) {
      alert("Username already taken");
      return;
    }

    try {
      // update user display name in authentication
      await updateProfile(auth.currentUser, { displayName: username });
      // update user display name in firestore document
      await updateDoc(doc(db, "users", currentUser.uid), {
        displayName: username,
      });
      navigate("/profile");
    } catch (error) {
      console.error("Error updating display name:", error);
    }
  };

  return (
    <div
      className="profile--wrapper "
      style={{
        width: "1500%",
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: "cover",
      }}
    >
      <div className="profile--img-wrapper">
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
        <img src={img} alt="Profile" className="profile--img"></img>
      </div>
      <div className="profile--settings-wrapper">
        <div className="profile--user-wrapper">
          <p className="profile--user-name bg-amber-500">
            {currentUser?.displayName || ""}
          </p>
          <EditUserNameModal
            displayName={currentUser?.displayName || ""}
            updateDisplayName={updateDisplayName}
          />
        </div>
        <div className="profile--edit-password-wrapper">
          <button
            className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-amber-500 text-white hover:bg-amber-600 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            onClick={toggleModal}
          >
            Change Password
          </button>
          <ChangePasswordModal isOpen={isModalOpen} onClose={toggleModal} />
        </div>
        <DeleteAccountModal deleteProfile={deleteProfile} />
      </div>
    </div>
  );
}

export default Profile;
