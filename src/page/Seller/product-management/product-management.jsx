import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarSeller from '../components/navbarSeller';
import { FiSearch, FiFilter, FiGrid, FiList } from 'react-icons/fi';
import { categories, units, addProduct, getUniqueLocations } from './product-data';
import CreateProductModal from '../components/CreateProductModal';
import SuccessFeedback from '../components/SuccessFeedback';

const ProductManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [selectedCategory, setSelectedCategory] = useState('medical-supplies');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState('grid');
  const productsPerPage = 10;
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

  const handleSaveProduct = (productData) => {
    if (editingProduct) {
      // Update existing product
      const category = categories.find(cat => cat.value === productData.category.toLowerCase());
      if (category) {
        const index = category.products.findIndex(p => p.id === editingProduct.id);
        if (index !== -1) {
          category.products[index] = { ...productData, id: editingProduct.id };
        }
      }
      setActionType('edit');
    } else {
      // Add new product
      addProduct(productData);
      setActionType('add');
    }
    
    setIsModalOpen(false);
    setSavedProductDetails(productData);
    setShowSuccessFeedback(true);
    setEditingProduct(null);
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
    <div className="bg-gray-100 min-h-screen">
      <NavbarSeller />
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Product Management</h1>
            <p className="text-sm text-gray-500">See All</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-[#4C9BF5] text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            + Create New Product
          </button>
        </div>

        <div className="bg-white rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border rounded-md w-64"
                />
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
              
              <div className="flex items-center gap-2">
                <FiFilter className="text-gray-400" />
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="border rounded-md p-2"
                >
                  {locations.map((location, index) => (
                    <option key={index} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">Grouped By:</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border rounded-md p-2"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.value}>{category.name}</option>
                ))}
              </select>
              
              <div className="flex gap-2 border rounded-md p-1">
                <button
                  onClick={() => handleViewChange('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-50 text-[#4C9BF5]' : 'text-gray-400'}`}
                >
                  <FiGrid />
                </button>
                <button
                  onClick={() => handleViewChange('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-50 text-[#4C9BF5]' : 'text-gray-400'}`}
                >
                  <FiList />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Category Section */}
        <div className="bg-white rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-xl font-semibold">{currentCategory?.name}</span>
              <span className="text-sm text-gray-500">
                {currentCategory?.products.length} Products | {filteredProducts.length} Items
              </span>
            </div>
            <button className="text-gray-400">
              <FiFilter />
            </button>
          </div>
        </div>

        {/* Products Grid/List */}
        <div className={`grid ${viewMode === 'grid' ? 'grid-cols-5 gap-4' : 'gap-4'}`}>
          {currentProducts.map(product => (
            <div 
              key={product.id} 
              className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 ${viewMode === 'list' ? 'flex items-center' : ''}`}
              onClick={() => handleProductClick(product.id)}
              style={{ cursor: 'pointer' }}
            >
              <div className={`${viewMode === 'list' ? 'w-1/4' : 'aspect-square mb-4'}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className={`${viewMode === 'list' ? 'w-3/4 pl-4' : ''}`}>
                <h3 className="text-sm font-medium mb-2 line-clamp-2">{product.name}</h3>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-semibold text-[#F1511B]">₱{product.price}</span>
                  <span className="text-sm text-gray-500">{product.soldCount} Sold</span>
                </div>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`text-sm ${i < product.rating ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mb-4">{product.location}</p>
                <div className="flex gap-2">
                  <button className="flex-1 bg-[#4C9BF5] text-white px-3 py-1.5 rounded hover:bg-blue-600" onClick={() => handleEdit(product)}>
                    Edit
                  </button>
                  <button className="flex-1 border border-red-500 text-red-500 px-3 py-1.5 rounded hover:bg-red-50">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6 gap-2">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === index + 1 
                  ? 'bg-[#4C9BF5] text-white' 
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>

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