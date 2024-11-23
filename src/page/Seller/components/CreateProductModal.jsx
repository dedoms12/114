import { useState, useEffect } from 'react';
import { FiX, FiPlus, FiTrash2, FiImage } from 'react-icons/fi';
import { getUniqueLocations } from '../product-management/product-data';
import LocationSelector from './LocationSelector';
import { medicalProducts } from '../../Client/product-page/medical-supplies/medsup-products';
import { products as generalProducts } from '../../Client/product-page/general-health/gen-products';

const CreateProductModal = ({ isOpen, onClose, onSave, categories, units, editProduct = null, onAdvanceSettings }) => {
  const [availableLocations, setAvailableLocations] = useState(
    getUniqueLocations().filter(loc => loc !== 'All Locations')
  );
  
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'medical-supplies',
    location: '',
    description: {
      main: '',
      subText: '',
      features: [],
      specifications: []
    },
    images: [],
    quantity: '',
    unit: 'Item',
    inventory: {
      stockAlert: 10,
      reorderPoint: 20,
      maxStock: 100,
      minStock: 5,
      stockStatus: 'In Stock',
      expiryDate: '',
      batchNumber: '',
      manufacturer: ''
    },
    expiryDate: '',
  });

  useEffect(() => {
    if (editProduct) {
      setFormData({
        ...editProduct,
        price: editProduct.price?.toString() || '',
        quantity: editProduct.quantity?.toString() || '',
        description: {
          main: editProduct.description?.main || '',
          subText: editProduct.description?.subText || '',
          features: editProduct.description?.features || [],
          specifications: editProduct.description?.specifications || []
        },
        inventory: {
          ...formData.inventory,
          ...(editProduct.inventory || {})
        }
      });
    }
  }, [editProduct]);

  useEffect(() => {
    try {
      const savedData = localStorage.getItem('productData');
      if (savedData) {
        const { medicalProducts: savedMedical, generalProducts: savedGeneral } = JSON.parse(savedData);
        
        if (savedMedical) Object.assign(medicalProducts, savedMedical);
        if (savedGeneral) Object.assign(generalProducts, savedGeneral);
      }
    } catch (error) {
      console.error('Error loading saved product data:', error);
    }
  }, []);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map(file => URL.createObjectURL(file));
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...imageUrls].slice(0, 5)
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

  const handleAddSpecification = () => {
    setFormData(prev => ({
      ...prev,
      description: {
        ...prev.description,
        specifications: [...prev.description.specifications, '']
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.name || !formData.price || !formData.category) {
        alert('Please fill in all required fields');
        return;
      }

      const updatedProduct = {
        ...formData,
        price: parseFloat(formData.price),
        quantity: parseInt(formData.quantity),
        lastUpdated: new Date().toISOString()
      };

      await onSave(updatedProduct);
      onClose();
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Failed to save product: ' + error.message);
    }
  };

  const handleQuantityChange = (value) => {
    setFormData(prev => ({
      ...prev,
      quantity: value
    }));
  };

  const handleLocationsUpdate = (updatedLocations) => {
    setAvailableLocations(updatedLocations);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-black opacity-30" onClick={onClose}></div>
        
        <div className="relative bg-white rounded-lg w-full max-w-4xl p-6">
          {/* Modal Header */}
          <div className="flex justify-between items-center mb-6 pb-4 border-b">
            <h2 className="text-2xl font-semibold">
              {editProduct ? 'Edit Product' : 'Add New Product'}
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <FiX size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Section 1: Basic Information */}
            <section>
              <h3 className="text-lg font-medium text-gray-700 mb-4">Basic Information</h3>
              <div className="grid grid-cols-2 gap-6">
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
                  <label className="block text-gray-700 mb-2">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full p-2 bg-gray-50 rounded-md border"
                  >
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Location</label>
                  <LocationSelector
                    value={formData.location}
                    onChange={(location) => setFormData(prev => ({ ...prev, location }))}
                    existingLocations={availableLocations}
                    onLocationsUpdate={handleLocationsUpdate}
                  />
                </div>
              </div>
            </section>

            {/* Section 2: Pricing & Stock */}
            <section className="border-t pt-6">
              <h3 className="text-lg font-medium text-gray-700 mb-4">Pricing & Stock</h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 mb-2">Price</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    className="w-full p-2 bg-gray-50 rounded-md border"
                    required
                    min="0"
                    step="0.01"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Quantity</label>
                  <input
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => handleQuantityChange(e.target.value)}
                    className="w-full p-2 bg-gray-50 rounded-md border"
                    required
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Unit Type</label>
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

                <div>
                  <label className="block text-gray-700 mb-2">Expiry Date</label>
                  <input
                    type="date"
                    value={formData.expiryDate}
                    onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
                    className="w-full p-2 bg-gray-50 rounded-md border"
                    required
                  />
                </div>
              </div>
            </section>

            {/* Section 3: Description */}
            <section className="border-t pt-6">
              <h3 className="text-lg font-medium text-gray-700 mb-4">Description</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">Main Description</label>
                  <textarea
                    value={formData.description.main}
                    onChange={(e) => setFormData({
                      ...formData,
                      description: { ...formData.description, main: e.target.value }
                    })}
                    className="w-full p-2 bg-gray-50 rounded-md border"
                    rows={3}
                    required
                  />
                </div>
              </div>
            </section>

            {/* Section 4: Features & Specifications */}
            <section className="border-t pt-6">
              <h3 className="text-lg font-medium text-gray-700 mb-4">Features & Specifications</h3>
              <div className="grid grid-cols-2 gap-6">
                {/* Features Column */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-gray-700">Features</label>
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({
                        ...prev,
                        description: {
                          ...prev.description,
                          features: [...prev.description.features, '']
                        }
                      }))}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <FiPlus className="inline mr-1" /> Add Feature
                    </button>
                  </div>
                  <div className="space-y-2">
                    {formData.description.features.map((feature, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={feature}
                          onChange={(e) => handleFeatureChange(index, e.target.value)}
                          className="flex-1 p-2 bg-gray-50 rounded-md border"
                          placeholder="Enter feature"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const newFeatures = formData.description.features.filter((_, i) => i !== index);
                            setFormData(prev => ({
                              ...prev,
                              description: { ...prev.description, features: newFeatures }
                            }));
                          }}
                          className="text-red-600 hover:text-red-700"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Specifications Column */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-gray-700">Specifications</label>
                    <button
                      type="button"
                      onClick={handleAddSpecification}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <FiPlus className="inline mr-1" /> Add Specification
                    </button>
                  </div>
                  <div className="space-y-2">
                    {formData.description.specifications.map((spec, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={spec}
                          onChange={(e) => handleSpecificationChange(index, e.target.value)}
                          className="flex-1 p-2 bg-gray-50 rounded-md border"
                          placeholder="Enter specification"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const newSpecs = formData.description.specifications.filter((_, i) => i !== index);
                            setFormData(prev => ({
                              ...prev,
                              description: { ...prev.description, specifications: newSpecs }
                            }));
                          }}
                          className="text-red-600 hover:text-red-700"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Section 5: Media Gallery */}
            <section className="border-t pt-6">
              <h3 className="text-lg font-medium text-gray-700 mb-4">Media Gallery</h3>
              <div>
                <label className="block text-gray-700 mb-2">Product Images</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="flex flex-col items-center cursor-pointer"
                  >
                    <FiImage className="w-8 h-8 text-gray-400" />
                    <span className="mt-2 text-sm text-gray-600">
                      Drop images here or click to upload
                    </span>
                  </label>
                </div>
                {/* Image Preview */}
                <div className="grid grid-cols-5 gap-2 mt-2">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-20 object-cover rounded"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newImages = formData.images.filter((_, i) => i !== index);
                          setFormData(prev => ({ ...prev, images: newImages }));
                        }}
                        className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full"
                      >
                        <FiTrash2 size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Action Buttons */}
            <div className="flex justify-between pt-6 border-t">
              {editProduct && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onAdvanceSettings();
                  }}
                  className="text-blue-600 hover:text-blue-700"
                >
                  Advanced Settings
                </button>
              )}
              <div className="flex gap-4 ml-auto">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  {editProduct ? 'Save Changes' : 'Add Product'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProductModal; 