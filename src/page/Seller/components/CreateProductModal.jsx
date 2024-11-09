import { useState, useEffect } from 'react';
import { FiX, FiPlus, FiTrash2 } from 'react-icons/fi';
import { getUniqueLocations } from '../product-management/product-data';

const CreateProductModal = ({ isOpen, onClose, onSave, categories, units, editProduct = null }) => {
  const locations = getUniqueLocations().filter(loc => loc !== 'All Locations');
  
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'medical-supplies',
    location: locations[0] || '',
    description: {
      main: '',
      subText: '',
      features: [],
      specifications: []
    },
    shipping: {
      standard: { price: '₱30', days: '10 Hours' },
      express: { price: '₱50', days: '5 Hours' }
    },
    images: [],
    quantity: '',
    unit: 'Item'
  });

  useEffect(() => {
    if (editProduct) {
      setFormData({
        ...editProduct,
        category: editProduct.category || 'medical-supplies',
        location: editProduct.location || locations[0],
      });
    }
  }, [editProduct, locations]);

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      description: {
        ...prev.description,
        features: [...prev.description.features, '']
      }
    }));
  };

  const addSpecification = () => {
    setFormData(prev => ({
      ...prev,
      description: {
        ...prev.description,
        specifications: [...prev.description.specifications, '']
      }
    }));
  };

  const removeFeature = (index) => {
    setFormData(prev => ({
      ...prev,
      description: {
        ...prev.description,
        features: prev.description.features.filter((_, i) => i !== index)
      }
    }));
  };

  const removeSpecification = (index) => {
    setFormData(prev => ({
      ...prev,
      description: {
        ...prev.description,
        specifications: prev.description.specifications.filter((_, i) => i !== index)
      }
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map(file => URL.createObjectURL(file));
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...imageUrls].slice(0, 3)
    }));
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...formData.description.features];
    newFeatures[index] = value;
    setFormData(prev => ({
      ...prev,
      description: {
        ...prev.description,
        features: newFeatures
      }
    }));
  };

  const handleSpecificationChange = (index, value) => {
    const newSpecs = [...formData.description.specifications];
    newSpecs[index] = value;
    setFormData(prev => ({
      ...prev,
      description: {
        ...prev.description,
        specifications: newSpecs
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-lg w-[800px] max-h-[90vh] overflow-y-auto p-6" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">{editProduct ? 'Edit Product' : 'Create New Product'}</h2>
          <button onClick={onClose}>
            <FiX size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Basic Information */}
          <div className="mb-6">
            <h3 className="text-lg text-[#4C9BF5] mb-4">Basic Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">Product Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full p-2 bg-gray-50 rounded-md border"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Price</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  className="w-full p-2 bg-gray-50 rounded-md border"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full p-2 bg-gray-50 rounded-md border"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.value}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Location</label>
                <select
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="w-full p-2 bg-gray-50 rounded-md border"
                >
                  {locations.map((location, index) => (
                    <option key={index} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-lg text-[#4C9BF5] mb-4">Description</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Main Description</label>
                <input
                  type="text"
                  value={formData.description.main}
                  onChange={(e) => setFormData({
                    ...formData,
                    description: { ...formData.description, main: e.target.value }
                  })}
                  className="w-full p-2 bg-gray-50 rounded-md border"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Sub Text</label>
                <input
                  type="text"
                  value={formData.description.subText}
                  onChange={(e) => setFormData({
                    ...formData,
                    description: { ...formData.description, subText: e.target.value }
                  })}
                  className="w-full p-2 bg-gray-50 rounded-md border"
                  required
                />
              </div>
            </div>
          </div>

          {/* Features and Specifications */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-gray-700">Features</h4>
                <button
                  type="button"
                  onClick={addFeature}
                  className="text-[#4C9BF5] hover:bg-blue-50 p-2 rounded-full"
                >
                  <FiPlus size={20} />
                </button>
              </div>
              {formData.description.features.map((feature, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    className="flex-1 p-2 bg-gray-50 rounded-md border"
                    placeholder={`Feature ${index + 1}`}
                  />
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="text-red-500 hover:bg-red-50 p-2 rounded-full"
                  >
                    <FiTrash2 size={20} />
                  </button>
                </div>
              ))}
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-gray-700">Specifications</h4>
                <button
                  type="button"
                  onClick={addSpecification}
                  className="text-[#4C9BF5] hover:bg-blue-50 p-2 rounded-full"
                >
                  <FiPlus size={20} />
                </button>
              </div>
              {formData.description.specifications.map((spec, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={spec}
                    onChange={(e) => handleSpecificationChange(index, e.target.value)}
                    className="flex-1 p-2 bg-gray-50 rounded-md border"
                    placeholder={`Specification ${index + 1}`}
                  />
                  <button
                    type="button"
                    onClick={() => removeSpecification(index)}
                    className="text-red-500 hover:bg-red-50 p-2 rounded-full"
                  >
                    <FiTrash2 size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Media Upload */}
          <div className="mb-6">
            <h3 className="text-lg text-[#4C9BF5] mb-4">Media Upload</h3>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full p-2 bg-gray-50 rounded-md border"
            />
            <div className="grid grid-cols-3 gap-4 mt-4">
              {formData.images.map((image, index) => (
                <img key={index} src={image} alt={`Preview ${index + 1}`} className="w-full h-32 object-cover rounded" />
              ))}
            </div>
          </div>

          {/* Inventory Information */}
          <div className="mb-6">
            <h3 className="text-lg text-[#4C9BF5] mb-4">Inventory</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">Quantity</label>
                <input
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                  className="w-full p-2 bg-gray-50 rounded-md border"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Unit</label>
                <select
                  value={formData.unit}
                  onChange={(e) => setFormData({...formData, unit: e.target.value})}
                  className="w-full p-2 bg-gray-50 rounded-md border"
                >
                  {units.map((unit, index) => (
                    <option key={index} value={unit}>{unit}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-between">
            <button type="button" className="text-[#4C9BF5] hover:underline">
              Advanced Settings
            </button>
            <button
              type="submit"
              className="bg-[#4C9BF5] text-white px-6 py-2 rounded-md hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProductModal; 