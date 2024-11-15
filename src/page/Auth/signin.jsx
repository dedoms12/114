import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { findUserByEmail } from './userData';
import toast from 'react-hot-toast';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const user = findUserByEmail(formData.email);
    
    if (!user || user.password !== formData.password) {
      toast.error('Invalid email or password');
      return;
    }

    // Store user data in localStorage
    localStorage.setItem('currentUser', JSON.stringify({
      name: user.name,
      email: user.email,
      role: user.role
    }));

    // Navigate based on user role
    switch (user.role) {
      case 'buyer':
        navigate('/home');
        break;
      case 'seller':
        navigate('/seller/dashboard');
        break;
      case 'admin':
        navigate('/admin/dashboard');
        break;
      default:
        navigate('/home');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

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
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="name@example.com"/>
              {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
            </div>
            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative mt-1">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 pr-10 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FiEyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <FiEye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
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
