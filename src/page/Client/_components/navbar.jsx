import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from './context/CartContext';
import { FiSearch } from 'react-icons/fi';
import { useOrders } from './context/OrderContext';
import ChatbotButton from './ChatbotButton';
import ChatbotModal from '../chatbot-page/chatbot-modal';
import { useSearch } from './context/SearchContext';
import { performGlobalSearch } from './context/SearchContext';

const NavBar = () => {
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useOrders();
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const { performSearch } = useSearch();
  const [searchInput, setSearchInput] = useState('');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const searchRef = useRef(null);

  const navItems = [
    {
      name: 'Home',
      path: '/home',
      icon: '/images/Client/product-page/image.png'
    },
    { name: 'Products', path: '/menswear', icon: '/images/Client/product-page/box.png' },
    { name: 'Stores', path: '/stores', icon: '/images/Client/product-page/store.png' },
  ];

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleSearchInput = (e) => {
    const query = e.target.value;
    setSearchInput(query);

    if (query.length >= 2) {
      const productResults = performSearch(query);
      const globalResults = performGlobalSearch(query);
      setSearchResults({
        ...productResults,
        pages: globalResults.pages
      });
      setShowSearchResults(true);
    } else {
      setShowSearchResults(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      const globalResults = performGlobalSearch(searchInput);
      if (globalResults.pages.length > 0) {
        navigate(globalResults.pages[0].path);
      } else {
        performSearch(searchInput);
        navigate('/search-results', { state: { query: searchInput } });
      }
      setShowSearchResults(false);
      setSearchInput('');
    }
  };

  const handlePageClick = (path) => {
    navigate(path);
    setShowSearchResults(false);
    setSearchInput('');
  };

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to log out?");
    if (confirmed) {
      setCurrentUser(null);
      localStorage.removeItem('token');
      navigate('/signin');
    }
  };

  // Get first name from full name
  const firstName = currentUser?.name?.split(' ')[2] || 'User';

  return (
    <>
      <nav className="bg-[#FCFFFE] shadow-sm py-4 bg-gray-900 text-white">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Logo and Nav Items */}
            <div className="flex items-center space-x-20">
              <Link to="/" className="flex items-center space-x-4">
                <img src="/images/thriftstorelogo.png" alt="Logo" className="h-20 w-50" />
              </Link>
              <div className="flex items-center space-x-10">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="flex items-center space-x-2 text-white hover:text-yellow-500"
                  >
                    {item.icon && (
                      <img src={item.icon} alt={item.name} className="w-6 h-6 inline-block filter invert" />
                    )}
                    <span className="text-sm">{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Right Side - Search, Language, Cart, User */}
            <div className="flex items-center space-x-8">
              {/* Search Bar */}
              <div className="relative flex-grow max-w-lg" ref={searchRef}>
                <form onSubmit={handleSearchSubmit}>
                  <input
                    type="text"
                    value={searchInput}
                    onChange={handleSearchInput}
                    placeholder="Search product"
                    className="w-full pl-5 pr-80 py-2 rounded-full border border-gray-800 text-gray-800 focus:outline-none focus:border-yellow-500"
                  />
                  <button
                    type="submit"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-800 hover:text-gray-600"
                  >
                    <FiSearch className="w-5 h-5" />
                  </button>
                </form>
              </div>

              {/* Cart with Counter */}
              <Link to="/cart" className="relative">
                <img
                  src="/images/Client/product-page/client-shopping-cart.svg"
                  alt="Cart"
                  className="w-6 h-6 hover:border-yellow-300"
                />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#F1511B] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Link>

              {/* User Profile */}
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 hover:opacity-80"
                >
                  <span className="text-sm hidden md:block hover:text-yellow-500">Buyer</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <Link
                      to="/user-profile"
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <ChatbotButton onClick={() => setIsChatbotOpen(true)} />
      <ChatbotModal
        isOpen={isChatbotOpen}
        onClose={() => setIsChatbotOpen(false)}
      />
    </>
  );
};

export default NavBar;