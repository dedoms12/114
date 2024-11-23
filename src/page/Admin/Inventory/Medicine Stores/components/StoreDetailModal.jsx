import { FiX, FiUpload, FiMapPin, FiPhone, FiMail, FiGlobe, FiClock } from 'react-icons/fi';
import { useRef } from 'react';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

const StoreDetailModal = ({ 
  isOpen, 
  onClose, 
  store, 
  isEditing, 
  setIsEditing, 
  onSave, 
  setStoreDetails 
}) => {
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setStoreDetails(prev => ({
          ...prev,
          image: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-0 max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="border-b px-6 py-4 flex justify-between items-center bg-gray-50">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">
              {isEditing ? 'Edit Store Details' : 'Store Information'}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              {isEditing ? 'Make changes to store information below' : 'View complete store details'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {!isEditing ? (
              <>
                <button
                  data-tooltip-id="edit-store-details"
                  data-tooltip-content="Edit store information"
                  onClick={() => setIsEditing(true)}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg"
                >
                  Edit
                </button>
                <button 
                  data-tooltip-id="close-modal"
                  data-tooltip-content="Close details view"
                  onClick={onClose}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border"
                >
                  Close
                </button>
              </>
            ) : (
              <>
                <button
                  data-tooltip-id="save-changes"
                  data-tooltip-content="Save store changes"
                  onClick={onSave}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg"
                >
                  Save Changes
                </button>
                <button 
                  data-tooltip-id="cancel-edit"
                  data-tooltip-content="Cancel editing"
                  onClick={() => {
                    setIsEditing(false);
                    setStoreDetails(store);
                  }}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border"
                >
                  Cancel
                </button>
              </>
            )}

            <Tooltip id="edit-store-details" place="top" />
            <Tooltip id="close-modal" place="top" />
            <Tooltip id="save-changes" place="top" />
            <Tooltip id="cancel-edit" place="top" />
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <form className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Store Name
                </label>
                <input
                  type="text"
                  value={store.name}
                  onChange={(e) => setStoreDetails(prev => ({
                    ...prev,
                    name: e.target.value
                  }))}
                  disabled={!isEditing}
                  className={`w-full rounded-lg border ${
                    isEditing 
                      ? 'border-gray-300 focus:ring-2 focus:ring-blue-500' 
                      : 'border-transparent bg-gray-50'
                  } px-4 py-2.5`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  License Number
                </label>
                <input
                  type="text"
                  value={store.licenseNumber}
                  onChange={(e) => setStoreDetails(prev => ({
                    ...prev,
                    licenseNumber: e.target.value
                  }))}
                  disabled={!isEditing}
                  className={`w-full rounded-lg border ${
                    isEditing 
                      ? 'border-gray-300 focus:ring-2 focus:ring-blue-500' 
                      : 'border-transparent bg-gray-50'
                  } px-4 py-2.5`}
                />
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <FiMapPin className="w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={store.address}
                  onChange={(e) => setStoreDetails(prev => ({
                    ...prev,
                    address: e.target.value
                  }))}
                  disabled={!isEditing}
                  placeholder="Address"
                  className={`w-full rounded-lg border ${
                    isEditing 
                      ? 'border-gray-300 focus:ring-2 focus:ring-blue-500' 
                      : 'border-transparent bg-gray-50'
                  } px-4 py-2.5`}
                />
              </div>
              <div className="flex items-center gap-2">
                <FiPhone className="w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={store.phone}
                  onChange={(e) => setStoreDetails(prev => ({
                    ...prev,
                    phone: e.target.value
                  }))}
                  disabled={!isEditing}
                  placeholder="Phone"
                  className={`w-full rounded-lg border ${
                    isEditing 
                      ? 'border-gray-300 focus:ring-2 focus:ring-blue-500' 
                      : 'border-transparent bg-gray-50'
                  } px-4 py-2.5`}
                />
              </div>
              <div className="flex items-center gap-2">
                <FiMail className="w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  value={store.email}
                  onChange={(e) => setStoreDetails(prev => ({
                    ...prev,
                    email: e.target.value
                  }))}
                  disabled={!isEditing}
                  placeholder="Email"
                  className={`w-full rounded-lg border ${
                    isEditing 
                      ? 'border-gray-300 focus:ring-2 focus:ring-blue-500' 
                      : 'border-transparent bg-gray-50'
                  } px-4 py-2.5`}
                />
              </div>
            </div>

            {/* Operating Hours and Additional Info */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Operating Hours
                </label>
                <input
                  type="text"
                  value={store.operatingHours}
                  onChange={(e) => setStoreDetails(prev => ({
                    ...prev,
                    operatingHours: e.target.value
                  }))}
                  disabled={!isEditing}
                  className={`w-full rounded-lg border ${
                    isEditing 
                      ? 'border-gray-300 focus:ring-2 focus:ring-blue-500' 
                      : 'border-transparent bg-gray-50'
                  } px-4 py-2.5`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Branch Count
                </label>
                <input
                  type="number"
                  value={store.branchCount}
                  onChange={(e) => setStoreDetails(prev => ({
                    ...prev,
                    branchCount: parseInt(e.target.value)
                  }))}
                  disabled={!isEditing}
                  className={`w-full rounded-lg border ${
                    isEditing 
                      ? 'border-gray-300 focus:ring-2 focus:ring-blue-500' 
                      : 'border-transparent bg-gray-50'
                  } px-4 py-2.5`}
                />
              </div>
            </div>

            {/* Medicine Groups */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Medicine Groups
              </label>
              <div className="flex flex-wrap gap-2">
                {store.medicineGroups.map((group, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium"
                  >
                    {group}
                  </span>
                ))}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StoreDetailModal; 