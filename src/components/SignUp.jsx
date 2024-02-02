
 function SignUp() {
  return (
    <>
  <div className="bg-gray-100 flex justify-center items-center h-screen">
    {/* Left: Image */}
    <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
      <h1 className="text-2xl font-semibold mb-4">Sign Up</h1>
      <form action="#" method="POST">
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-600">Username</label>
          <input type="text" id="username" name="username" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autoComplete="off" />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-600">Email</label>
          <input type="email" id="email" name="email" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autoComplete="off" />
        </div>
        {/* Password Input */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-600">Password</label>
          <input type="password" id="password" name="password" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autoComplete="off" />
        </div>
        <div className="mb-4">
          <label htmlFor="confirm-password" className="block text-gray-600">Confirm Password</label>
          <input type="confirm-password" id="confirm-password" name="confirm-password" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autoComplete="off" />
        </div>
        {/* Remember Me Checkbox */}
        <div className="mb-4 flex items-center">
          <input type="checkbox" id="remember" name="remember" className="text-blue-500" />
          <label htmlFor="remember" className="text-gray-600 ml-2">Remember Me</label>
        </div>
        {/* Sign Up Button */}
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full">Sign Up</button>
      </form>
    </div>
    {/* Right: Login Form */}
    <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
      <h1 className="text-2xl font-semibold mb-4">Welcome Back!</h1>
      <h2 className="text-1xl mb-4">If you already have an account, log in here!</h2>
      <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full">Log in</button>
    </div>
  </div>
  
</>
  )
}
export default SignUp