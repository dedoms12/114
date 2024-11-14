import { useState, useEffect } from 'react';
import { FiX, FiUpload, FiMapPin, FiPhone, FiMail, FiClock } from 'react-icons/fi';

const EditStoreModal = ({ isOpen, onClose, storeData, onUpdate }) => {
  const [formData, setFormData] = useState(storeData);
  const [previewImage, setPreviewImage] = useState(storeData.photo);
  const [activeTab, setActiveTab] = useState('basic');

  useEffect(() => {
    setFormData(storeData);
  }, [storeData]);

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
        setPreviewImage(reader.result);
        setFormData(prev => ({
          ...prev,
          photo: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  const TabButton = ({ tab, label }) => (
    <button
      type="button"
      onClick={() => setActiveTab(tab)}
      className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors
        ${activeTab === tab 
          ? 'bg-blue-50 text-blue-600' 
          : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
        }`}
    >
      {label}
    </button>
  );

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-xl">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-white sticky top-0 z-10">
          <h2 className="text-xl font-semibold text-gray-800">Store Settings</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <FiX className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Tabs */}
        <div className="px-6 py-3 border-b border-gray-200 bg-white">
          <div className="flex space-x-2">
            <TabButton tab="basic" label="Basic Information" />
            <TabButton tab="hours" label="Business Hours" />
            <TabButton tab="contact" label="Contact Details" />
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-8rem)]">
          <form onSubmit={handleSubmit} className="space-y-6">
            {activeTab === 'basic' && (
              <div className="space-y-6">
                {/* Store Photo */}
                <div className="flex items-center space-x-6">
                  <div className="w-24 h-24 relative rounded-lg overflow-hidden bg-gray-100">
                    {previewImage ? (
                      <img 
                        src={previewImage} 
                        alt="Store" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <FiUpload className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                    <label className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                      <FiUpload className="w-6 h-6 text-white" />
                      <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                    </label>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Store Photo</h4>
                    <p className="text-sm text-gray-500">Recommended: 300x300px or larger</p>
                  </div>
                </div>

                {/* Basic Fields */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Store Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter store name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Store Type
                    </label>
                    <input
                      type="text"
                      value={formData.type}
                      onChange={(e) => setFormData({...formData, type: e.target.value})}
                      className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., Pharmacy Store"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    rows={4}
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Describe your store..."
                  />
                </div>
              </div>
            )}

            {activeTab === 'hours' && (
              <div className="space-y-6">
                <div className="grid gap-4">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Monday - Friday
                    </label>
                    <div className="flex items-center space-x-4">
                      <input
                        type="text"
                        value={formData.businessHours.weekdays}
                        onChange={(e) => handleBusinessHoursChange('weekdays', e.target.value)}
                        className="flex-1 p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., 9:00 AM - 6:00 PM"
                      />
                    </div>
                  </div>

                  <div className="p-4 border border-gray-200 rounded-lg">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Saturday
                    </label>
                    <div className="flex items-center space-x-4">
                      <input
                        type="text"
                        value={formData.businessHours.saturday}
                        onChange={(e) => handleBusinessHoursChange('saturday', e.target.value)}
                        className="flex-1 p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., 9:00 AM - 1:00 PM"
                      />
                    </div>
                  </div>

                  <div className="p-4 border border-gray-200 rounded-lg">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sunday
                    </label>
                    <div className="flex items-center space-x-4">
                      <input
                        type="text"
                        value={formData.businessHours.sunday}
                        onChange={(e) => handleBusinessHoursChange('sunday', e.target.value)}
                        className="flex-1 p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., Closed"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'contact' && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location
                    </label>
                    <div className="relative">
                      <FiMapPin className="absolute left-3 top-3 text-gray-400" />
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                        className="w-full pl-10 p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Response Time
                    </label>
                    <div className="relative">
                      <FiClock className="absolute left-3 top-3 text-gray-400" />
                      <input
                        type="text"
                        value={formData.responseTime}
                        onChange={(e) => setFormData({...formData, responseTime: e.target.value})}
                        className="w-full pl-10 p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
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

export default EditStoreModal; 