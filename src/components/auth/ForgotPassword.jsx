import { Link } from "react-router-dom";
import { useState } from "react";
import { auth } from "../../../FirebaseConfig";
import { sendPasswordResetEmail } from "firebase/auth";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const resetEmail = async () => {
    await sendPasswordResetEmail(auth, email);
    console.log("Password reset email sent");
  };
  return (
    <>
      <div className="h-screen md:flex">
        <h1 className="text-white font-bold text-3xl absolute left-1/2 transform -translate-x-1/2">
          Emanate
        </h1>
        <div
          className="flex md:w-full justify-center py-10 items-center"
          style={{
            backgroundImage: 'url("/src/images/chatting.png")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <form className="bg-amber-700 md:w-100 p-8 shadow-lg backdrop-blur-md bg-opacity-50 rounded-lg">
            <h2 className="text-white font-bold text-2xl mb-1">
              Forgot your password?
            </h2>
            <p className="text-sm font-normal text-white mb-7">
              Please enter the email address you would like your password reset
              information sent to
            </p>
            <label htmlFor="email" className="text-white pl-2"> Email</label>
            <div className="flex items-center bg-amber-500 py-2 px-3 rounded-2xl mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              ></svg>
              <input
                className="pl-2 bg-amber-500 placeholder-white outline-none border-none"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button
              onClick={resetEmail}
              type="submit"
              className="block w-full bg-white hover:bg-amber-700 hover:text-white  text-amber-600 mt-4 py-2 rounded-2xl font-bold mb-2"
            >
              Request reset link
            </button>
            <Link to="/">
              <button
                type="submit"
                className="block w-full hover:bg-white bg-amber-700 text-white hover:text-amber-600 mt-4 py-2 rounded-2xl font-bold mb-2"
              >
                Back to log in
              </button>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
