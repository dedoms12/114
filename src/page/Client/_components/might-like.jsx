import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { products } from '../product-page/general-health/gen-products';
import { medicalProducts } from '../product-page/medical-supplies/medsup-products';
import { personalCareProducts } from '../product-page/personal-care/pc-products';
import { supplementProducts } from '../product-page/supplements/supple-products';

const YouMightLike = ({ vertical = false }) => {
  const navigate = useNavigate();
  const allProducts = [
    ...products,
    ...medicalProducts,
    ...personalCareProducts,
    ...supplementProducts
  ];

  const getRandomProducts = (count) => {
    const shuffled = [...allProducts].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, vertical ? 4 : 8);
  };

  const randomProducts = getRandomProducts(vertical ? 4 : 8);

  const handleProductClick = (product) => {
    navigate(`/${product.category}/product/${product.id}`, {
      state: { 
        from: window.location.pathname,
        scrollPosition: window.pageYOffset 
      }
    });
  };

  if (vertical) {
    return (
      <div className="space-y-4">
        {randomProducts.map((product) => (
          <div 
            key={product.id} 
            onClick={() => handleProductClick(product)}
            className="block bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex gap-4">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-24 h-24 object-contain"
              />
              <div className="flex-1">
                <h3 className="text-sm text-gray-800 mb-2 line-clamp-2">
                  {product.name}
                </h3>
                <div className="space-y-1">
                  <div className="flex items-center">
                    <span className="text-yellow-900 font-medium">₱</span>
                    <span className="text-yellow-900 font-medium ml-1">{product.price}</span>
                  </div>
                  <div className="flex items-center gap-1">
                  </div>
                  <p className="text-xs text-gray-500">{product.location}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-6">
        <div className="flex gap-8">
          <div className="w-64"></div>
          <div className="flex-1">
            <h2 className="text-xl font-medium text-gray-800 mb-6">You Might Like</h2>
            <div className="grid grid-cols-4 gap-4">
              {randomProducts.map((product) => (
                <div 
                  key={product.id} 
                  onClick={() => handleProductClick(product)}
                  className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="mb-3">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-40 object-contain"
                    />
                  </div>
                  <h3 className="text-sm text-gray-800 mb-2 line-clamp-2 min-h-[40px]">
                    {product.name}
                  </h3>
                  <div className="space-y-1">
                    <div className="flex items-center">
                      <span className="text-yellow-900 font-medium">₱</span>
                      <span className="text-yellow-900 font-medium ml-1">{product.price}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="flex">
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">{product.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YouMightLike;