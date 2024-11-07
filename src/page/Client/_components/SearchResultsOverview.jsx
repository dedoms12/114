import React from 'react';
import { Link } from 'react-router-dom';
import { useSearch } from './context/SearchContext';

const SearchResultsOverview = () => {
  const { searchResults, searchQuery, clearSearch } = useSearch();
  const categories = {
    'general-health': 'General Health',
    'supplements': 'Supplements',
    'medical-supplies': 'Medical Supplies',
    'personal-care': 'Personal Care'
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">
          Search Results for "{searchQuery}"
        </h2>
        <button 
          onClick={clearSearch}
          className="text-blue-500 hover:text-blue-600"
        >
          Clear Search
        </button>
      </div>

      {Object.entries(searchResults).map(([category, products]) => (
        <div key={category} className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">{categories[category]}</h3>
            <Link 
              to={`/${category}`} 
              className="text-blue-500 hover:text-blue-600 text-sm"
            >
              View All ({products.length})
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {products.slice(0, 4).map(product => (
              <Link
                key={product.id}
                to={`/${category}/product/${product.id}`}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4"
              >
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-48 object-contain mb-4"
                />
                <h4 className="font-medium text-gray-800 mb-2">{product.name}</h4>
                <p className="text-gray-600">₱{product.price}</p>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResultsOverview; 