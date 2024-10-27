import React from 'react';
import { Link } from 'react-router-dom';

export default function SignUp() {
  return (
    <div className="flex h-screen">
      {/* Left side - Sign up form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <img className="h-12 w-auto mb-6" src="/images/PillLogo.svg" alt="PillPoint Logo" />
          <h2 className="text-3xl font-extrabold text-pill-purple mb-6">Create your account</h2>
          <p className="text-sm text-gray-600 mb-8">
            Or{' '}
            <Link to="/" className="font-medium text-indigo-600 hover:text-indigo-500">
              sign in to your existing account
            </Link>
          </p>

          <div className="mb-6">
            <p className="text-sm font-medium text-gray-700 mb-4">Sign up with</p>
            <div className="grid grid-cols-3 gap-3">
              <a href="#" className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <span className="sr-only">Sign up with Facebook</span>
                <img className="h-5 w-5" src="/images/SignUp/Facebook.svg" alt="Facebook" />
              </a>
              <a href="#" className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <span className="sr-only">Sign up with Google</span>
                <img className="h-5 w-5" src="/images/SignUp/Google.svg" alt="Google" />
              </a>
              <a href="#" className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <span className="sr-only">Sign up with Apple</span>
                <img className="h-5 w-5" src="/images/SignUp/Apple.svg" alt="Apple" />
              </a>
            </div>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <form action="#" method="POST" className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pill-blue hover:bg-pill-teal focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pill-blue"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
      
      {/* Right side - Background image */}
      <div className="hidden md:block w-1/2 bg-img-signup">
        <div className="flex h-full items-center justify-center text-center">
          <div>
            <h1 className="text-4xl font-bold mb-2 text-white text-shadow-lg shadow-black">Join PillPoint!</h1>
            <p className="text-xl text-white text-shadow shadow-black">Your Health, Your Way</p>
          </div>
        </div>
      </div>
    </div>
  );
}
