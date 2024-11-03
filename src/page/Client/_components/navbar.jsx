import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from './context/CartContext';
import { FiSearch } from 'react-icons/fi';

const NavBar = () => {
  const { cartItems } = useCart();
  const navigate = useNavigate();
  
  const navItems = [
    { name: 'Home', path: '/home', icon: '/images/Client/product-page/home-logo.svg' },
    { name: 'Products', path: '/general-health', icon: '/images/Client/product-page/client-package.svg' },
    { name: 'Stores', path: '/stores', icon: '/images/Client/product-page/client-shopping-cart.svg' },
    { name: 'Contact Us', path: '/contact', icon: '/images/Client/product-page/client-vector.svg' },
  ];

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

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
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <FiSearch className="w-5 h-5" />
              </button>
            </div>

            {/* Cart with Counter */}
            <Link to="/cart" className="relative">
              <img 
                src="/images/Client/product-page/client-shopping-cart.svg" 
                alt="Cart" 
                className="w-6 h-6"
              />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#F1511B] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>

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
    </nav>
  );
};

export default NavBar;