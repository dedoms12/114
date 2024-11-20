import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiAlertCircle, FiPackage, FiCalendar, FiDollarSign, FiTag, FiMapPin } from 'react-icons/fi';
import NavbarSeller from '../components/navbarSeller';
import CreateProductModal from '../components/CreateProductModal';
import { getProductById } from '../../../shared/services/productService';
import { categories, units } from './product-data';

const InventoryProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const getDefaultExpiryDate = () => {
    const date = new Date();
    date.setMonth(date.getMonth() + 12); // Default to 1 year from now
    return date.toISOString().split('T')[0];
  };

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const categoryProducts = categories.flatMap(cat => cat.products);
        const productFromCategory = categoryProducts.find(p => p.id === parseInt(id));
        
        if (!productFromCategory) {
          console.error('Product not found');
          navigate('/product-management');
          return;
        }

        const productData = await getProductById(id, true);
        if (productData) {
          console.log('Found product:', productData);
          setProduct({
            ...productData,
            category: productFromCategory.category,
            expiryDate: productData.expiryDate || getDefaultExpiryDate(),
          });
        } else {
          console.error('Product not found');
          navigate('/product-management');
        }
      } catch (error) {
        console.error('Error loading product:', error);
        navigate('/product-management');
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NavbarSeller />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  const handleSaveProduct = async (updatedProduct) => {
    try {
      // Create the saved product with necessary fields
      const savedProduct = {
        ...updatedProduct,
        category: product.category,
        id: product.id
      };

      // Update the product in the categories array
      const category = categories.find(cat => cat.value === savedProduct.category.toLowerCase());
      if (category) {
        const index = category.products.findIndex(p => p.id === savedProduct.id);
        if (index !== -1) {
          category.products[index] = savedProduct;
        }
      }

      // Update the local state
      setProduct(savedProduct);
      setShowUpdateModal(false);
      
      // Save to localStorage to persist changes
      try {
        const savedData = localStorage.getItem('productData') || '{}';
        const parsedData = JSON.parse(savedData);
        
        // Update the appropriate product list
        if (savedProduct.category.toLowerCase().includes('medical')) {
          const medIndex = parsedData.medicalProducts?.findIndex(p => p.id === savedProduct.id);
          if (medIndex !== -1) {
            parsedData.medicalProducts[medIndex] = savedProduct;
          }
        } else {
          const genIndex = parsedData.generalProducts?.findIndex(p => p.id === savedProduct.id);
          if (genIndex !== -1) {
            parsedData.generalProducts[genIndex] = savedProduct;
          }
        }
        
        localStorage.setItem('productData', JSON.stringify(parsedData));
      } catch (error) {
        console.error('Error saving to localStorage:', error);
      }
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Failed to save product changes');
    }
  };

  const handleAdvanceSettings = () => {
    navigate(`/seller/product-management/edit-advanced/${id}`);
  };

  const getStockStatus = (quantity) => {
    if (quantity <= 0) return { text: 'Out of Stock', color: 'red' };
    if (quantity < 10) return { text: 'Low Stock', color: 'yellow' };
    return { text: 'In Stock', color: 'green' };
  };

  const stockStatus = getStockStatus(product.quantity);

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarSeller />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate('/seller/product-management')}
            className="flex items-center text-gray-600 hover:text-gray-800"
          >
            <FiArrowLeft className="mr-2" /> Back to Products
          </button>
          <div className="flex space-x-3">
            <button
              onClick={() => setShowUpdateModal(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Edit Product
            </button>
            <button
              onClick={handleAdvanceSettings}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
            >
              Advanced Settings
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Images */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <img
              src={product.images?.[selectedImage] || product.image}
              alt={product.name}
              className="w-full aspect-square object-contain mb-4 rounded-lg"
            />
            <div className="grid grid-cols-4 gap-2">
              {(product.images?.length > 0 ? product.images : [product.image]).map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${product.name} ${index + 1}`}
                  className={`w-full aspect-square object-cover rounded-md cursor-pointer 
                    ${selectedImage === index ? 'ring-2 ring-blue-500' : 'hover:opacity-75'}`}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
          </div>

          {/* Middle Column - Product Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex justify-between items-start mb-6">
                <h1 className="text-2xl font-semibold text-gray-800">{product.name}</h1>
                <span className={`px-3 py-1 rounded-full text-sm font-medium bg-${stockStatus.color}-100 text-${stockStatus.color}-800`}>
                  {stockStatus.text}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <FiTag className="text-gray-400 mr-2" />
                    <div>
                      <p className="text-sm text-gray-600">Category</p>
                      <p className="font-medium">{product.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <FiDollarSign className="text-gray-400 mr-2" />
                    <div>
                      <p className="text-sm text-gray-600">Price</p>
                      <p className="text-xl font-semibold text-blue-600">₱{product.price}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <FiPackage className="text-gray-400 mr-2" />
                    <div>
                      <p className="text-sm text-gray-600">Stock</p>
                      <p className="font-medium">{product.quantity} {product.unit}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <FiMapPin className="text-gray-400 mr-2" />
                    <div>
                      <p className="text-sm text-gray-600">Location</p>
                      <p className="font-medium">{product.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <FiCalendar className="text-gray-400 mr-2" />
                    <div>
                      <p className="text-sm text-gray-600">Expiry Date</p>
                      <p className="font-medium">
                        {new Date(product.expiryDate).toLocaleDateString()}
                        {!product.expiryDate && (
                          <span className="text-gray-400 text-sm ml-2">(Default)</span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <p className="text-sm text-gray-600 mb-2">Description</p>
                <p className="text-gray-700">{product.description?.main}</p>
                {product.description?.subText && (
                  <p className="text-sm text-gray-500 mt-2">{product.description.subText}</p>
                )}
              </div>

              {product.description?.features?.length > 0 && (
                <div className="mt-6">
                  <p className="text-sm text-gray-600 mb-2">Key Features</p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {product.description.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-700">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Inventory Details Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold mb-4">Inventory Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Stock Alert Level</p>
                  <p className="font-medium">{product.inventory?.stockAlert || 10}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Reorder Point</p>
                  <p className="font-medium">{product.inventory?.reorderPoint || 20}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Maximum Stock</p>
                  <p className="font-medium">{product.inventory?.maxStock || 100}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Minimum Stock</p>
                  <p className="font-medium">{product.inventory?.minStock || 5}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <CreateProductModal
          isOpen={showUpdateModal}
          onClose={() => setShowUpdateModal(false)}
          onSave={handleSaveProduct}
          categories={categories}
          units={units}
          editProduct={product}
          onAdvanceSettings={handleAdvanceSettings}
        />
      </div>
    </div>
  );
};

export default InventoryProductDetail;
