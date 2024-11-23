import React from 'react';
import { useNavigate } from 'react-router-dom';
import { products } from '../product-page/general-health/gen-products';
import { medicalProducts } from '../product-page/medical-supplies/medsup-products';
import { personalCareProducts } from '../product-page/personal-care/pc-products';
import { supplementProducts } from '../product-page/supplements/supple-products';

const CartMightLike = () => {
  const navigate = useNavigate();
  const allProducts = [
    ...products.map(p => ({ ...p, source: 'general' })),
    ...medicalProducts.map(p => ({ ...p, source: 'medical' })),
    ...personalCareProducts.map(p => ({ ...p, source: 'personal' })),
    ...supplementProducts.map(p => ({ ...p, source: 'supplement' }))
  ];

  const getRandomProducts = () => {
    const shuffled = [...allProducts].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 10);
  };

  const randomProducts = getRandomProducts();

  const handleProductClick = (product) => {
    navigate(`/${product.category}/product/${product.id}`, {
      state: { 
        from: '/cart',
        scrollPosition: window.pageYOffset 
      }
    });
  };

  return (
    <div className="grid grid-cols-5 gap-4">
      {randomProducts.map((product) => (
        <div 
          key={`${product.source}-${product.id}`}
          onClick={() => handleProductClick(product)}
          className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
        >
          <div className="mb-3">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-32 object-contain"
            />
          </div>
          <h3 className="text-sm text-gray-800 mb-2 line-clamp-2 min-h-[40px]">
            {product.name}
          </h3>
          <div className="mt-2">
            <div className="text-[#F1511B] font-medium">₱ {product.price}</div>
            <div className="flex items-center justify-between mt-1">
              <div className="flex items-center">
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
                <span className="text-xs text-gray-500 ml-1">{product.soldCount} Sold</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">{product.location}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartMightLike; 