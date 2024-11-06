import React from 'react';
import { Link } from 'react-router-dom';
import { useSearch } from './context/SearchContext';

const SearchResults = ({ category }) => {
  const { searchResults, isSearching, searchQuery, clearSearch } = useSearch();

  if (!isSearching) return null;

  const results = searchResults[category] || [];

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">
          Search Results for "{searchQuery}" in {category}
        </h2>
        <button 
          onClick={clearSearch}
          className="text-blue-500 hover:text-blue-600 text-sm"
        >
          Clear Search
        </button>
      </div>

      {results.length === 0 ? (
        <p className="text-gray-500">No products found in this category</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {results.map((product) => (
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
              <h3 className="font-medium text-gray-800 mb-2">{product.name}</h3>
              <p className="text-gray-600">₱{product.price}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults; 