import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`}>
      <div className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow border-2">
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
          <p className="text-xs text-gray-500">Butuan City, Agusan Del Norte</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;