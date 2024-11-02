import React from 'react';
import { FaHeartbeat, FaFirstAid, FaVials, FaSprayCan } from 'react-icons/fa';

const ProductSection = ({ handleCategoryClick }) => {
  const categories = [
    {
      id: 1,
      name: 'General Health',
      path: 'general-health',
      icon: FaHeartbeat,
      description: 'Medicines & wellness products'
    },
    {
      id: 2,
      name: 'Medical Supplies',
      path: 'medical-supplies',
      icon: FaFirstAid,
      description: 'Medical equipment & supplies'
    },
    {
      id: 3,
      name: 'Supplements',
      path: 'supplements',
      icon: FaVials,
      description: 'Vitamins & supplements'
    },
    {
      id: 4,
      name: 'Personal Care',
      path: 'personal-care',
      icon: FaSprayCan,
      description: 'Personal care products'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-semibold mb-6">Shop by Category</h2>
      <div className="grid grid-cols-4 gap-6">
        {categories.map((category) => {
          const IconComponent = category.icon;
          return (
            <div
              key={category.id}
              className="bg-white cursor-pointer hover:shadow-md transition-all duration-300 rounded-lg p-6 flex flex-col items-center text-center"
              onClick={() => handleCategoryClick(category.path)}
            >
              <div className="w-24 h-24 mb-4 flex items-center justify-center text-[#4C9BF5]">
                <IconComponent size={64} />
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
