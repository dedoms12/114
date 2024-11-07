import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSearch } from '../../_components/context/SearchContext';
import NavBar from '../../_components/navbar';
import ProductCard from '../../_components/productcard';
import Categories from '../../_components/categories';
import YouMightLike from '../../_components/might-like';

const SearchResults = () => {
  const navigate = useNavigate();
  const { searchResults, searchQuery, clearSearch } = useSearch();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRating, setSelectedRating] = useState(null);
  const [sortBy, setSortBy] = useState('');
  const [isPriceDropdownOpen, setIsPriceDropdownOpen] = useState(false);
  const productsPerPage = 12;

  // Flatten all results into a single array
  const allResults = Object.values(searchResults).flat();
  
  // Apply filters and sorting
  let filteredResults = [...allResults];
  
  if (selectedRating) {
    filteredResults = filteredResults.filter(product => product.rating === selectedRating);
  }

  // Apply sorting
  switch(sortBy) {
    case 'latest':
      filteredResults.sort((a, b) => b.id - a.id);
      break;
    case 'top-sales':
      filteredResults.sort((a, b) => b.soldCount - a.soldCount);
      break;
    case 'price-high':
      filteredResults.sort((a, b) => b.price - a.price);
      break;
    case 'price-low':
      filteredResults.sort((a, b) => a.price - b.price);
      break;
    case 'popular':
      filteredResults.sort((a, b) => b.rating - a.rating);
      break;
  }

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredResults.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredResults.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSort = (type) => {
    if (sortBy === type) {
      setSortBy('');
      return;
    }
    setSortBy(type);
    setIsPriceDropdownOpen(false);
  };

  const handleRatingFilter = (rating) => {
    setSelectedRating(rating === selectedRating ? null : rating);
  };

  const handleClearAll = () => {
    setSelectedRating(null);
    setSortBy('');
  };

  const handleProductClick = (product) => {
    navigate(`/${product.category}/product/${product.id}`, {
      state: { 
        from: '/search-results',
        scrollPosition: window.pageYOffset 
      }
    });
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

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">
            Search Results for "{searchQuery}"
          </h1>
          <button 
            onClick={clearSearch}
            className="text-blue-500 hover:text-blue-600"
          >
            Clear Search
          </button>
        </div>

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
                  onClick={() => handleProductClick(product)}
                  className="cursor-pointer"
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
            
            {filteredResults.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No products found matching your search.</p>
              </div>
            )}
            
            {filteredResults.length > 0 && <Pagination />}
          </div>
        </div>
      </div>
      <YouMightLike />
    </div>
  );
};

export default SearchResults; 