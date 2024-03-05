import { useState } from "react";
import { auth } from "../../FirebaseConfig";
import {
  reauthenticateWithCredential,
  updatePassword,
  EmailAuthProvider,
} from "firebase/auth";

function ChangePasswordModal({ isOpen, onClose }) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleUpdatePassword = async () => {
    try {
      const user = auth.currentUser;

      // Reauthenticate the user
      const credential = EmailAuthProvider.credential(user.email, oldPassword);
      await reauthenticateWithCredential(user, credential);

      // Update the password
      await updatePassword(user, newPassword);

      setSuccessMessage("Password updated successfully");
      setErrorMessage("");

      setTimeout(() => {
        setSuccessMessage("");
        onClose(); // Close the modal on success
      }, 3000);
    } catch (error) {
      setErrorMessage("Error updating password");
      setSuccessMessage("");

      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  };

  if (!isOpen) return null; // Don't render the modal if it's not open

  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="p-5 w-auto max-w-md">
        {successMessage && (
          <p className="text-center font-bold bg-green-500 text-white px-4 py-3 rounded">
            {successMessage}
          </p>
        )}
        {errorMessage && (
          <p className="text-center font-bold bg-teal-500 text-white px-4 py-3 rounded">
            {errorMessage}
          </p>
        )}
        <div className="bg-slate-700 p-5 rounded">
          <h2 className="text-white font-bold text-xl mb-1">Update Your Password</h2>
          <p className="text-sm font-normal text-white mb-4">Please enter your old and new password below.</p>
          <input
            className="w-full p-2 mb-4 rounded border-0	"
            type="password"
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <input
            className="w-full p-2 mb-4 rounded border-0"
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button
            onClick={handleUpdatePassword}
            className="w-full bg-slate-800 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded"
          >
            Update Password
          </button>
          <button
            onClick={onClose}
            className="w-full mt-2 bg-white hover:bg-gray-200 text-black font-bold py-2 px-4 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChangePasswordModal;