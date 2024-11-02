import React from 'react';

const ProductSection = ({ handleCategoryClick }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-semibold mb-6">Shop by Category</h2>
      <div className="grid grid-cols-6 gap-4">
        <div 
          className="cursor-pointer hover:shadow-md transition-shadow rounded-lg p-4"
          onClick={() => handleCategoryClick('general-health')}
        >
          <img src="/images/Client/home-page/general-health.svg" alt="General Health" />
          <p className="text-center mt-2">General Health</p>
        </div>
        {/* Add other category items */}
      </div>
    </div>
  );
};

export default ProductSection;
