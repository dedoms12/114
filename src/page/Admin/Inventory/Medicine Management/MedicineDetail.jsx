import { useState, useEffect } from 'react';
import AdminNavbar from '../components/AdminNavbar';
import AdminSidebar from '../components/AdminSidebar';
import { 
  FiSave, FiX, FiAlertTriangle, FiImage, 
  FiDollarSign, FiPackage, FiArchive 
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const MedicineDetail = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [medicine, setMedicine] = useState({
    name: '',
    category: '',
    price: 0,
    stock: 0,
    pharmacy: '',
    restrictions: [],
    description: '',
    status: 'active',
    image: null,
    manufacturer: '',
    expiryDate: '',
    batchNumber: '',
    dosageForm: '',
    strength: '',
    storageInstructions: ''
  });

  const [errors, setErrors] = useState({});
  const [isDirty, setIsDirty] = useState(false);

  const categories = [
    { value: 'antibiotics', label: 'Antibiotics' },
    { value: 'painkillers', label: 'Painkillers' },
    { value: 'supplements', label: 'Supplements' },
    { value: 'medical_supplies', label: 'Medical Supplies' }
  ];

  const dosageForms = [
    'Tablet', 'Capsule', 'Liquid', 'Injection', 'Cream', 'Ointment'
  ];

  const handleChange = (field, value) => {
    setMedicine(prev => ({ ...prev, [field]: value }));
    setIsDirty(true);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!medicine.name) newErrors.name = 'Name is required';
    if (!medicine.category) newErrors.category = 'Category is required';
    if (medicine.price <= 0) newErrors.price = 'Price must be greater than 0';
    if (medicine.stock < 0) newErrors.stock = 'Stock cannot be negative';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    try {
      // API call logic here
      navigate('/admin/inventory/medicines');
    } catch (error) {
      setErrors({ submit: 'Failed to save details' });
    }
  };

  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminNavbar />
        <div className="flex-1 bg-gray-100 p-6 overflow-auto">
          <div className="max-w-4xl mx-auto">
            {/* Header with Navigation */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold">
                  {isEditing ? 'Edit Medicine' : 'Medicine Details'}
                </h1>
                <p className="text-sm text-gray-600">
                  {isEditing ? 'Modify medicine information' : 'View medicine details'}
                </p>
              </div>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Edit Details
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information Card */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name*</label>
                    <input
                      type="text"
                      value={medicine.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      disabled={!isEditing}
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.name && (
                      <span className="text-red-500 text-xs mt-1">{errors.name}</span>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Category*</label>
                    <select
                      value={medicine.category}
                      onChange={(e) => handleChange('category', e.target.value)}
                      disabled={!isEditing}
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Category</option>
                      {categories.map(cat => (
                        <option key={cat.value} value={cat.value}>{cat.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Pricing and Stock Card */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">Pricing & Stock</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Price (₱)*</label>
                    <div className="relative">
                      <FiDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="number"
                        value={medicine.price}
                        onChange={(e) => handleChange('price', parseFloat(e.target.value))}
                        disabled={!isEditing}
                        className="w-full pl-10 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              {isEditing && (
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setIsDirty(false);
                    }}
                    className="px-6 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicineDetail; 