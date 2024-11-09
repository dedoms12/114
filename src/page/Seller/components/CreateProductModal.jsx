import { useState, useEffect } from 'react';
import { FiX, FiPlus, FiTrash2 } from 'react-icons/fi';
import { getUniqueLocations } from '../product-management/product-data';
import { medicalProducts } from '../../Client/product-page/medical-supplies/medsup-products';
import { products as generalProducts } from '../../Client/product-page/general-health/gen-products';

const CreateProductModal = ({ isOpen, onClose, onSave, categories, units, editProduct = null, onAdvanceSettings }) => {
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
    }
  });

  useEffect(() => {
    if (editProduct) {
      const productArray = editProduct.category === 'medical-supplies' ? medicalProducts : generalProducts;
      const savedProduct = productArray.find(p => p.id === editProduct.id);

      if (savedProduct) {
        setFormData({
          ...savedProduct,
          price: savedProduct.price?.toString() || '',
          quantity: savedProduct.quantity?.toString() || '',
          description: {
            main: savedProduct.description?.main || '',
            subText: savedProduct.description?.subText || '',
            features: savedProduct.description?.features || [],
            specifications: savedProduct.description?.specifications || []
          },
          inventory: {
            ...formData.inventory,
            ...(savedProduct.inventory || {})
          }
        });
      }
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.name || !formData.price || !formData.category) {
        alert('Please fill in all required fields');
        return;
      }

      const updatedProduct = {
        ...formData,
        id: editProduct?.id || Date.now(),
        price: parseFloat(formData.price),
        quantity: parseInt(formData.quantity),
        lastUpdated: new Date().toISOString(),
        description: {
          ...formData.description,
          features: formData.description.features.filter(f => f.trim() !== ''),
          specifications: formData.description.specifications.filter(s => s.trim() !== '')
        },
        inventory: {
          ...formData.inventory,
          stockAlert: parseInt(formData.inventory.stockAlert),
          reorderPoint: parseInt(formData.inventory.reorderPoint),
          maxStock: parseInt(formData.inventory.maxStock),
          minStock: parseInt(formData.inventory.minStock)
        }
      };

      let productArray;
      let productIndex;

      if (updatedProduct.category === 'medical-supplies') {
        productArray = medicalProducts;
        productIndex = medicalProducts.findIndex(p => p.id === updatedProduct.id);
      } else {
        productArray = generalProducts;
        productIndex = generalProducts.findIndex(p => p.id === updatedProduct.id);
      }

      if (editProduct && productIndex !== -1) {
        productArray[productIndex] = updatedProduct;
      } else {
        productArray.push(updatedProduct);
      }

      try {
        const allProducts = {
          medicalProducts: medicalProducts,
          generalProducts: generalProducts
        };
        localStorage.setItem('productData', JSON.stringify(allProducts));

        await onSave(updatedProduct);
        
        onClose();
        
        alert('Product saved successfully!');
        
        window.location.reload();
      } catch (error) {
        throw new Error('Failed to save product data: ' + error.message);
      }
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Failed to save product changes: ' + error.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-black opacity-30" onClick={onClose}></div>
        
        <div className="relative bg-white rounded-lg w-full max-w-4xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">
              {editProduct ? 'Edit Product' : 'Add New Product'}
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <FiX size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
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
            </div>

            {/* Description */}
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

              {/* Features */}
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
                {formData.description.features.map((feature, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => handleFeatureChange(index, e.target.value)}
                      className="flex-1 p-2 bg-gray-50 rounded-md border"
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

            {/* Pricing and Inventory */}
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
                  onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                  className="w-full p-2 bg-gray-50 rounded-md border"
                  required
                  min="0"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between pt-4">
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