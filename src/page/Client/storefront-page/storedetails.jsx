import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import NavBar from '../_components/navbar';
import ProductCard from '../_components/productcard';
import Categories from '../_components/categories';
import { products as generalHealthProducts } from '../product-page/general-health/gen-products';
import { medicalProducts } from '../product-page/medical-supplies/medsup-products';
import { personalCareProducts } from '../product-page/personal-care/pc-products';
import { supplementProducts } from '../product-page/supplements/supple-products';
import { stores } from '../home-page/store';

const NAVIGATION_TABS = [
  { id: 'home', label: 'Home' },
  { id: 'all-products', label: 'All Products' },
  { id: 'general-health', label: 'General Health' },
  { id: 'medical-supplies', label: 'Medical Supplies' },
  { id: 'supplements', label: 'Supplements' },
  { id: 'personal-care', label: 'Personal Care' }
];

const CATEGORY_INFO = {
  'general-health': {
    name: 'General Health',
    description: 'Medicines & wellness products'
  },
  'medical-supplies': {
    name: 'Medical Supplies',
    description: 'Medical equipment & supplies'
  },
  'supplements': {
    name: 'Supplements',
    description: 'Vitamins & supplements'
  },
  'personal-care': {
    name: 'Personal Care',
    description: 'Personal care products'
  }
};

const StoreProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleProductClick = () => {
    const categoryPath = product.category === 'pc' ? 'personal-care' : product.category;
    navigate(`/${categoryPath}/product/${product.id}`, {
      state: { 
        from: `/store/${id}`,
        scrollPosition: window.pageYOffset 
      }
    });
  };

  return (
    <div 
      onClick={handleProductClick}
      className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="aspect-square mb-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain"
        />
      </div>
      <h3 className="text-sm font-medium mb-2 line-clamp-2">{product.name}</h3>
      <div className="flex items-center mb-2">
        <span className="text-lg font-semibold text-[#F1511B]">₱ {product.price}</span>
      </div>
      <div className="flex items-center space-x-2 mb-2">
        <div className="flex text-yellow-400">
          {[...Array(Math.floor(product.rating))].map((_, i) => (
            <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
            </svg>
          ))}
        </div>
        <span className="text-sm text-gray-500">{product.soldCount} Sold</span>
      </div>
      <p className="text-xs text-gray-500">{product.location}</p>
    </div>
  );
};

const TopProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleProductClick = () => {
    const categoryPath = product.category === 'pc' ? 'personal-care' : product.category;
    navigate(`/${categoryPath}/product/${product.id}`, {
      state: { 
        from: `/store/${id}`,
        scrollPosition: window.pageYOffset 
      }
    });
  };

  return (
    <div 
      onClick={handleProductClick}
      className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="aspect-square mb-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain"
        />
      </div>
      <h3 className="text-sm font-medium mb-2 line-clamp-2">{product.name}</h3>
      <div className="flex items-center mb-2">
        <span className="text-lg font-semibold text-[#F1511B]">₱ {product.price}</span>
      </div>
      <div className="flex items-center space-x-2 mb-2">
        <div className="flex text-yellow-400">
          {[...Array(Math.floor(product.rating))].map((_, i) => (
            <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
            </svg>
          ))}
        </div>
        <span className="text-sm text-gray-500">{product.soldCount} Sold</span>
      </div>
      <p className="text-xs text-gray-500">{product.location}</p>
    </div>
  );
};

