import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarSeller from '../components/navbarSeller';
import { FiSearch, FiFilter, FiGrid, FiList } from 'react-icons/fi';
import { categories, units, addProduct, getUniqueLocations } from './product-data';
import CreateProductModal from '../components/CreateProductModal';
import SuccessFeedback from '../components/successfeedback';

const ProductManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [selectedCategory, setSelectedCategory] = useState('medical-supplies');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState('grid');
  const productsPerPage = 8;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showSuccessFeedback, setShowSuccessFeedback] = useState(false);
  const [savedProductDetails, setSavedProductDetails] = useState(null);
  const [actionType, setActionType] = useState('add');
  const navigate = useNavigate();

  // Get current category's products
  const currentCategory = categories.find(cat => cat.value === selectedCategory);
  const products = currentCategory ? currentCategory.products : [];

  // Filter products based on search term and location
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedLocation === 'All Locations' || product.location === selectedLocation)
  );

  // Get current products for pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Calculate total pages
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleSaveProduct = async (productData) => {
    try {
      if (editingProduct) {
        // Update existing product
        const category = categories.find(cat => cat.value === productData.category.toLowerCase());
        if (category) {
          // Remove existing product
          const index = category.products.findIndex(p => p.id === editingProduct.id);
          if (index !== -1) {
            category.products.splice(index, 1);
          }
          // Add updated product to beginning of array
          category.products.unshift({ ...productData, id: editingProduct.id });
        }
        setActionType('edit');
      } else {
        // Add new product
        const newProduct = {
          ...productData,
          id: Date.now(),
          soldCount: 0
        };
        addProduct(newProduct);
        setActionType('add');
      }
      
      setSavedProductDetails(productData);
      setShowSuccessFeedback(true);
      setIsModalOpen(false);
      setCurrentPage(1); // Reset to first page
      
      // Add timeout to show success message before navigating
      setTimeout(() => {
        setShowSuccessFeedback(false);
        if (editingProduct) {
          navigate(`/product-management/product/${editingProduct.id}`);
        }
      }, 1500);
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Failed to save product: ' + error.message);
    }
  };

  const handleViewChange = (mode) => {
    setViewMode(mode);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  // Get unique locations
  const locations = getUniqueLocations();

  const handleProductClick = (productId) => {
    navigate(`/product-management/product/${productId}`);
  };

  const handleAdvanceSettings = (productId) => {
    navigate(`/product-management/edit-advanced/${productId}`);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <NavbarSeller />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Product Management</h1>
            <p className="text-sm text-gray-500">See All</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center px-6 py-2.5 bg-[#4C9BF5] text-white text-sm font-medium rounded-md hover:bg-blue-600 transition-colors"
          >
            + Create New Product
          </button>
        </div>

        {/* Search and Filters Bar */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <div className="flex flex-wrap items-center gap-4">
            {/* Search */}
            <div className="flex-1 min-w-[280px]">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4C9BF5] focus:border-transparent"
                />
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* Location Filter */}
            <div className="min-w-[200px]">
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4C9BF5] focus:border-transparent appearance-none bg-white"
              >
                {locations.map((location, index) => (
                  <option key={index} value={location}>{location}</option>
                ))}
              </select>
            </div>

            {/* Category Filter */}
            <div className="min-w-[200px]">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4C9BF5] focus:border-transparent appearance-none bg-white"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.value}>{category.name}</option>
                ))}
              </select>
            </div>

            {/* View Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => handleViewChange('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-white text-[#4C9BF5] shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <FiGrid size={20} />
              </button>
              <button
                onClick={() => handleViewChange('list')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-white text-[#4C9BF5] shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <FiList size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid/List View */}
        <div className={viewMode === 'grid' ? 
          `grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-fr` : 
          `flex flex-col gap-4`
        }>
          {currentProducts.map(product => (
            <div 
              key={product.id}
              onClick={() => handleProductClick(product.id)}
              className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer
                ${viewMode === 'list' ? 'flex' : ''}`}
            >
              {/* Product Image */}
              <div className={`
                relative 
                ${viewMode === 'list' ? 'w-48 h-48 flex-shrink-0' : 'aspect-square'}
              `}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-l-lg"
                />
                <div className="absolute top-3 right-3">
                  <span className={`
                    inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium
                    ${product.quantity > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                  `}>
                    {product.quantity > 0 ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              </div>

              {/* Product Details */}
              <div className={`
                ${viewMode === 'list' ? 'flex flex-1 p-4' : 'p-4'}
              `}>
                {viewMode === 'list' ? (
                  // List View Layout
                  <div className="flex flex-1 justify-between">
                    {/* Left Section - Main Info */}
                    <div className="flex-1 pr-8">
                      <h3 className="font-medium text-gray-900 text-lg mb-2">{product.name}</h3>
                      <div className="space-y-2 text-sm text-gray-600">
                        <p>Category: {product.category}</p>
                        <p>Location: {product.location}</p>
                        <p>Stock: {product.quantity} units</p>
                      </div>
                    </div>

                    {/* Middle Section - Price & Stats */}
                    <div className="w-48 flex flex-col items-start">
                      <div className="mb-2">
                        <span className="text-2xl font-semibold text-[#FF6B6B]">₱{product.price}</span>
                      </div>
                      <div className="text-sm text-gray-500">
                        <p>{product.soldCount} Sold</p>
                        <p>SKU: {product.id}</p>
                      </div>
                    </div>

                    {/* Right Section - Actions */}
                    <div className="w-32 flex flex-col justify-center space-y-2">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(product);
                        }}
                        className="w-full px-4 py-2 text-sm font-medium text-[#4C9BF5] bg-blue-50 rounded-md hover:bg-blue-100 transition-colors"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAdvanceSettings(product.id);
                        }}
                        className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
                      >
                        Advanced
                      </button>
                    </div>
                  </div>
                ) : (
                  // Grid View Layout (Original)
                  <>
                    <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-lg font-semibold text-[#FF6B6B]">₱{product.price}</span>
                      <span className="text-sm text-gray-500">{product.soldCount} Sold</span>
                    </div>
                    <p className="text-sm text-gray-500 mb-4">{product.location}</p>
                    <div className="flex gap-2">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(product);
                        }}
                        className="flex-1 px-4 py-2 text-sm font-medium text-[#4C9BF5] bg-blue-50 rounded-md hover:bg-blue-100 transition-colors"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAdvanceSettings(product.id);
                        }}
                        className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
                      >
                        Advanced
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8">
          <nav className="flex items-center gap-2">
            {/* Add Previous button */}
            {currentPage > 1 && (
              <button
                onClick={() => setCurrentPage(prev => prev - 1)}
                className="px-4 py-2 rounded-md bg-white text-gray-600 hover:bg-gray-50"
              >
                Previous
              </button>
            )}

            {/* Page numbers */}
            {[...Array(totalPages)].map((_, index) => {
              // Show first page, last page, and pages around current page
              if (
                index === 0 ||
                index === totalPages - 1 ||
                (index >= currentPage - 2 && index <= currentPage)
              ) {
                return (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`px-4 py-2 rounded-md ${
                      currentPage === index + 1 
                        ? 'bg-[#4C9BF5] text-white' 
                        : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {index + 1}
                  </button>
                );
              } else if (
                index === currentPage - 3 ||
                index === currentPage + 1
              ) {
                // Show ellipsis
                return <span key={index} className="px-2">...</span>;
              }
              return null;
            })}

            {/* Add Next button */}
            {currentPage < totalPages && (
              <button
                onClick={() => setCurrentPage(prev => prev + 1)}
                className="px-4 py-2 rounded-md bg-white text-gray-600 hover:bg-gray-50"
              >
                Next
              </button>
            )}
          </nav>
        </div>

        {/* Modals */}
        <CreateProductModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingProduct(null);
          }}
          onSave={handleSaveProduct}
          categories={categories}
          units={units}
          editProduct={editingProduct}
          onAdvanceSettings={() => handleAdvanceSettings(editingProduct?.id)}
        />

        <SuccessFeedback
          isOpen={showSuccessFeedback}
          onClose={() => setShowSuccessFeedback(false)}
          action={actionType}
          productDetails={savedProductDetails}
        />
      </div>
    </div>
  );
};

export default ProductManagement;