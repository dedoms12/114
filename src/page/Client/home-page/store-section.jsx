import React, { useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getTopStores } from './store';

const StoreSection = () => {
  const topStores = getTopStores();
  const carouselRef = useRef(null);

  // Continuous scrolling effect
  useEffect(() => {
    const carousel = carouselRef.current;

    let animationFrame;
    const scroll = () => {
      if (carousel) {
        carousel.scrollLeft += 1; // Adjust speed by increasing this value
        if (carousel.scrollLeft >= carousel.scrollWidth - carousel.offsetWidth) {
          carousel.scrollLeft = 0; // Reset to the start
        }
      }
      animationFrame = requestAnimationFrame(scroll);
    };

    animationFrame = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrame); // Cleanup on unmount
  }, []);

  const StoreCard = ({ store }) => {
    const navigate = useNavigate();
  
    const handleVisitStore = () => {
      navigate(`/store/${store.id}`);
    };
  
    return (
      <div
        onClick={handleVisitStore}
        className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 w-[200px] mx-2 hover:shadow-md transition-shadow cursor-pointer"
      >
        <div className="flex flex-col items-center">
          <img
            src={store.logo}
            alt={store.name}
            className="w-10 h-10 object-contain mb-3"
          />
          <h3 className="text-sm font-medium text-center mb-2">{store.name}</h3>
          <button
            className="text-[#F1511B] text-sm font-medium hover:underline"
          >
            Visit Store
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-semibold">Top Stores</h2>
      <button className="text-sm text-gray-600 hover:text-yellow-300 flex items-center">
                See All
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
      </div>
      <div
        ref={carouselRef}
        className="flex items-center overflow-x-hidden whitespace-nowrap"
      >
        {topStores.concat(topStores).map((store, index) => (
          <StoreCard key={index} store={store} />
        ))}
      </div>
    </div>
  );
};

export default StoreSection;
