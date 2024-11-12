import { useState, useEffect } from 'react';
import { getProductsByCategory } from '../services/productService';

export const useProducts = (category) => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const [selectedRating, setSelectedRating] = useState(null);
  const [isPriceDropdownOpen, setIsPriceDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  useEffect(() => {
    const loadProducts = () => {
      const products = getProductsByCategory(category);
      setFilteredProducts(products);
    };

    loadProducts();
    window.addEventListener('storage', loadProducts);
    
    return () => {
      window.removeEventListener('storage', loadProducts);
    };
  }, [category]);

  const handleSort = (type) => {
    if (sortBy === type) {
      setSortBy('');
      const products = getProductsByCategory(category);
      setFilteredProducts(products);
      return;
    }

    setSortBy(type);
    let sorted = [...filteredProducts];
    
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
        sorted = getProductsByCategory(category);
    }
    
    setFilteredProducts(sorted);
    setIsPriceDropdownOpen(false);
  };

  const handleRatingFilter = (rating) => {
    if (selectedRating === rating) {
      setSelectedRating(null);
      const products = getProductsByCategory(category);
      setFilteredProducts(products);
      return;
    }
    
    setSelectedRating(rating);
    const products = getProductsByCategory(category);
    const filtered = products.filter(product => product.rating === rating);
    setFilteredProducts(filtered);
  };

  const handleClearAll = () => {
    setSelectedRating(null);
    setSortBy('');
    const products = getProductsByCategory(category);
    setFilteredProducts(products);
  };

  return {
    filteredProducts,
    sortBy,
    selectedRating,
    isPriceDropdownOpen,
    currentPage,
    productsPerPage,
    setIsPriceDropdownOpen,
    setCurrentPage,
    handleSort,
    handleRatingFilter,
    handleClearAll
  };
}; 