export default function Login() {
  return (
      <>
  <div className="h-screen md:flex">
	<div
		className="relative overflow-hidden md:flex w-1/2 bg-purple-500 i justify-around items-center hidden">
		<div>
			<h1 className="text-white font-bold text-4xl font-sans">Welcome!</h1>
			<p className="text-white mt-1">If you don't have an account here, sign up</p>
			<button type="submit" className="block w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2">Sign Up</button>
		</div>
		<div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
		<div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
		<div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
		<div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
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