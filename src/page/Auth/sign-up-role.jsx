import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaUserShield } from 'react-icons/fa';
import { MdLocalPharmacy } from 'react-icons/md';
import { addUser } from './userData';
import toast from 'react-hot-toast';

const SignUpRole = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('');
  const [pharmacyName, setPharmacyName] = useState('');
  const [adminKey, setAdminKey] = useState('');
  const [adminKeyError, setAdminKeyError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      const signupData = JSON.parse(localStorage.getItem('signupData') || '{}');

      const userData = {
        ...signupData,
        role: selectedRole,
        ...(selectedRole === 'seller' && { pharmacyName }),
        ...(selectedRole === 'admin' && { adminKey }),
        createdAt: new Date().toISOString()
      };

      // Add user to the database
      addUser(userData);

      // Clear signup data and show success message
      localStorage.removeItem('signupData');
      toast.success('Account created successfully!');

      // Navigate based on role
      switch (selectedRole) {
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
    } catch (error) {
      if (error.message === 'Invalid admin key') {
        setAdminKeyError('Invalid admin key');
        toast.error('Invalid admin key');
      } else {
        toast.error(error.message || 'Failed to create account');
      }
    }
  };

  return (
    <div className=" flex flex-col w-full md:w-1/2 xl:w-2/5 2xl:w-2/5 3xl:w-1/3 mx-auto p-8 md:p-10 2xl:p-12 3xl:p-14 bg-[#fffff] rounded-2xl shadow-xl mt-10">
      <div className="flex flex-col">
        <div className="flex flex-col">
          <img className="mb-6 mx-auto" src="/images/thriftstorelogo.png" alt="Logo" width="200" height="auto" />
          <h2 className="text-3xl font-extrabold text-pill-purple mb-4">Role Preference</h2>
          <p className="text-sm text-gray-600 mb-8">Select your role:</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <button
                type="button"
                onClick={() => setSelectedRole('buyer')}
                className={`w-full flex items-center justify-between px-4 py-3 border ${selectedRole === 'buyer'
                    ? 'border-yellow-300 bg-yellow-30'
                    : 'border-gray-300'
                  } rounded-md shadow-sm hover:border-yellow-300 focus:outline-none transition-colors`}
              >
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-700">Buyer</span>
                </div>
                <div className={`h-4 w-4 rounded-full border ${selectedRole === 'buyer'
                    ? 'border-yellow-500 bg-yellow-500'
                    : 'border-gray-300'
                  }`}>
                  {selectedRole === 'buyer' && (
                    <div className="h-2 w-2 m-1 rounded-full bg-white" />
                  )}
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedRole('seller')}
                className={`w-full flex items-center justify-between px-4 py-3 border ${
                  selectedRole === 'seller'
                    ? 'border-yellow-300 bg-yellow-30'
                    : 'border-gray-300'
                } rounded-md shadow-sm hover:border-yellow-300 focus:outline-none transition-colors`}
              >
                  <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-700"> Seller</span>
                </div>
                <div className={`h-4 w-4 rounded-full border ${
                  selectedRole === 'seller'
                    ? 'border-yellow-500 bg-yellow-500'
                    : 'border-gray-300'
                }`}>
                  {selectedRole === 'seller' && (
                    <div className="h-2 w-2 m-1 rounded-full bg-white" />
                  )}
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedRole('admin')}
                className={`w-full flex items-center justify-between px-4 py-3 border ${
                  selectedRole === 'admin' 
                    ? 'border-yellow-300 bg-yellow-30' 
                    : 'border-gray-300'
                } rounded-md shadow-sm hover:border-yellow-300 focus:outline-none transition-colors`}
              >
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-700">Admin</span>
                </div>
                <div className={`h-4 w-4 rounded-full border ${
                  selectedRole === 'admin'
                    ? 'border-yellow-500 bg-yellow-500'
                    : 'border-gray-300'
                }`}>
                  {selectedRole === 'admin' && (
                    <div className="h-2 w-2 m-1 rounded-full bg-white" />
                  )}
                </div>
              </button>
            </div>

            {selectedRole === 'seller' && (
              <div className="mt-4">
                <label htmlFor="pharmacy" className="block text-sm font-medium text-gray-700">
                  Storename
                </label>
                <input
                  id="pharmacy"
                  type="text"
                  value={pharmacyName}
                  onChange={(e) => setPharmacyName(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-yellow-30 focus:border-yellow-300 sm:text-sm"
                  placeholder="Enter your store name"
                  required
                />
              </div>
            )}

            {selectedRole === 'admin' && (
              <div className="mt-4">
                <label htmlFor="adminKey" className="block text-sm font-medium text-gray-700">
                  Admin Key
                </label>
                <div className="relative mt-1">
                  <input
                    id="adminKey"
                    type="text"
                    value={adminKey}
                    onChange={(e) => {
                      setAdminKey(e.target.value);
                      setAdminKeyError('');
                    }}
                    className={`mt-1 block w-full px-3 py-2 border ${adminKeyError ? 'border-red-500' : 'border-gray-300'
                      } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-yellow-30 focus:border-yellow-300 sm:text-sm`}
                    placeholder="Enter admin key"
                    maxLength={6}
                    required
                  />
                  {adminKeyError && (
                    <p className="text-red-500 text-xs mt-1">{adminKeyError}</p>
                  )}
                </div>
              </div>
            )}

            <div className="pt-4">
              <button
                type="submit"
                disabled={
                  !selectedRole ||
                  (selectedRole === 'seller' && !pharmacyName) ||
                  (selectedRole === 'admin' && (!adminKey || adminKey.length !== 6))
                }
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#D19B5A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pill-blue disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create an Account
              </button>
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="text-sm text-gray-600"
              >
                Back
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpRole;
