import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Categories = ({ onRatingFilter, selectedRating, onClearAll }) => {
  const location = useLocation();
  
  const categories = [
    { 
      name: 'General Health', 
      path: '/general-health', 
      isActive: location.pathname === '/general-health'
    },
    { 
      name: 'Medical Supplies', 
      path: '/medical-supplies', 
      isActive: location.pathname === '/medical-supplies'
    },
    { 
      name: 'Supplements', 
      path: '/supplements', 
      isActive: location.pathname === '/supplements'
    },
    { 
      name: 'Personal Care', 
      path: '/personal-care', 
      isActive: location.pathname === '/personal-care'
    },
  ];

  const ratings = [
    { stars: 5, label: "5 Stars" },
    { stars: 4, label: "4 Stars & Up" },
    { stars: 3, label: "3 Stars & Up" },
    { stars: 2, label: "2 Stars & Up" },
    { stars: 1, label: "1 Star & Up" }
  ];

  return (
    <div className="w-64 space-y-4">
      {/* Categories Card */}
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <span className="font-medium">Categories</span>
        </div>
        <div className="space-y-3">
          {categories.map(category => (
            <Link
              key={category.name}
              to={category.path}
              className={`block ${
                category.isActive ? 'text-[#4C9BF5]' : 'text-gray-600'
              } hover:text-[#4C9BF5]`}
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Rating Card */}
      {onRatingFilter && (
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            <span className="font-medium">Rating</span>
          </div>
          <div className="space-y-2">
            {ratings.map(({ stars, label }) => (
              <button
                key={stars}
                onClick={() => onRatingFilter(stars)}
                className={`w-full flex items-center justify-between py-2 px-3 rounded-md transition-colors ${
                  selectedRating === stars ? 'bg-gray-100' : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, index) => (
                      <svg
                        key={index}
                        className={`w-4 h-4 ${
                          index < stars ? 'text-[#FF8A00]' : 'text-gray-300'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">{label}</span>
                </div>
                <span className="text-xs text-gray-400">
                  {selectedRating === stars && '✓'}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Clear All Button - Only show if filters are active */}
      {(selectedRating || onClearAll) && (
        <button 
          onClick={onClearAll}
          className="w-full py-2 px-4 bg-[#4C9BF5] text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Clear All
        </button>
      )}
    </div>
  );
};

export default Categories;