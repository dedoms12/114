import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductSection from './product-section';
import StoreSection from './store-section';
import TopProductsSection from './top-prod-section';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const bannerSlides = [
    {
      id: 1,
      image: "/images/Client/product-page/banner1.svg",
      bgColor: "bg-[#E8F3F3]"
    },
    {
      id: 2,
      image: "/images/Client/product-page/Banner 1.2.svg",
      bgColor: "bg-[#E8F3F3]"
      
    },
    {
        id: 3,
        image: "/images/Client/product-page/Banner 1.3.svg",
        bgColor: "bg-[#E8F3F3]"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 2500);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length);
  };

  const navItems = [
    { name: 'Home', path: '/home', icon: '/images/Client/product-page/home-logo.svg' },
    { name: 'Products', path: '/products', icon: '/images/Client/product-page/client-package.svg' },
    { name: 'Stores', path: '/stores', icon: '/images/Client/product-page/client-shopping-cart.svg' },
    { name: 'Contact Us', path: '/contact', icon: '/images/Client/product-page/client-vector.svg' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <nav className="bg-[#FCFFFE] shadow-sm py-4">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Logo and Nav Items */}
            <div className="flex items-center space-x-12">
              <Link to="/" className="flex items-center space-x-2">
                <img src="/images/Client/product-page/PillLogo.svg" alt="PillPoint" className="h-12 w-12" />
                <span className="text-2xl font-semibold text-gray-800">PillPoint</span>
              </Link>
              <div className="flex items-center space-x-8">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="flex items-center space-x-1 text-gray-600 hover:text-pill-blue"
                  >
                    <img src={item.icon} alt={item.name} className="w-5 h-5" />
                    <span className="text-sm">{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Right Side - Search, Cart, User */}
            <div className="flex items-center space-x-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-64 pl-4 pr-10 py-2 rounded-full border border-gray-200 focus:outline-none focus:border-pill-blue"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2">
                  <svg 
                    className="w-5 h-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </button>
              </div>
              <div className="flex items-center space-x-4">
                <button className="relative">
                  <img src="/images/Client/product-page/client-shopping-cart.svg" alt="Cart" className="w-6 h-6" />
                  <span className="absolute -top-2 -right-2 bg-[#F1511B] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    2
                  </span>
                </button>
                <div className="flex items-center space-x-2">
                  <img src="/images/Client/product-page/client-account.svg" alt="User" className="w-6 h-6" />
                  <span className="text-sm text-gray-600">User 1</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Banner Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-3 gap-6">
          {/* Left Banner Container with Arrows */}
          <div className="col-span-2 flex items-center">
            {/* Left Arrow */}
            <button 
              onClick={prevSlide}
              className="mr-4 bg-white rounded-full p-2 shadow-lg z-10"
            >
              <img 
                src="/images/Client/product-page/client-arrow-back-ios-new.svg" 
                alt="Previous" 
                className="h-6 w-6 transform rotate-[90deg]" 
              />
            </button>

            {/* Banner */}
            <div className="relative overflow-hidden rounded-2xl flex-grow">
              <img 
                src={bannerSlides[currentSlide].image} 
                alt="Banner"
                className="w-full h-full object-cover rounded-2xl transition-opacity duration-500"
              />
            </div>

            {/* Right Arrow */}
            <button 
              onClick={nextSlide}
              className="ml-4 bg-white rounded-full p-2 shadow-lg z-10"
            >
              <img 
                src="/images/Client/product-page/client-arrow-back-ios-new.svg" 
                alt="Next" 
                className="h-6 w-6 transform rotate-[270deg]" 
              />
            </button>
          </div>

          {/* Right Side Banners */}
          <div className="space-y-4">
            <div className="rounded-2xl overflow-hidden">
              <img 
                src="/images/Client/product-page/banner2.svg"
                alt="Healthcare Banner"
                className="w-full h-[calc(50%-0.5rem)] object-cover"
              />
            </div>
            <div className="rounded-2xl overflow-hidden">
              <img 
                src="/images/Client/product-page/banner3.svg"
                alt="Products Banner"
                className="w-full h-[calc(50%-0.5rem)] object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <ProductSection />
      <StoreSection />
      <TopProductsSection />
    </div>
  );
};

export default Home;
