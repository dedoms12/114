import { useState, useEffect } from 'react';
import { FiX, FiUser, FiMail, FiPhone, FiBriefcase } from 'react-icons/fi';
import toast from 'react-hot-toast';

const EditProfileModal = ({ isOpen, onClose, profileData, onUpdate }) => {
  const [formData, setFormData] = useState(profileData);

  useEffect(() => {
    setFormData(profileData);
  }, [profileData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
    toast.success('Profile updated successfully!');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-xl">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Edit Profile</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <FiX className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-8rem)]">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              {/* Name */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <FiUser className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full pl-10 p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              {/* Role */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <div className="relative">
                  <FiBriefcase className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                    className="w-full pl-10 p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your role"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <FiMail className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full pl-10 p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <FiPhone className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full pl-10 p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              {/* About */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  About
                </label>
                <textarea
                  name="about"
                  value={formData.about}
                  onChange={(e) => setFormData({...formData, about: e.target.value})}
                  rows={4}
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Tell us about yourself..."
                />
              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal; 