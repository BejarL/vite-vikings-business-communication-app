import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth, db } from "../../../FirebaseConfig";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import {
  collection,
  query,
  getDocs,
  where,
  doc,
  setDoc,
} from "firebase/firestore";
import Footer from "../Footer";

function SignUp() {
  // State variables to manage user input and error/success messages
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [signupSuccess, setSignupSuccess] = useState(false);
  const navigate = useNavigate();

  // Constants for password complexity requirements
  const MIN_PASSWORD_LENGTH = 8;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;

  // Use useEffect to clear error and success messages after a timeout
  useEffect(() => {
    if (error || signupSuccess) {
      const errorTimeout = setTimeout(() => {
        setError(null);
        setSignupSuccess(false); // Reset signup success status
      }, 3000);

      return () => clearTimeout(errorTimeout);
    }
  }, [error, signupSuccess]);

  // Function to check if the username already exists
  const checkUsernameExists = async (username) => {
    const usersCollectionRef = collection(db, "users");
    const q = query(usersCollectionRef, where("displayName", "==", username));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  };

  // Function to handle the signup process
  const signUp = async (e) => {
    e.preventDefault();

    // Validate password complexity and match with confirmation
    if (
      !passwordRegex.test(password) ||
      password.length < MIN_PASSWORD_LENGTH ||
      password !== passwordConfirmation
    ) {
      setError("Password must meet the requirements.");
      return;
    }

    try {
      const usernameExists = await checkUsernameExists(username);
      if (usernameExists) {
        setError("Username is already taken. Please choose a different one.");
        return;
      }

      // Create user account and update profile
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await updateProfile(user, { displayName: username });
      await sendEmailVerification(user);

      // Save user information to Firestore "users" collection
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: username,
        chat: [],
      });

      // Redirect to login page and set signup success status
      navigate("/login");
      setSignupSuccess(true);

      // Store user information in session storage
      sessionStorage.setItem("token", user.accessToken);
      sessionStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      console.error("Error during signup:", error);
      setError("Failed to sign up. Please try again.");
    }
  };

  return (
    <>
      {/* Display error message if there is any */}
      {error && (
        <div className="error-message text-center font-bold bg-teal-500 text-white px-4 py-3 rounded relative fade-in transition-opacity duration-1000 ease-in-out fade-out">
          {error}
        </div>
      )}

      {/* Main layout for the signup page */}
      <div
        className="h-screen md:flex "
        style={{
          backgroundImage: `url(https://firebasestorage.googleapis.com/v0/b/emanate-demo.appspot.com/o/bg-images%2F1.png?alt=media&token=6d769590-a1c1-491e-bf00-da8bbafb66b6)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <img src="https://firebasestorage.googleapis.com/v0/b/emanate-demo.appspot.com/o/bg-images%2Fblue-logo.png?alt=media&token=c0b3ae42-ebfc-43d3-bc49-e614b221c4c5" 
          className="h-10 w-10 mt-4 absolute left-1/3"
        />
        <h1 className="text-teal-900 font-bold text-3xl mt-4 absolute left-1/2 transform -translate-x-1/2"
        >
          Emanate 
        </h1>
        <div className="signup-form flex md:w-1/2 justify-center py-10 items-center">
          {/* Form */}
          <form
            onSubmit={signUp}
            className="bg-slate-900 md:w-96 p-8 shadow-lg backdrop-blur-md bg-opacity-50 rounded-lg"
          >
            {/* Form header */}
            <p className="text-lg font-bold text-white mb-2">Create Account</p>
            {/* Password complexity requirements */}
            <p className="text-sm font-normal text-white mb-3">
              Password:
              <li> 8 characters long </li>
              <li> Include uppercase and lowercase </li>
              <li> Include numbers and special characters</li>
            </p>
            {/* Input fields for username, email, password, and password confirmation */}
            <label htmlFor="username" className="text-white pl-2">
              Username
            </label>
            <div className="flex items-center bg-teal-100 py-2 px-3 rounded-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              ></svg>
              <input
                className="pl-2 bg-teal-100 placeholder-black outline-none border-none"
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <label htmlFor="email" className="text-white pl-2">
              {" "}
              Email
            </label>
            <div className="flex items-center bg-teal-100 py-2 px-3 rounded-2xl ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              ></svg>
              <input
                className="pl-2 bg-teal-100 placeholder-black outline-none border-none"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <label htmlFor="password" className="text-white pl-2">
              Password
            </label>
            <div className="flex items-center bg-teal-100 py-2 px-3 rounded-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              ></svg>
              <input
                className="pl-2 bg-teal-100 placeholder-black outline-none border-none"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <label htmlFor="password" className="text-white pl-2">
              Confirm Password
            </label>
            <div className="flex items-center bg-teal-100 py-2 px-3 rounded-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              ></svg>
              <input
                className="pl-2 bg-teal-100 placeholder-black outline-none border-none"
                type="password"
                placeholder="Confirm password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="block w-full bg-white hover:bg-slate-900 hover:text-white text-teal-600 mt-6 py-2 rounded-2xl font-bold mb-2"
            >
              Sign up
            </button>
          </form>
        </div>
        {/* Section for returning users */}
        <div className="returning-users relative overflow-hidden md:flex w-1/2 i justify-around items-center">
          <div>
            <h1 className="text-white font-bold text-4xl font-sans">
              Welcome back!
            </h1>
            <p className="text-white mt-1">
              If you already have an account, log in here
            </p>
            {/* Link to the login page */}
            <Link to="/login">
              <button
                type="submit"
                className="block w-28 bg-white hover:bg-slate-900 hover:text-white text-teal-600 mt-4 py-2 rounded-2xl font-bold mb-2"
              >
                Log in
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default SignUp;
