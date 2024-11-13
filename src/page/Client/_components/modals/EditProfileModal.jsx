import React, { useState } from 'react';
import ModalWrapper from '../ModalWrapper';

const EditProfileModal = ({ isOpen, onClose, currentUser, onSave }) => {
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

  const [newTag, setNewTag] = useState('');

  const predefinedTags = [
    { name: "Medical Supplies", type: "blue" },
    { name: "Heal", type: "green" },
    { name: "Medicine", type: "blue" },
    { name: "Health", type: "green" },
    { name: "Family Therapy", type: "blue" },
    { name: "Career", type: "green" },
    { name: "Writing tips", type: "blue" }
  ];

  const handleAddTag = (tag) => {
    if (!formData.tags.find(t => t.name === tag.name)) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tag]
      });
    }
  };

  const handleRemoveTag = (tagName) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag.name !== tagName)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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

          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="About Me"
            className="w-full border rounded px-3 py-2 h-24"
          />

          {/* Tags Section */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-700">Your Tags</h3>
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

            <div className="border-t pt-3">
              <h4 className="text-sm text-gray-600 mb-2">Suggested Tags</h4>
              <div className="flex flex-wrap gap-2">
                {predefinedTags.map((tag, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleAddTag(tag)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      tag.type === 'blue'
                        ? 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                        : 'bg-teal-50 text-teal-600 hover:bg-teal-100'
                    }`}
                  >
                    + {tag.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t">
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