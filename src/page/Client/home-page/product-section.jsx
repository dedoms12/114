import React from 'react';
import { FaShoePrints, FaMale, FaFemale } from 'react-icons/fa';

const ProductSection = ({ handleCategoryClick }) => {
  const categories = [
    {
      id: 1,
      name: 'Mens Wear',
      path: 'menswear',
      icon: 'images/Client/product-page/Menswear/tshirt1.jpg', 
      description: ''
    },
    {
      id: 2,
      name: 'Womens Wear',
      path: 'womenswear',
      icon: 'images/Client/product-page/Womenswear/dress2.jpg', 
      description: ''
    },
    {
      id: 3,
      name: 'Kids Wear',
      path: 'kidswear',
      icon: 'images/Client/product-page/Kidswear/kids11.jpg',  // Image path
      description: ''
    },
    {
      id: 4,
      name: 'Shoes',
      path: 'shoes',
      icon: 'images/Client/product-page/Shoes/shoes4.jpg', 
      description: ''
    }
  ];

  return (
    <div className=" border-2 rounded-lg max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-semibold mb-6">Categories</h2>
      <div className="grid grid-cols-4 gap-6">
        {categories.map((category) => {
          return (
            <div
              key={category.id}
              className="bg-white cursor-pointer hover:shadow-[0_4px_6px_rgba(0,0,0,0.3)] transition-all duration-300 rounded-lg p-6 flex flex-col items-center text-center"
              onClick={() => handleCategoryClick(category.path)}
            >
              <div className="w-24 h-24 mb-4 flex items-center justify-center text-[#4C9BF5]">
                {/* Conditionally render image or icon */}
                {typeof category.icon === 'string' ? (
                  <img src={category.icon} alt={category.name} className=" w-20 h-30 object-contain rounded-lg" />
                ) : (
                  <category.icon size={64} />
                )}
              </div>
              <h3 className="font-medium text-lg mb-2">{category.name}</h3>
              <p className="text-sm text-gray-500">{category.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductSection;
