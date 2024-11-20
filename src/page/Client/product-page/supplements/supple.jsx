import React, { useState, useEffect } from 'react';
import NavBar from '../../_components/navbar';
import ProductCard from '../../_components/productcard';
import { supplementProducts } from './supple-products';
import Categories from '../../_components/categories';
import YouMightLike from '../../_components/might-like';
import { useNavigate, useLocation } from 'react-router-dom';

const Supplements = () => {
  const [sortBy, setSortBy] = useState('');
  const [selectedRating, setSelectedRating] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState(supplementProducts);
  const [isPriceDropdownOpen, setIsPriceDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
  const navigate = useNavigate();
  const location = useLocation();

  // Copy pagination logic from gen-health.jsx
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Copy sorting and filtering functions from gen-health.jsx
  // Reference lines from gen-health.jsx:
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSort = (type) => {
    if (sortBy === type) {
      setSortBy('');
      setFilteredProducts(supplementProducts);
      return;
    }

    setSortBy(type);
    let sorted = [...supplementProducts];
    
    switch(type) {
      case 'latest':
        sorted = sorted.sort((a, b) => b.id - a.id);
        break;
      case 'top-sales':
        sorted = sorted.sort((a, b) => b.soldCount - a.soldCount);
        break;
      case 'price-high':
        sorted = sorted.sort((a, b) => b.price - a.price);
        break;
      case 'price-low':
        sorted = sorted.sort((a, b) => a.price - b.price);
        break;
      case 'popular':
        sorted = sorted.sort((a, b) => b.rating - a.rating);
        break;
      default:
        sorted = supplementProducts;
    }
    
    setFilteredProducts(sorted);
    setIsPriceDropdownOpen(false);
  };
  const handleRatingFilter = (rating) => {
    if (selectedRating === rating) {
      setSelectedRating(null);
      setFilteredProducts(supplementProducts);
      return;
    }
    
    setSelectedRating(rating);
    const filtered = supplementProducts.filter(product => product.rating === rating);
    setFilteredProducts(filtered);
  };

  const handleClearAll = () => {
    setSelectedRating(null);
    setSortBy('');
    setFilteredProducts(supplementProducts);
  };

  const Pagination = () => {
    return (
      <div className="flex justify-center mt-8 gap-2">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 rounded-md ${
              currentPage === index + 1
                ? 'bg-[#4C9BF5] text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    );
  };

  useEffect(() => {
    // Restore scroll position when returning from product detail
    if (location.state?.scrollPosition) {
      window.scrollTo(0, location.state.scrollPosition);
    }
  }, [location.state]);

  const handleProductClick = (productId) => {
    const categoryPath = location.pathname;
    navigate(`${categoryPath}/product/${productId}`, {
      state: { 
        from: categoryPath,
        scrollPosition: window.pageYOffset 
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="container mx-auto px-6 py-8">
        <div className="flex gap-8">
          <Categories 
            onRatingFilter={handleRatingFilter}
            selectedRating={selectedRating}
            onClearAll={handleClearAll}
          />
          
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-gray-600 text-sm">Sort By</span>
              <div className="flex gap-2">
                <button
                  className={`px-4 py-1.5 rounded-md text-sm ${
                    sortBy === 'popular' ? 'bg-[#4C9BF5] text-white' : 'bg-white'
                  }`}
                  onClick={() => handleSort('popular')}
                >
                  Popular
                </button>
                <button
                  className={`px-4 py-1.5 rounded-md text-sm ${
                    sortBy === 'latest' ? 'bg-[#4C9BF5] text-white' : 'bg-white'
                  }`}
                  onClick={() => handleSort('latest')}
                >
                  Latest
                </button>
                <button
                  className={`px-4 py-1.5 rounded-md text-sm ${
                    sortBy === 'top-sales' ? 'bg-[#4C9BF5] text-white' : 'bg-white'
                  }`}
                  onClick={() => handleSort('top-sales')}
                >
                  Top Sales
                </button>
                
                <div className="relative">
                  <button
                    className={`px-4 py-1.5 rounded-md text-sm ${
                      sortBy.includes('price') ? 'bg-[#4C9BF5] text-white' : 'bg-white'
                    }`}
                    onClick={() => setIsPriceDropdownOpen(!isPriceDropdownOpen)}
                  >
                    Price
                    <svg 
                      className="w-4 h-4 ml-1 inline-block" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {isPriceDropdownOpen && (
                    <div className="absolute top-full left-0 mt-1 w-40 bg-white shadow-lg rounded-md overflow-hidden z-20">
                      <button
                        className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50"
                        onClick={() => handleSort('price-high')}
                      >
                        High to Low
                      </button>
                      <button
                        className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50"
                        onClick={() => handleSort('price-low')}
                      >
                        Low to High
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              {currentProducts.map(product => (
                <div 
                  key={product.id} 
                  onClick={() => handleProductClick(product.id)}
                  className="cursor-pointer"
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
            
            <Pagination />
          </div>
        </div>
      </div>
      <YouMightLike />
    </div>
  );
};

export default Supplements;

