import React, { useState } from 'react';
import ModalWrapper from '../ModalWrapper';

const EditProfileModal = ({ isOpen, onClose, currentUser, onSave }) => {
  const [activeTab, setActiveTab] = useState('basic');
  const [formData, setFormData] = useState({
    firstName: currentUser?.firstName || '',
    lastName: currentUser?.lastName || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    address: currentUser?.address || '',
    gender: currentUser?.gender || '',
    status: currentUser?.status || '',
    education: currentUser?.education || '',
    location: currentUser?.location || '',
    bio: currentUser?.bio || '',
    tags: currentUser?.tags || []
  });

  const [newTag, setNewTag] = useState({ name: '', type: 'blue' });

  const tagSuggestions = [
    { name: "Medical Supplies", type: "blue" },
    { name: "Health", type: "green" },
    { name: "Medicine", type: "blue" },
    { name: "Family Therapy", type: "green" },
    { name: "Career", type: "blue" },
    { name: "Writing tips", type: "green" }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRemoveTag = (tagName) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag.name !== tagName)
    });
  };

  const handleAddTag = () => {
    if (newTag.name.trim() && !formData.tags.find(t => t.name === newTag.name)) {
      setFormData({
        ...formData,
        tags: [...formData.tags, { ...newTag }]
      });
      setNewTag({ name: '', type: 'blue' });
    }
  };

  const handleAddSuggestion = (suggestion) => {
    if (!formData.tags.find(t => t.name === suggestion.name)) {
      setFormData({
        ...formData,
        tags: [...formData.tags, { ...suggestion }]
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const tabs = [
    { id: 'basic', label: 'Basic Info' },
    { id: 'contact', label: 'Contact' },
    { id: 'personal', label: 'Personal' },
    { id: 'tags', label: 'Tags' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'basic':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                className="w-full border rounded px-3 py-2"
              />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full border rounded px-3 py-2"
            />
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell us about yourself..."
              className="w-full border rounded px-3 py-2 h-24"
            />
          </div>
        );

      case 'contact':
        return (
          <div className="space-y-4">
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full border rounded px-3 py-2"
            />
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
              className="w-full border rounded px-3 py-2 h-20"
            />
          </div>
        );

      case 'personal':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <input
                type="text"
                name="status"
                value={formData.status}
                onChange={handleChange}
                placeholder="Status"
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <input
              type="text"
              name="education"
              value={formData.education}
              onChange={handleChange}
              placeholder="Educational Attainment"
              className="w-full border rounded px-3 py-2"
            />
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Location"
              className="w-full border rounded px-3 py-2"
            />
          </div>
        );

      case 'tags':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-700">Add New Tag</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTag.name}
                  onChange={(e) => setNewTag({ ...newTag, name: e.target.value })}
                  placeholder="Enter tag name"
                  className="flex-1 border rounded px-3 py-2"
                />
                <select
                  value={newTag.type}
                  onChange={(e) => setNewTag({ ...newTag, type: e.target.value })}
                  className="border rounded px-3 py-2"
                >
                  <option value="blue">Blue</option>
                  <option value="green">Green</option>
                </select>
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="px-4 py-2 bg-[#4C9BF5] text-white rounded-md hover:bg-blue-600"
                >
                  Add
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700">Current Tags</h3>
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className={`px-3 py-1 rounded-full text-sm flex items-center gap-2 ${
                      tag.type === 'blue' ? 'bg-blue-100 text-blue-600' : 'bg-teal-100 text-teal-600'
                    }`}
                  >
                    {tag.name}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag.name)}
                      className="text-xs hover:text-red-500"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700">Suggested Tags</h3>
              <div className="flex flex-wrap gap-2">
                {tagSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleAddSuggestion(suggestion)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      formData.tags.find(t => t.name === suggestion.name)
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : suggestion.type === 'blue'
                        ? 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                        : 'bg-teal-50 text-teal-600 hover:bg-teal-100'
                    }`}
                    disabled={formData.tags.find(t => t.name === suggestion.name)}
                  >
                    + {suggestion.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
        <div className="flex space-x-2 mb-6">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm rounded-lg ${
                activeTab === tab.id
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        
        <form onSubmit={handleSubmit}>
          {renderTabContent()}
          
          <div className="flex justify-end space-x-3 pt-6 mt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#4C9BF5] text-white rounded-md hover:bg-blue-600"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </ModalWrapper>
  );
};

export default EditProfileModal; 