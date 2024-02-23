import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth } from "../../../FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Login() {
  // State variables to manage user input and error messages
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Use useEffect to clear error messages after a timeout
  useEffect(() => {
    if (error) {
      const errorTimeout = setTimeout(() => {
        setError(null);
      }, 3000);
      return () => clearTimeout(errorTimeout);
    }
  }, [error]);

  // Function to handle the login process
  const logIn = async (e) => {
    e.preventDefault();

    // Sign in user with email and password
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      console.log(userCredential);

      // Store user information in session storage
      sessionStorage.setItem("token", user.accessToken);
      sessionStorage.setItem("user", JSON.stringify(user));

      // Redirect to the home page
      navigate("/");
    } catch (error) {
      console.error(error);
      setError("Failed to log in. Please check your email and password.");
    }
  };
  return (
    <>
      {/* Display error message if there is any */}
      {error && (
        <div className="text-center font-bold bg-orange-500 text-white px-4 py-3 rounded relative transition-opacity duration-1000 ease-in-out">
          {error}
        </div>
      )}
      {/* Main layout for the login page */}
      <div
        className="h-screen md:flex"
        style={{
          backgroundImage: 'url("/src/images/chatting.png")',
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <h1 className="text-white font-bold text-3xl absolute left-1/2 transform -translate-x-1/2">
          Emanate
        </h1>
        <div className="flex md:w-1/2 justify-center py-10 items-center">
          {/* Login form */}
          <form
            onSubmit={logIn}
            className="bg-amber-800 md:w-96 p-8 shadow-lg backdrop-blur-md bg-opacity-50 rounded-lg"
          >
            {/* Form header */}
            <p className="text-lg font-bold text-white mb-7">
              Log In to your Account
            </p>
            {/* Input fields for email and password */}
            <label htmlFor="email" className="text-white pl-2">
              {" "}
              Email
            </label>
            <div className="flex bg-amber-400 items-center py-2 px-3 rounded-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              ></svg>
              <input
                className="pl-2 bg-amber-400 placeholder-white outline-none border-none"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <label htmlFor="password" className="text-white pl-2">
              {" "}
              Password
            </label>

            <div className="flex bg-amber-400 items-center py-2 px-3 rounded-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              ></svg>
              <input
                className="pl-2 outline-none placeholder-white bg-amber-400 border-none"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="block w-full bg-white hover:bg-amber-600 mt-4 py-2 rounded-2xl hover:text-white text-amber-600 font-bold mb-2"
            >
              Log in
            </button>
            {/* Link to the forgot password page */}
            <Link to="/forgotpassword">
              <span className="text-sm ml-2 hover:text-blue-800 cursor-pointer">
                Forgot Password?
              </span>
            </Link>
          </form>
        </div>
        {/* Section for new users */}
        <div className="relative overflow-hidden md:flex w-1/2  i justify-around items-center">
          <div>
            <h1 className="text-white font-bold text-4xl font-sans">
              Welcome!
            </h1>
            <p className="text-white mt-1">
              If you do not have an account, sign up here
            </p>
            {/* Link to the signup page */}
            <Link to="/signup">
              <button
                type="button"
                className="block w-28 bg-white hover:bg-amber-600 hover:text-white text-amber-600 mt-4 py-2 rounded-2xl font-bold mb-2"
              >
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
