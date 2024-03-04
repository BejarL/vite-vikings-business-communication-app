import { Link } from "react-router-dom";
import { useState } from "react";
import { auth } from "../../../FirebaseConfig";
import { sendPasswordResetEmail } from "firebase/auth";
import Footer from "../Footer";

// Define the ForgotPassword component
function ForgotPassword() {
  const [email, setEmail] = useState("");

  // Asynchronous function to handle sending the password reset email
  const resetEmail = async () => {
    await sendPasswordResetEmail(auth, email);
    console.log("Password reset email sent");
  };

  return (
    <>
      <div className="h-screen md:flex">
        <div className="absolute left-1/2 transform -translate-x-1/2 mt-4">
          <h1 className="text-teal-100 font-bold text-3xl flex items-center">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/emanate-demo.appspot.com/o/bg-images%2Fblue-logo.png?alt=media&token=c0b3ae42-ebfc-43d3-bc49-e614b221c4c5"
              className="h-10 w-10 mr-2"
            />
            Emanate
          </h1>
        </div>
        <div
          className="flex md:w-full justify-center py-10 items-center"
          style={{
            backgroundImage: `url(https://firebasestorage.googleapis.com/v0/b/emanate-demo.appspot.com/o/bg-images%2F1.png?alt=media&token=6d769590-a1c1-491e-bf00-da8bbafb66b6)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <form className="bg-slate-900 md:w-100 p-8 shadow-lg backdrop-blur-md bg-opacity-50 rounded-lg">
            <h2 className="text-white font-bold text-2xl mb-1">
              Forgot your password?
            </h2>
            <p className="text-sm font-normal text-white mb-7">
              Please enter the email address you would like your password reset
              information sent to
            </p>
            <label htmlFor="email" className="text-white pl-2">
              {" "}
              Email
            </label>
            <div className="flex items-center bg-teal-100 py-2 px-3 rounded-2xl mb-4">
              <input
                className="pl-2 bg-teal-100 placeholder-black outline-none border-none"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button
              onClick={resetEmail}
              type="submit"
              className="block w-full bg-white hover:bg-slate-900 hover:text-white text-teal-600 mt-4 py-2 rounded-2xl font-bold mb-2"
            >
              Request reset link
            </button>
            <Link to="/">
              <button
                type="submit"
                className="block w-full hover:bg-white bg-slate-900 text-white hover:text-teal-600 mt-4 py-2 rounded-2xl font-bold mb-2"
              >
                Back to log in
              </button>
            </Link>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ForgotPassword;
