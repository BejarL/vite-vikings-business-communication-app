import { Link } from "react-router-dom";
import { useState } from "react";
import { auth } from "../../../FirebaseConfig";
import {
  reauthenticateWithCredential,
  updatePassword,
  EmailAuthProvider,
} from "firebase/auth";

function UpdatePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleUpdatePassword = async () => {
    try {
      const user = auth.currentUser;

      // Reauthenticate the user with their old password
      const credential = EmailAuthProvider.credential(user.email, oldPassword);
      await reauthenticateWithCredential(user, credential);

      // Update the password
      await updatePassword(user, newPassword);

      // Set success message
      setSuccessMessage("Password updated successfully");
      setErrorMessage("");

      // Clear messages after 3 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);

      console.log("Password updated successfully");
    } catch (error) {
      setErrorMessage(`Error updating password`);
      setSuccessMessage("");

      // Clear messages after 3 seconds
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  };

  return (
    <>
      {successMessage && (
        <p className="text-center font-bold bg-orange-500 text-white px-4 py-3 rounded relative fade-in transition-opacity duration-1000 ease-in-out fade-out">
          {successMessage}
        </p>
      )}
      {errorMessage && (
        <p className="text-center font-bold bg-orange-500 text-white px-4 py-3 rounded relative fade-in transition-opacity duration-1000 ease-in-out fade-out">
          {errorMessage}
        </p>
      )}
      <div className="h-screen md:flex">
        <div className="flex md:w-full justify-center py-10 items-center bg-amber-500">
          <form className="bg-amber-500">
            <h1 className="text-white font-bold text-2xl mb-1">Emanate</h1>
            <h2 className="text-white font-bold text-2xl mb-1">
              Update Your Password
            </h2>
            <p className="text-sm font-normal text-white mb-7">
              Please enter your old and new password below.
            </p>
            <div className="flex items-center bg-amber-400 py-2 px-3 rounded-2xl mb-4">
              <input
                className="pl-2 bg-amber-400 placeholder-white outline-none border-none"
                type="password"
                placeholder="Old Password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center bg-amber-400 py-2 px-3 rounded-2xl mb-4">
              <input
                className="pl-2 bg-amber-400 placeholder-white outline-none border-none"
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <button
              onClick={handleUpdatePassword}
              type="button"
              className="block w-full bg-white hover:bg-amber-600 hover:text-white text-amber-600 mt-4 py-2 rounded-2xl font-bold mb-2"
            >
              Update Password
            </button>
            <Link to="/profile">
              <button
                type="button"
                className="block w-full hover:bg-white bg-amber-600 text-white hover:text-amber-600 mt-4 py-2 rounded-2xl font-bold mb-2"
              >
                Cancel
              </button>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}

export default UpdatePassword;
