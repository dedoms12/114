import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiAlertCircle, FiPackage, FiCalendar } from 'react-icons/fi';
import NavbarSeller from '../components/navbarSeller';
import CreateProductModal from '../components/CreateProductModal';
import { medicalProducts } from '../../../page/Client/product-page/medical-supplies/medsup-products';
import { products as generalProducts } from '../../../page/Client/product-page/general-health/gen-products';

const InventoryProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  
  // Find product across all product categories
  const findProduct = (productId) => {
    const numericId = parseInt(productId);
    const allProducts = [...medicalProducts, ...generalProducts];
    const product = allProducts.find(p => p.id === numericId);
    return product ? { ...product, categoryName: product.category } : null;
  };

  const product = findProduct(id);

  // Mock inventory data with pharmacy-specific status
  const inventoryData = {
    onHand: 200,
    toBeDelivered: 50,
    toBeOrdered: 50,
    lastUpdated: '2024-03-20',
    inventoryValue: product?.price * 200 || 0,
    stockStatus: 'In Stock',
    expiryDate: '2025-12-31',
    reorderPoint: 100,
    unit: 'Box',
    manufacturer: 'PharmaCorp Inc.'
  };

  const getStockStatusColor = (status) => {
    const statusColors = {
      'In Stock': 'green',
      'Low Stock': 'yellow',
      'Out of Stock': 'red',
      'Near Expiry': 'orange',
      'Expired': 'red',
      'Discontinued': 'gray'
    };
    return statusColors[status] || 'gray';
  };

  // Add these mock data for the modal
  const categories = [
    { id: 1, value: 'medical-supplies', name: 'Medical Supplies' },
    { id: 2, value: 'general-health', name: 'General Health' },
    // Add other categories as needed
  ];

  const units = ['Box', 'Piece', 'Pack', 'Bottle', 'Strip'];

  // Transform product data for editing
  const transformedProduct = product ? {
    id: product.id,
    name: product.name,
    price: product.price?.toString(),
    category: product.categoryName?.toLowerCase(),
    location: product.location,
    description: {
      main: product.description?.main || '',
      subText: product.description?.subText || '',
      features: product.description?.features || [],
      specifications: product.description?.specifications || []
    },
    images: product.images || [],
    quantity: inventoryData.onHand.toString(),
    unit: inventoryData.unit,
    inventory: {
      stockAlert: inventoryData.reorderPoint / 2,
      reorderPoint: inventoryData.reorderPoint,
      maxStock: inventoryData.onHand * 2,
      minStock: inventoryData.reorderPoint / 2,
      stockStatus: inventoryData.stockStatus,
      expiryDate: inventoryData.expiryDate,
      batchNumber: product.batchNumber || '',
      manufacturer: inventoryData.manufacturer
    }
  } : null;

  const handleSaveProduct = async (updatedData) => {
    try {
      // Find the product in the appropriate array
      let productArray = medicalProducts;
      let productIndex = productArray.findIndex(p => p.id === product.id);
      
      if (productIndex === -1) {
        productArray = generalProducts;
        productIndex = productArray.findIndex(p => p.id === product.id);
      }

      if (productIndex === -1) {
        throw new Error('Product not found');
      }

      // Update the product with new data
      const updatedProduct = {
        ...productArray[productIndex],
        ...updatedData,
        price: parseFloat(updatedData.price),
        quantity: parseInt(updatedData.quantity),
        lastUpdated: new Date().toISOString()
      };

      // Update the product in the array
      productArray[productIndex] = updatedProduct;

      // Close modal and show success message
      setShowUpdateModal(false);
      // Implement success feedback
      window.location.reload(); // Refresh to show updated data
    } catch (error) {
      console.error('Error saving product:', error);
      // Implement error feedback
    }
  };

  const handleAdvanceSettings = () => {
    if (product) {
      navigate(`/product-management/edit-advanced/${product.id}`);
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-100">
        <NavbarSeller />
        <div className="max-w-7xl mx-auto p-6">
          <div className="bg-white rounded-lg p-6 text-center">
            <h2 className="text-xl font-semibold text-gray-800">Product not found</h2>
            <button 
              onClick={() => navigate('/product-management')}
              className="mt-4 text-blue-500 hover:text-blue-600"
            >
              Back to Product Management
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <NavbarSeller />
      
      <div className="max-w-7xl mx-auto p-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-4">
          <button 
            onClick={() => navigate('/product-management')}
            className="flex items-center text-blue-500 hover:text-blue-600"
          >
            <FiArrowLeft className="mr-2" />
            Product
          </button>
          <span className="text-gray-400">›</span>
          <span>Product Detail</span>
        </div>

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">{product.name}</h1>
          <button 
            onClick={() => setShowUpdateModal(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Update Product Information
          </button>
        </div>

        {/* Stock Status Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-600">Current Stock</h3>
              <FiPackage className="text-blue-500" />
            </div>
            <p className="text-2xl font-semibold text-blue-500 mt-2">
              {inventoryData.onHand} {inventoryData.unit}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Value: ₱{inventoryData.inventoryValue.toLocaleString()}
            </p>
          </div>

          <div className="bg-white rounded-lg p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-600">Stock Status</h3>
              <FiAlertCircle className={`text-${getStockStatusColor(inventoryData.stockStatus)}-500`} />
            </div>
            <p className={`text-2xl font-semibold text-${getStockStatusColor(inventoryData.stockStatus)}-500 mt-2`}>
              {inventoryData.stockStatus}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Updated: {inventoryData.lastUpdated}
            </p>
          </div>

          <div className="bg-white rounded-lg p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-600">Expiry Date</h3>
              <FiCalendar className="text-orange-500" />
            </div>
            <p className="text-2xl font-semibold text-orange-500 mt-2">
              {inventoryData.expiryDate}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Days until expiry: 365
            </p>
          </div>

          <div className="bg-white rounded-lg p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-600">Reorder Point</h3>
              <FiAlertCircle className="text-purple-500" />
            </div>
            <p className="text-2xl font-semibold text-purple-500 mt-2">
              {inventoryData.reorderPoint} {inventoryData.unit}
            </p>
            <p className="text-sm text-gray-500 mt-1">Minimum stock level</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-3 gap-6">
          {/* Left Column - Product Images */}
          <div className="bg-white rounded-lg p-6">
            <img 
              src={product.images[selectedImage]} 
              alt={product.name}
              className="w-full aspect-square object-contain mb-4 rounded-lg"
            />
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((img, index) => (
                <img 
                  key={index}
                  src={img}
                  alt={`${product.name} ${index + 1}`}
                  className={`w-full aspect-square object-cover rounded-md cursor-pointer 
                    ${selectedImage === index ? 'ring-2 ring-blue-500' : 'hover:opacity-80'}`}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
          </div>

          {/* Middle Column - Product Details */}
          <div className="bg-white rounded-lg p-6">
            <h3 className="font-semibold mb-4">Product Information</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Product Name</p>
                <p className="font-medium">{product.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Category</p>
                <p className="font-medium">{product.categoryName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Manufacturer</p>
                <p className="font-medium">{inventoryData.manufacturer}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Description</p>
                <p className="text-gray-700">{product.description.main}</p>
                <p className="text-sm text-gray-500 mt-1">{product.description.subText}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Key Features</p>
                <ul className="list-disc list-inside text-gray-700 mt-1">
                  {product.description.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column - Specifications */}
          <div className="bg-white rounded-lg p-6">
            <h3 className="font-semibold mb-4">Specifications</h3>
            <div className="space-y-2">
              {product.description.specifications.map((spec, index) => (
                <div key={index} className="py-2 border-b last:border-0">
                  <p className="text-gray-700">{spec}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Update Modal */}
      <CreateProductModal
        isOpen={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        onSave={handleSaveProduct}
        categories={categories}
        units={units}
        editProduct={transformedProduct}
        onAdvanceSettings={handleAdvanceSettings}
      />
    </div>
  );
};

export default InventoryProductDetail;
