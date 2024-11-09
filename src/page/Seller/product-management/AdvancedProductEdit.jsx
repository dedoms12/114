import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiHome, FiPlus, FiTrash2, FiImage, FiDollarSign, FiTag, FiPackage } from 'react-icons/fi';
import NavbarSeller from '../components/navbarSeller';
import { categories, units, getUniqueLocations } from './product-data';
import SuccessFeedback from '../components/SuccessFeedback';
import { medicalProducts } from '../../Client/product-page/medical-supplies/medsup-products';
import { products as generalProducts } from '../../Client/product-page/general-health/gen-products';

const AdvancedProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('general');
  const locations = getUniqueLocations().filter(loc => loc !== 'All Locations');
  const [showSuccess, setShowSuccess] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  // Find product across all product categories (similar to inv-prodetail.jsx)
  const findProduct = (productId) => {
    const numericId = parseInt(productId);
    const allProducts = [...medicalProducts, ...generalProducts];
    const product = allProducts.find(p => p.id === numericId);
    return product ? { ...product, categoryName: product.category } : null;
  };

  // Mock inventory data (similar to inv-prodetail.jsx)
  const inventoryData = {
    onHand: 200,
    toBeDelivered: 50,
    toBeOrdered: 50,
    lastUpdated: '2024-03-20',
    stockStatus: 'In Stock',
    expiryDate: '2025-12-31',
    reorderPoint: 100,
    unit: 'Box',
    manufacturer: 'PharmaCorp Inc.'
  };

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    vendor: '',
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
    price: '',
    quantity: '',
    unit: 'Item',
    location: locations[0] || '',
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
    const product = findProduct(id);
    if (product) {
      setFormData({
        ...product,
        price: product.price?.toString() || '',
        quantity: product.quantity?.toString() || '',
        images: product.images || [],
        description: {
          main: product.description?.main || '',
          subText: product.description?.subText || '',
          features: product.description?.features || [],
          specifications: product.description?.specifications || []
        },
        inventory: {
          stockAlert: product.inventory?.stockAlert || 10,
          reorderPoint: product.inventory?.reorderPoint || 20,
          maxStock: product.inventory?.maxStock || 100,
          minStock: product.inventory?.minStock || 5,
          stockStatus: product.inventory?.stockStatus || 'In Stock',
          expiryDate: product.inventory?.expiryDate || '',
          batchNumber: product.inventory?.batchNumber || '',
          manufacturer: product.inventory?.manufacturer || ''
        }
      });
    }
  }, [id]);

  // Add this useEffect to load saved data
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

  const tabs = [
    { id: 'general', label: 'General Information', icon: FiTag },
    { id: 'media', label: 'Media Gallery', icon: FiImage },
    { id: 'purchase', label: 'Purchase Information', icon: FiDollarSign },
    { id: 'inventory', label: 'Inventory Management', icon: FiPackage }
  ];

  const handleAddFeature = () => {
    setFormData(prev => ({
      ...prev,
      description: {
        ...prev.description,
        features: [...prev.description.features, '']
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

  // Add this handler for image uploads
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map(file => URL.createObjectURL(file));
    
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...imageUrls].slice(0, 5) // Limit to 5 images
    }));
    setIsDirty(true);
  };

  // Update the handleSave function to preserve images
  const handleSave = async (isDraft = true) => {
    try {
      if (!formData.name || !formData.category || !formData.price) {
        throw new Error('Please fill in all required fields');
      }

      const updatedProduct = {
        ...formData,
        id: parseInt(id),
        price: parseFloat(formData.price),
        quantity: parseInt(formData.quantity),
        lastUpdated: new Date().toISOString(),
        status: isDraft ? 'draft' : 'published',
        images: formData.images.length > 0 ? formData.images : (findProduct(id)?.images || []),
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

      let productArray = formData.category === 'medical-supplies' ? medicalProducts : generalProducts;
      const productIndex = productArray.findIndex(p => p.id === parseInt(id));
      
      if (productIndex !== -1) {
        productArray[productIndex] = updatedProduct;
        
        // Save to localStorage
        const allProducts = {
          medicalProducts: medicalProducts,
          generalProducts: generalProducts
        };
        localStorage.setItem('productData', JSON.stringify(allProducts));
        
        setShowSuccess(true);
        setIsDirty(false);
        
        setTimeout(() => {
          window.location.reload();
        }, 1500);
        
        return updatedProduct;
      }
      throw new Error('Product not found');
    } catch (error) {
      console.error('Error saving product:', error);
      alert(error.message);
      throw error;
    }
  };

  const handleDraftSave = async () => {
    try {
      await handleSave(true);
    } catch (error) {
      // Implement error feedback
    }
  };

  const handlePublish = async () => {
    try {
      const updatedProduct = await handleSave(false);
      if (updatedProduct) {
        setFormData(prev => ({
          ...prev,
          status: 'published'
        }));
      }
    } catch (error) {
      console.error('Error publishing product:', error);
      alert('Failed to publish product');
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Basic Information</h2>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Title</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter product title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={formData.code}
                  onChange={(e) => setFormData({...formData, code: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.value}>{cat.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <div className="space-y-4">
                <textarea
                  value={formData.description.main}
                  onChange={(e) => setFormData({
                    ...formData,
                    description: { ...formData.description, main: e.target.value }
                  })}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Main product description"
                />
                
                <textarea
                  value={formData.description.subText}
                  onChange={(e) => setFormData({
                    ...formData,
                    description: { ...formData.description, subText: e.target.value }
                  })}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Additional description"
                />
              </div>
            </div>

            {/* Features Section */}
            <div className="border-t pt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-800">Product Features</h3>
                <button
                  type="button"
                  onClick={handleAddFeature}
                  className="inline-flex items-center px-3 py-1 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50"
                >
                  <FiPlus className="mr-1" /> Add Feature
                </button>
              </div>
              <div className="space-y-3">
                {formData.description.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => handleFeatureChange(index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
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
                      className="p-2 text-red-500 hover:bg-red-50 rounded-md"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Specifications Section */}
            <div className="border-t pt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-800">Specifications</h3>
                <button
                  type="button"
                  onClick={handleAddSpecification}
                  className="inline-flex items-center px-3 py-1 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50"
                >
                  <FiPlus className="mr-1" /> Add Specification
                </button>
              </div>
              <div className="space-y-3">
                {formData.description.specifications.map((spec, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={spec}
                      onChange={(e) => handleSpecificationChange(index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
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
                      className="p-2 text-red-500 hover:bg-red-50 rounded-md"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'media':
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Product Images</h3>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
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
                  <FiImage className="w-12 h-12 text-gray-400" />
                  <span className="mt-2 text-sm text-gray-600">
                    Drop images here or click to upload
                  </span>
                  <span className="mt-1 text-xs text-gray-500">
                    (Maximum 5 images)
                  </span>
                </label>
              </div>

              <div className="grid grid-cols-4 gap-4">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image}
                      alt={`Product ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newImages = formData.images.filter((_, i) => i !== index);
                        handleFormChange({ images: newImages });
                      }}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'purchase':
        return (
          <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Purchase Information</h2>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Regular Price</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => handleFormChange({ price: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Add more pricing fields */}
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Shipping Options</h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Standard Shipping</label>
                  <input
                    type="text"
                    value={formData.shipping.standard.price}
                    onChange={(e) => handleFormChange({
                      shipping: {
                        ...formData.shipping,
                        standard: { ...formData.shipping.standard, price: e.target.value }
                      }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                {/* Add express shipping fields */}
              </div>
            </div>
          </div>
        );

      case 'inventory':
        return (
          <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Inventory Management</h2>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Stock</label>
                <input
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => handleFormChange({ quantity: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Unit Type</label>
                <select
                  value={formData.unit}
                  onChange={(e) => handleFormChange({ unit: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  {units.map((unit, index) => (
                    <option key={index} value={unit}>{unit}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stock Alert Level</label>
                <input
                  type="number"
                  value={formData.inventory.stockAlert}
                  onChange={(e) => handleFormChange({
                    inventory: { ...formData.inventory, stockAlert: parseInt(e.target.value) }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reorder Point</label>
                <input
                  type="number"
                  value={formData.inventory.reorderPoint}
                  onChange={(e) => handleFormChange({
                    inventory: { ...formData.inventory, reorderPoint: parseInt(e.target.value) }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Maximum Stock Level</label>
                <input
                  type="number"
                  value={formData.inventory.maxStock}
                  onChange={(e) => handleFormChange({
                    inventory: { ...formData.inventory, maxStock: parseInt(e.target.value) }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Stock Level</label>
                <input
                  type="number"
                  value={formData.inventory.minStock}
                  onChange={(e) => handleFormChange({
                    inventory: { ...formData.inventory, minStock: parseInt(e.target.value) }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="border-t pt-6 mt-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Additional Information</h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Batch Number</label>
                  <input
                    type="text"
                    value={formData.inventory.batchNumber}
                    onChange={(e) => handleFormChange({
                      inventory: { ...formData.inventory, batchNumber: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Manufacturer</label>
                  <input
                    type="text"
                    value={formData.inventory.manufacturer}
                    onChange={(e) => handleFormChange({
                      inventory: { ...formData.inventory, manufacturer: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                  <input
                    type="date"
                    value={formData.inventory.expiryDate}
                    onChange={(e) => handleFormChange({
                      inventory: { ...formData.inventory, expiryDate: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock Status</label>
                  <select
                    value={formData.inventory.stockStatus}
                    onChange={(e) => handleFormChange({
                      inventory: { ...formData.inventory, stockStatus: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="In Stock">In Stock</option>
                    <option value="Low Stock">Low Stock</option>
                    <option value="Out of Stock">Out of Stock</option>
                    <option value="Discontinued">Discontinued</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Update handleFormChange to mark as dirty
  const handleFormChange = (updates) => {
    setFormData(prev => {
      const newData = { ...prev };
      
      Object.entries(updates).forEach(([key, value]) => {
        if (typeof value === 'object' && value !== null) {
          newData[key] = {
            ...prev[key],
            ...value
          };
        } else {
          newData[key] = value;
        }
      });
      
      return newData;
    });
    setIsDirty(true);
  };

  // Add a confirmation before leaving if there are unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty]);

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarSeller />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with Back Button */}
        <div className="mb-8">
          <div className="flex items-center text-sm text-gray-500">
            <button
              onClick={() => navigate('/product-management')}
              className="flex items-center text-blue-600 hover:text-blue-700"
            >
              <FiArrowLeft className="mr-2" />
              Back to Product Management
            </button>
            <span className="mx-2">/</span>
            <span>Advanced Edit</span>
          </div>
          <h1 className="mt-2 text-2xl font-bold text-gray-900">Edit Product Details</h1>
        </div>

        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-4 py-3 text-left ${
                    activeTab === tab.id 
                      ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <tab.icon className="mr-3" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {renderTabContent()}
            
            {/* Action Buttons */}
            <div className="mt-6 flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
              <button 
                className="text-blue-600 hover:text-blue-700 font-medium"
                onClick={handleDraftSave}
              >
                Save as Draft
              </button>
              <div className="space-x-4">
                <button 
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  onClick={() => {
                    // Implement preview functionality if needed
                    window.open(`/preview/product/${id}`, '_blank');
                  }}
                >
                  Preview
                </button>
                <button 
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  onClick={handlePublish}
                >
                  Publish
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Feedback Modal */}
      <SuccessFeedback
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        action="updated"
        productDetails={formData}
      />
    </div>
  );
};

export default AdvancedProductEdit;