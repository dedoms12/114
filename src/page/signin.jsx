import React from 'react';
import { Link } from 'react-router-dom';

const SignIn = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left side - Background image */}
      <div className="bg-img-signin w-full md:w-1/2 flex items-center justify-center bg-blue-100 p-8 md:p-0" style={{ aspectRatio: '16/9' }}>
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-bold mb-2 text-pill-gray text-shadow-lg shadow-pill-purple">Welcome to PillPoint!</h1>
          <p className="text-xl text-pill-gray text-shadow shadow-pill-purple">Shop for Your Comfort and Convenience</p>
        </div>
      </div>
      
      {/* Right side - Sign in form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-md">
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
              <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pill-blue hover:bg-pill-teal focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pill-blue">
                Sign In
              </button>
            </div>
          </form>
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3">
              <div>
                <a href="#" className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  <img className="h-5 w-5" src="/images/Signin/Facebook.svg" alt="Facebook" />
                </a>
              </div>
              <div>
                <a href="#" className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  <img className="h-5 w-5" src="/images/Signin/Google.svg" alt="Google" />
                </a>
              </div>
              <div>
                <a href="#" className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  <img className="h-5 w-5" src="/images/Signin/Apple.svg" alt="Apple" />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">Don't have an account? <Link to="/signup" className="font-medium text-blue-600 hover:underline">Sign up</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
