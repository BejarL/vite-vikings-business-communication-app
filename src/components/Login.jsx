export default function Login() {
  return (
  <>
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      {/* Left: Image */}
      <div className="w-1/2 h-screen hidden lg:block">
        <img src="https://placehold.co/800x/667fff/ffffff.png?text=Your+Image&font=Montserrat" alt="Placeholder Image" className="object-cover w-full h-full" />
      </div>
      {/* Right: Login Form */}
      <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
        <h1 className="text-2xl font-semibold mb-4">Login</h1>
        <form action="#" method="POST">
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-600">Email</label>
            <input type="text" id="username" name="username" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autoComplete="off" />
          </div>
          {/* Password Input */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600">Password</label>
            <input type="password" id="password" name="password" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autoComplete="off" />
          </div>
          {/* Remember Me Checkbox */}
          <div className="mb-4 flex items-center">
            <input type="checkbox" id="remember" name="remember" className="text-blue-500" />
            <label htmlFor="remember" className="text-gray-600 ml-2">Remember Me</label>
          </div>
          {/* Forgot Password Link */}
          <div className="mb-6 text-blue-500">
            <a href="#" className="hover:underline">Forgot Password?</a>
          </div>
          {/* Login Button */}
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full">Login</button>
        </form>
        {/* Sign up Link */}
        <div className="mt-6 text-blue-500 text-center">
          <a href="#" className="hover:underline">Sign up Here</a>
        </div>
      </div>
    </div>
  </>

      <>
  <div className="h-screen md:flex">
	<div
		className="relative overflow-hidden md:flex w-1/2 bg-purple-500 i justify-around items-center hidden">
		<div>
			<h1 className="text-white font-bold text-4xl font-sans">Welcome!</h1>
			<p className="text-white mt-1">If you do not have an account here, sign up</p>
			<button type="submit" className="block w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2">Sign Up</button>
		</div>
	</div>
	<div className="flex md:w-1/2 justify-center py-10 items-center bg-white">
		<form className="bg-white">
			<h1 className="text-gray-800 font-bold text-2xl mb-1">Emanate</h1>
			<p className="text-sm font-normal text-gray-600 mb-7">Login</p>
				<div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
					<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none"
						viewBox="0 0 24 24" stroke="currentColor">
					</svg>
					<input className="pl-2 outline-none border-none" type="text" name="" id="" placeholder="Email" />
      </div>
					
						<div className="flex items-center border-2 py-2 px-3 rounded-2xl">
							<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
								fill="currentColor">
							</svg>
							<input className="pl-2 outline-none border-none" type="text" name="" id="" placeholder="Password" />
      </div>
							<button type="submit" className="block w-full bg-purple-500 mt-4 py-2 rounded-2xl text-white font-semibold mb-2">Log in</button>
							<span className="text-sm ml-2 hover:text-blue-500 cursor-pointer">Forgot Password ?</span>
		</form>
	</div>
</div>
</>
  )
}