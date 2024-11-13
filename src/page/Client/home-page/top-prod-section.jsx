import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { medicalProducts } from '../product-page/medical-supplies/medsup-products';
import { products as generalHealthProducts } from '../product-page/general-health/gen-products';
import { personalCareProducts } from '../product-page/personal-care/pc-products';
import { supplementProducts } from '../product-page/supplements/supple-products';

const TopProductsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sortBy, setSortBy] = useState('');

  // Combine and select top products from all categories
  const getAllTopProducts = () => {
    const allProducts = [
      ...medicalProducts.map(p => ({ ...p, category: 'medical-supplies' })),
      ...generalHealthProducts.map(p => ({ ...p, category: 'general-health' })),
      ...personalCareProducts.map(p => ({ ...p, category: 'personal-care' })),
      ...supplementProducts.map(p => ({ ...p, category: 'supplements' }))
    ];

    // Sort by rating and sold count to get top products
    return allProducts
      .sort((a, b) => {
        const scoreA = a.rating * a.soldCount;
        const scoreB = b.rating * b.soldCount;
        return scoreB - scoreA;
      })
      .slice(0, 10); // Get top 10 products
  };

  const [topProducts, setTopProducts] = useState(getAllTopProducts());
  const [originalTopProducts] = useState([...topProducts]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(topProducts.length / 5));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(topProducts.length / 5)) % Math.ceil(topProducts.length / 5));
  };

  const handleSort = (type) => {
    if (sortBy === type) {
      setSortBy('');
      setTopProducts(originalTopProducts);
      return;
    }

    setSortBy(type);
    let sorted = [...topProducts];
    
    switch(type) {
      case 'latest':
        sorted = sorted.sort((a, b) => b.id - a.id);
        break;
      case 'top-sales':
        sorted = sorted.sort((a, b) => b.soldCount - a.soldCount);
        break;
      case 'popular':
        sorted = sorted.sort((a, b) => (b.rating * b.soldCount) - (a.rating * a.soldCount));
        break;
      default:
        break;
    }
    setTopProducts(sorted);
  };

  const ProductCard = ({ product }) => (
    <Link 
      to={`/${product.category}/product/${product.id}`}
      state={{ from: '/' }}
    >
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
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
            {[...Array(product.rating)].map((_, i) => (
              <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
            ))}
          </div>
          <span className="text-sm text-gray-500">{product.soldCount} Sold</span>
        </div>
        <p className="text-xs text-gray-500">{product.location}</p>
      </div>
    </Link>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Top Products</h2>
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
        </div>
      </div>
      
      <div className="relative">
        <button 
          onClick={prevSlide}
          className="absolute -left-12 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50"
        >
          <img 
            src="/images/Client/product-page/client-arrow-back-ios-new.svg" 
            alt="Previous"
            className="h-6 w-6 transform rotate-[90deg]"
          />
        </button>

        <div className="grid grid-cols-5 gap-4">
          {topProducts
            .slice(currentSlide * 5, (currentSlide + 1) * 5)
            .map(product => (
              <ProductCard key={`${product.category}-${product.id}`} product={product} />
            ))}
        </div>

        <button 
          onClick={nextSlide}
          className="absolute -right-12 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50"
        >
          <img 
            src="/images/Client/product-page/client-arrow-back-ios-new.svg" 
            alt="Next"
            className="h-6 w-6 transform rotate-[270deg]"
          />
        </button>
      </div>
    </div>
  );
};

export default TopProductsSection;
