import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { auth, db } from '../../../FirebaseConfig'
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification} from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

  
 function SignUp() {

  const [error, setError] = useState(null)

  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    if (error) {
      const errorTimeout = setTimeout(() => {
        setError(null)
      }, 3000)

      // Cleanup the timeout to prevent memory leaks
      return () => clearTimeout(errorTimeout)
    }
  }, [error])

  const signUp = async (e) => {
    e.preventDefault()

    if (password !== passwordConfirmation) {
      setError('Passwords do not match.')
      return
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password, username)
      const user = userCredential.user

      // Update the user profile
      await updateProfile(auth.currentUser, { displayName: username })
      // Send email verification
      await sendEmailVerification(user)

      const userDocRef = doc(db, 'users', user.uid)
      await setDoc(userDocRef, {
        uid: user.uid,
        email: user.email,
        displayName: username,
      })

      console.log(userCredential)

      navigate('/')

      localStorage.setItem('token', user.accessToken)
      localStorage.setItem('user', JSON.stringify(user))

      } catch (error) {
      console.error(error)
      setError('Failed to sign up. Please try again.')
      }
    }

  return (  
    <>
      {error && (
        <div className="text-center font-bold bg-orange-500 text-white px-4 py-3 rounded relative fade-in transition-opacity duration-1000 ease-in-out fade-out">
          {error}
        </div>
      )}
      <div className="h-screen md:flex">
        <div className="flex md:w-1/2 justify-center py-10 items-center bg-amber-500">
          <form onSubmit={signUp} className="bg-amber-500">
            <h1 className="text-white font-bold text-2xl mb-1">Emanate</h1>
            <p className="text-sm font-normal text-white mb-7">Create Account</p>
            <div className="flex items-center bg-amber-400 py-2 px-3 rounded-2xl mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none"viewBox="0 0 24 24" stroke="currentColor"></svg>
              <input 
                className="pl-2 bg-amber-400 placeholder-white outline-none border-none" 
                type="text" 
                placeholder="Enter username" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className="flex items-center bg-amber-400 py-2 px-3 rounded-2xl mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none"viewBox="0 0 24 24" stroke="currentColor"></svg>
              <input 
                className="pl-2 bg-amber-400 placeholder-white outline-none border-none" 
                type="email" 
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="flex items-center bg-amber-400 py-2 px-3 rounded-2xl mb-4">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 text-gray-400" 
                fill="none"
                viewBox="0 0 24 24" 
                stroke="currentColor">
              </svg>
              <input 
                className="pl-2 bg-amber-400 placeholder-white outline-none border-none" 
                type="password"
                placeholder="Enter your password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="flex items-center bg-amber-400 py-2 px-3 rounded-2xl">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 text-gray-400" 
                viewBox="0 0 20 20"
                fill="currentColor">
              </svg>
              <input 
                className="pl-2 bg-amber-400 placeholder-white outline-none border-none" 
                type="password" 
                placeholder="Confirm password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                />
            </div>
            <button 
              type="submit" 
              className="block w-full bg-white hover:bg-amber-600 hover:text-white  text-amber-600 mt-4 py-2 rounded-2xl font-bold mb-2">
                Sign up
              </button>
          </form>
        </div>
        <div className="relative overflow-hidden md:flex w-1/2 bg-amber-400 i justify-around items-center">
          <div>
            <h1 
              className="text-white font-bold text-4xl font-sans">
                Welcome back!
              </h1>
            <p 
              className="text-white mt-1">
                If you already have an account, log in here
            </p>
            <Link to='/login'>
            <button 
              type="submit" 
              className="block w-28 bg-white hover:bg-amber-600 hover:text-white text-amber-600 mt-4 py-2 rounded-2xl font-bold mb-2">
                Log in
            </button>
            </Link>
          </div>
        </div>
      </div>
      
    </>
  )
}
export default SignUp