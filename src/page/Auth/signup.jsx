import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { findUserByEmail, addUser } from './userData';
import toast from 'react-hot-toast';
import { FiEye, FiEyeOff } from 'react-icons/fi';

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    pharmacyName: '',
    adminKey: '',
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.role) {
      newErrors.role = 'Role selection is required';
    }
    if (formData.role === 'seller' && !formData.pharmacyName.trim()) {
      newErrors.pharmacyName = 'Store name is required for sellers';
    }
    if (formData.role === 'admin' && (!formData.adminKey || formData.adminKey.length !== 6)) {
      newErrors.adminKey = 'Admin key must be exactly 6 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (findUserByEmail(formData.email)) {
      toast.error('Email already exists');
      return;
    }

    const userData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role,
      ...(formData.role === 'seller' && { pharmacyName: formData.pharmacyName }),
      ...(formData.role === 'admin' && { adminKey: formData.adminKey }),
      createdAt: new Date().toISOString(),
    };

    // Add user to the database
    addUser(userData);
    toast.success('Account created successfully!');

    // Navigate based on role
    switch (formData.role) {
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
      [e.target.name]: e.target.value,
    });
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: '',
      });
    }
  };

  return (
    <div className="flex flex-col w-full md:w-1/2 xl:w-2/5 2xl:w-2/5 3xl:w-1/3 mx-auto p-8 md:p-10 2xl:p-12 3xl:p-14 bg-[#fffff] rounded-2xl shadow-xl border-2 mt-5 mb-5">
      <div className="flex justify-center">
        <img src="/images/thriftstorelogo.png" alt="Logo" width="200" />
      </div>
      <div class="flex justify-center text-sm font-light pb-8 "><p class="text-[#D19B5A]">ThriftEase:</p><span>Online Market for
        Sustainable Thrifted Clothing and Shoes</span></div>
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-yellow-300 focus:border-yellow-300 sm:text-sm"
            placeholder='Fullname'
            required
          />
          {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete='email'
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-yellow-300 focus:border-yellow-300 sm:text-sm"
            placeholder='Email@gmail.com'
            required
          />
          {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-yellow-300 focus:border-yellow-300 sm:text-sm"
              placeholder='••••••••••'
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 px-3"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
        </div>
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-yellow-300 focus:border-yellow-300 sm:text-sm"
              placeholder='••••••••••'
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 px-3"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
          {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword}</p>}
        </div>
        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">
            Role
          </label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-yellow-300 focus:border-yellow-300 sm:text-sm"
            required
          >
            <option value="" disabled>
              Select a role
            </option>
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
           {/* <option value="admin">Admin</option> */}
          </select>
          {errors.role && <p className="text-red-500 text-xs">{errors.role}</p>}
        </div>
        {formData.role === 'seller' && (
          <div>
            <label htmlFor="storeName" className="block text-sm font-medium text-gray-700">
              Store Name
            </label>
            <input
              id="storeName"
              name="pharmacyName"
              type="text"
              value={formData.pharmacyName}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-yellow-300 focus:border-yellow-300 sm:text-sm "
              required
            />
            {errors.pharmacyName && <p className="text-red-500 text-xs">{errors.pharmacyName}</p>}
          </div>
        )}
        {formData.role === 'admin' && (
          <div>
            <label htmlFor="adminKey" className="block text-sm font-medium text-gray-700">
              Admin Key
            </label>
            <input
              id="adminKey"
              name="adminKey"
              type="text"
              value={formData.adminKey}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-yellow-300 focus:border-yellow-300 sm:text-sm"
              required
            />
            {errors.adminKey && <p className="text-red-500 text-xs">{errors.adminKey}</p>}
          </div>
        )}
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#D19B5A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-300"
        >
          Sign Up
        </button>
      </form>
      <div className="mt-6">
        <p className="text-sm text-gray-600 mb-8">
          Or{' '}
          <Link to="/signin" className="font-medium text-indigo-600 hover:text-indigo-500">
            sign in to your existing account
          </Link>
        </p>
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
    </div>
  );
}
