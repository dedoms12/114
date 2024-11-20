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
                    <span className="text-[#F1511B] font-medium">₱</span>
                    <span className="text-[#F1511B] font-medium ml-1">{product.price}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-3 h-3 ${i < product.rating ? 'text-[#FF8A00]' : 'text-gray-300'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">{product.soldCount} Sold</span>
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
                      <span className="text-[#F1511B] font-medium">₱</span>
                      <span className="text-[#F1511B] font-medium ml-1">{product.price}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-3 h-3 ${i < product.rating ? 'text-[#FF8A00]' : 'text-gray-300'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">{product.soldCount} Sold</span>
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