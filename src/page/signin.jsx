const SignIn = () => {
  return (
    <div className="flex h-screen">
      {/* Left side - Background image */}
      <div className="bg-img w-1/2 flex items-center bg-blue-100">
        <div className="text-center px-10">
          <h1 className="text-4xl font-bold mb-2 text-white text-shadow-lg shadow-black text-left">Welcome to <br/> PillPoint!</h1>
          <p className="text-xl text-white text-shadow shadow-black text-left">Shop for Your Comfort and <br/> Convenience</p>
        </div>
      </div>
      
      {/* Right side - Sign in form */}
      <div className="w-1/2 flex items-center justify-center">
        <div className="w-96 p-8">
          <h1 className="text-2xl font-bold mb-6 text-center text-gray-700">Sign in</h1>
          <form className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" id="email" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input type="password" id="password" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input type="checkbox" id="remember-me" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"/>
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">Remember me</label>
              </div>
              <a href="#" className="text-sm text-blue-600 hover:underline">Forgot password?</a>
            </div>
            <div>
              <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Login
              </button>
            </div>
          </form>
          <div className="mt-6">
            <div className="text-left text-xs text-gray-700">Dont have an account?</div>
            <button className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Create an Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
