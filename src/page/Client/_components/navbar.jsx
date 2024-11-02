import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const navItems = [
    { name: 'Home', path: '/home', icon: '/images/Client/product-page/home-logo.svg' },
    { name: 'Products', path: '/general-health', icon: '/images/Client/product-page/client-package.svg' },
    { name: 'Stores', path: '/stores', icon: '/images/Client/product-page/client-shopping-cart.svg' },
    { name: 'Contact Us', path: '/contact', icon: '/images/Client/product-page/client-vector.svg' },
  ];

  return (
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

          {/* Right Side - Search, Language, Cart, User */}
          <div className="flex items-center space-x-6">
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="w-64 pl-4 pr-10 py-2 rounded-full border border-gray-200 focus:outline-none focus:border-pill-blue"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2">
                <svg 
                  className="w-5 h-5 text-gray-400" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-6">
              {/* Language Selector */}
              <div className="flex items-center space-x-2 cursor-pointer group relative">
                <svg 
                  className="w-5 h-5 text-gray-600" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                  />
                </svg>
                <span className="text-sm text-gray-600">English</span>
                <svg 
                  className="w-4 h-4 text-gray-600" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
                {/* Language Dropdown */}
                <div className="hidden group-hover:block absolute top-full right-0 mt-1 bg-white rounded-md shadow-lg py-1 w-32 z-50">
                  <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    English
                  </button>
                  <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Filipino
                  </button>
                </div>
              </div>

              {/* Cart */}
              <button className="relative">
                <img 
                  src="/images/Client/product-page/client-shopping-cart.svg" 
                  alt="Cart" 
                  className="w-6 h-6"
                />
                <span className="absolute -top-2 -right-2 bg-[#F1511B] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  2
                </span>
              </button>

              {/* User Profile */}
              <div className="flex items-center space-x-2">
                <img 
                  src="/images/Client/product-page/client-account.svg" 
                  alt="User" 
                  className="w-6 h-6"
                />
                <span className="text-sm text-gray-600">User 1</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;