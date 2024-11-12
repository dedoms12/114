import { Dialog } from '@headlessui/react';
import { FiX, FiUpload, FiTrash2 } from 'react-icons/fi';
import { useState } from 'react';

const EditStoreModal = ({ isOpen, onClose, storeData }) => {
  const [formData, setFormData] = useState({
    photo: storeData.photo || null,
    name: storeData.name || '',
    email: storeData.email || '',
    location: storeData.location || '',
    overview: storeData.description || ''
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, photo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle store update logic
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-3xl bg-white rounded-lg shadow-xl">
          <div className="flex justify-between items-center p-6 border-b">
            <Dialog.Title className="text-2xl font-semibold text-gray-800">Edit Shop Profile</Dialog.Title>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <FiX className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Shop Photo */}
            <div>
              <h3 className="text-lg font-medium mb-4">Shop photo</h3>
              <div className="flex items-center gap-6">
                <div className="w-32 h-32 bg-gray-100 rounded-lg overflow-hidden">
                  {formData.photo ? (
                    <img src={formData.photo} alt="Shop" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-50">
                      <FiUpload className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <p className="text-gray-600">Upload your photo/logo</p>
                  <p className="text-sm text-gray-500">Your photo should be in PNG or JPG format</p>
                  <div className="flex gap-3">
                    <input
                      type="file"
                      id="shop-photo"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                    <label
                      htmlFor="shop-photo"
                      className="px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer"
                    >
                      Choose image
                    </label>
                    {formData.photo && (
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, photo: null }))}
                        className="px-4 py-2 text-gray-700 hover:text-gray-900"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Store Details */}
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Store Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full p-3 bg-gray-50 rounded-md border"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full p-3 bg-gray-50 rounded-md border"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full p-3 bg-gray-50 rounded-md border"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Overview</label>
                <textarea
                  value={formData.overview}
                  onChange={(e) => setFormData(prev => ({ ...prev, overview: e.target.value }))}
                  className="w-full p-3 bg-gray-50 rounded-md border"
                  rows={4}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 text-gray-700 border rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Save profile
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default EditStoreModal; 