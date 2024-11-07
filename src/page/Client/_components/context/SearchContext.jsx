import React, { createContext, useContext, useState } from 'react';
import { products } from '../../product-page/general-health/gen-products';
import { supplementProducts } from '../../product-page/supplements/supple-products';
import { medicalProducts } from '../../product-page/medical-supplies/medsup-products';
import { personalCareProducts } from '../../product-page/personal-care/pc-products';

const SearchContext = createContext();

export const useSearch = () => useContext(SearchContext);

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState({});

  const performSearch = (query) => {
    if (!query.trim()) {
      setIsSearching(false);
      setSearchResults({});
      return;
    }

    const searchTerm = query.toLowerCase();
    const results = {
      'general-health': searchInCategory(products, searchTerm),
      'supplements': searchInCategory(supplementProducts, searchTerm),
      'medical-supplies': searchInCategory(medicalProducts, searchTerm),
      'personal-care': searchInCategory(personalCareProducts, searchTerm)
    };

    setSearchResults(results);
    setIsSearching(true);
    setSearchQuery(query);
  };

  const searchInCategory = (products, searchTerm) => {
    return products.filter(product => {
      const searchFields = [
        product.name.toLowerCase(),
        product.description.main.toLowerCase(),
        product.description.subText.toLowerCase(),
        ...product.description.features.map(f => f.toLowerCase()),
        ...product.description.specifications.map(s => s.toLowerCase())
      ];
      
      return searchFields.some(field => field.includes(searchTerm));
    });
  };

  const clearSearch = () => {
    setSearchQuery('');
    setIsSearching(false);
    setSearchResults({});
  };

  return (
    <SearchContext.Provider value={{ 
      searchQuery,
      isSearching,
      searchResults,
      performSearch,
      clearSearch
    }}>
      {children}
    </SearchContext.Provider>
  );
}; 