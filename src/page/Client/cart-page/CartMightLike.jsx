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
            <div className="text-yellow-900 font-medium">₱ {product.price}</div>
            <div className="flex items-center justify-between mt-1">
              <div className="flex items-center">
                <div className="flex">
                </div>
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