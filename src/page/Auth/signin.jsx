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

    toast.success('Login successful!');
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
    <div className="flex flex-col w-full md:w-1/2 xl:w-2/5 2xl:w-2/5 3xl:w-1/3 mx-auto p-8 md:p-10 2xl:p-12 3xl:p-14 bg-[#fffff] rounded-2xl shadow-xl border-2 mt-5 mb-5">
 
      <div class="flex justify-center gap-3 pb-4">
        <div>
          <img src="/images/thriftstorelogo.png" alt="Logo" width="300" />
        </div>
      </div>
      <div class="flex justify-center text-sm font-light pb-8 "><p class="text-[#D19B5A]">ThriftEase:</p><span>Online Market for
        Sustainable Thrifted Clothing and Shoes</span></div>
   
      <div className="flex flex-col">
        <div className="pb-2">
          <h1 className="text-2xl font-bold mb-6 text-center text-gray-700">Sign in</h1>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label htmlFor="email" className="block mb-1 text-sm font-medium text-[#111827]">Email</label>
              <div class="relative text-gray-400"><span class="absolute flex items-center p-1 pl-3 pt-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg></span>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="pl-12 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-yellow-300 block w-full p-2.5 rounded-l-lg py-3 px-4" placeholder="Email@gmail.com" />
                <div className="h-2">
                {errors.email && <p className=" mt-2 text-red-500 text-xs">{errors.email}</p>}
                </div>
              </div>
            </div>
            <div className="relative text-gray-400">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative mt-1">
                <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-square-asterisk"
                  >
                    <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                    <path d="M12 8v8"></path>
                    <path d="m8.5 14 7-4"></path>
                    <path d="m8.5 10 7 4"></path>
                  </svg>
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••••"
                  className="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-yellow-300 block w-full py-3 px-4"
                  autoComplete="new-password"
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
                <input type="checkbox" id="remember-me" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">Remember me</label>
              </div>
              <a href="#" className="text-sm text-blue-600 hover:underline">Forgot password?</a>
            </div>
            <div>
              <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#D19B5A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-200">
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
            <div className="flex flex-row gap-2 justify-center mt-5">
              <div>
                <a href="#" className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  <img className="h-5 w-40" src="/images/Signin/Facebook.svg" alt="Facebook" />
                </a>
              </div>
              <div>
                <a href="#" className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  <img className="h-5 w-40" src="/images/Signin/Google.svg" alt="Google" />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">Don't have an account? <Link to="/signup" className="font-medium text-blue-600 hover:underline">Sign up</Link></p>
          </div>
        </div>
      </div >
    </div >
  );
};

export default SignIn;
