import { useState, useEffect } from 'react';
import { FiX, FiUpload, FiMapPin, FiPhone, FiMail, FiClock } from 'react-icons/fi';

const EditStoreModal = ({ isOpen, onClose, storeData, onUpdate, initialTab = 'basic' }) => {
  const [formData, setFormData] = useState({
    ...storeData,
    businessHours: storeData?.businessHours || {
      weekdays: '',
      saturday: '',
      sunday: ''
    }
  });
  const [previewImage, setPreviewImage] = useState(storeData?.photo || null);
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    if (isOpen && storeData) {
      setFormData({
        ...storeData,
        businessHours: storeData.businessHours || {
          weekdays: '',
          saturday: '',
          sunday: ''
        }
      });
      setPreviewImage(storeData.photo || null);
      setActiveTab(initialTab);
    }
  }, [isOpen, storeData, initialTab]);

  const handleBusinessHoursChange = (day, value) => {
    setFormData(prev => ({
      ...prev,
      businessHours: {
        ...prev.businessHours,
        [day]: value
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageDataUrl = reader.result;
        setPreviewImage(imageDataUrl);
        setFormData(prev => ({
          ...prev,
          photo: imageDataUrl
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-xl">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Store Settings</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <FiX size={24} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 py-3 border-b border-gray-200 flex space-x-4">
          <button
            onClick={() => setActiveTab('basic')}
            className={`px-4 py-2 text-sm font-medium rounded-lg ${
              activeTab === 'basic' ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Basic Info
          </button>
          <button
            onClick={() => setActiveTab('hours')}
            className={`px-4 py-2 text-sm font-medium rounded-lg ${
              activeTab === 'hours' ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Business Hours
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={`px-4 py-2 text-sm font-medium rounded-lg ${
              activeTab === 'contact' ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Contact Info
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-12rem)]">
          <form onSubmit={handleSubmit} className="space-y-6">
            {activeTab === 'basic' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Store Photo</label>
                  <div className="flex items-center space-x-4">
                    <div className="w-24 h-24 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                      {previewImage ? (
                        <img src={previewImage} alt="Store" className="w-full h-full object-cover" />
                      ) : (
                        <FiUpload className="w-6 h-6 text-gray-400" />
                      )}
                    </div>
                    <div>
                      <input
                        type="file"
                        onChange={handleImageUpload}
                        accept="image/*"
                        className="hidden"
                        id="store-photo"
                      />
                      <label
                        htmlFor="store-photo"
                        className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                      >
                        <FiUpload className="mr-2 -ml-1 h-5 w-5 text-gray-400" />
                        Upload Photo
                      </label>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Store Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2.5 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Store Type</label>
                  <input
                    type="text"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full p-2.5 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
            )}

            {/* Business Hours Tab */}
            {activeTab === 'hours' && (
              <div className="space-y-4">
                {/* Weekdays */}
                <div className="p-4 border border-gray-200 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Monday - Friday
                  </label>
                  <input
                    type="text"
                    value={formData.businessHours.weekdays}
                    onChange={(e) => handleBusinessHoursChange('weekdays', e.target.value)}
                    className="w-full p-2.5 border border-gray-300 rounded-lg"
                    placeholder="e.g., 9:00 AM - 6:00 PM"
                  />
                </div>

                {/* Saturday */}
                <div className="p-4 border border-gray-200 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Saturday
                  </label>
                  <input
                    type="text"
                    value={formData.businessHours.saturday}
                    onChange={(e) => handleBusinessHoursChange('saturday', e.target.value)}
                    className="w-full p-2.5 border border-gray-300 rounded-lg"
                    placeholder="e.g., 9:00 AM - 1:00 PM"
                  />
                </div>

                {/* Sunday */}
                <div className="p-4 border border-gray-200 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sunday
                  </label>
                  <input
                    type="text"
                    value={formData.businessHours.sunday}
                    onChange={(e) => handleBusinessHoursChange('sunday', e.target.value)}
                    className="w-full p-2.5 border border-gray-300 rounded-lg"
                    placeholder="e.g., Closed"
                  />
                </div>
              </div>
            )}

            {/* Contact Info Tab */}
            {activeTab === 'contact' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <div className="relative">
                    <FiMapPin className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full pl-10 p-2.5 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <div className="relative">
                    <FiPhone className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-10 p-2.5 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <div className="relative">
                    <FiMail className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-10 p-2.5 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditStoreModal; 