const StoreDetails = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('home');
  const [sortBy, setSortBy] = useState('popular');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedRating, setSelectedRating] = useState(null);
  const [isPriceDropdownOpen, setIsPriceDropdownOpen] = useState(false);
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  // Combine all products and add category property
  const allProducts = {
    'general-health': generalHealthProducts,
    'medical-supplies': medicalProducts,
    'personal-care': personalCareProducts,
    'supplements': supplementProducts,
  };

  // Get products based on active tab
  const getActiveProducts = () => {
    if (activeTab === 'home' || activeTab === 'all-products') {
      return Object.values(allProducts).flat();
    }
    return allProducts[activeTab] || [];
  };

  // Top products section - get top rated products across all categories
  const topProducts = Object.entries(allProducts)
    .flatMap(([category, products]) => 
      products.map(product => ({
        ...product,
        category: category === 'personal-care' ? 'pc' : category
      }))
    )
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);

  const handleSort = (type) => {
    setSortBy(type);
    setIsPriceDropdownOpen(false);
  };

  const handleRatingFilter = (rating) => {
    setSelectedRating(rating === selectedRating ? null : rating);
  };

  // Store banner slider
  const storeBanners = stores.find(store => store.id === parseInt(id))?.banners.map((banner, index) => ({
    id: index + 1,
    image: banner
  })) || [];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % storeBanners.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const renderStoreHeader = () => {
    const currentStore = stores.find(s => s.id === parseInt(id));
    
    return (
      <div className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 rounded-full overflow-hidden border border-gray-200">
              <img 
                src={currentStore?.logo} 
                alt={currentStore?.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-xl font-semibold">{currentStore?.name}</h1>
              <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                <span>Products: {currentStore?.productCount}</span>
                <span>Followers: {currentStore?.followers}</span>
                <div className="flex items-center gap-1">
                  <span>Rating: {currentStore?.rating}</span>
                  <span className="text-xs">({currentStore?.ratingCount} Rating)</span>
                </div>
                <span>Joined: {currentStore?.memberSince}</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <button className="px-6 py-1.5 bg-pill-blue text-white rounded-sm hover:bg-blue-600">
                  Follow
                </button>
                <button className="px-6 py-1.5 border border-gray-300 rounded-sm hover:bg-gray-50">
                  Chat
                </button>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-8 border-b">
            {NAVIGATION_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-4 px-1 ${
                  activeTab === tab.id
                    ? 'border-b-2 border-pill-blue text-pill-blue'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const getCurrentProducts = () => {
    const filteredProducts = getActiveProducts()
      .filter(product => !selectedRating || product.rating === selectedRating);
    
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    return filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      {renderStoreHeader()}
      
      {/* Only show banner and top products on home tab */}
      {activeTab === 'home' && (
        <>
          {/* Banner Slider */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="relative h-[400px] rounded-2xl overflow-hidden">
              <img 
                src={storeBanners[currentSlide].image}
                alt="Store Banner"
                className="w-full h-full object-cover transition-opacity duration-500"
              />
            </div>
          </div>

          {/* Top Products Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-6">Top Products</h2>
              <div className="grid grid-cols-6 gap-4">
                {topProducts.map(product => (
                  <TopProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Products Grid Section - Show for all tabs except home */}
      {activeTab !== 'home' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-8">
            <Categories 
              onRatingFilter={handleRatingFilter}
              selectedRating={selectedRating}
              onClearAll={() => setSelectedRating(null)}
              onCategoryClick={(category) => {
                setActiveTab(category);
                setCurrentPage(1);
              }}
              activeCategory={activeTab}
              isStorePage={true}
            />
            
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold">
                    {activeTab === 'all-products' ? 'All Products' : CATEGORY_INFO[activeTab]?.name}
                  </h2>
                  {activeTab !== 'all-products' && CATEGORY_INFO[activeTab] && (
                    <p className="text-sm text-gray-600 mt-1">
                      {CATEGORY_INFO[activeTab].description}
                    </p>
                  )}
                </div>
                {/* Sort controls here */}
              </div>

              <div className="grid grid-cols-4 gap-4">
                {getCurrentProducts()
                  .sort((a, b) => {
                    switch(sortBy) {
                      case 'latest': return b.id - a.id;
                      case 'price-high': return b.price - a.price;
                      case 'price-low': return a.price - b.price;
                      case 'popular':
                      default: return b.rating - a.rating;
                    }
                  })
                  .map(product => (
                    <StoreProductCard key={product.id} product={product} />
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoreDetails;
