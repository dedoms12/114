import { Link, useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import { useState } from 'react';

const NavbarSeller = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(() => {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  });

  const firstName = currentUser?.name?.split(' ')[0] || 'Seller';

  const handleLogout = () => {
    // Add any logout cleanup logic here
    navigate('/signin');
  };

  const navItems = [
    { name: 'Home', path: '/seller/dashboard', icon: '/images/Client/product-page/home-logo.svg' },
    { name: 'Products Management', path: '/seller/product-management', icon: '/images/Client/product-page/client-package.svg' },
    { name: 'Sales', path: '/seller/sales', icon: '/images/Client/product-page/client-shopping-cart.svg' },
  ];

  return (
    <nav className="bg-[#FCFFFE] shadow-sm py-4">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo and Nav Items */}
          <Link to="/seller/dashboard" className="flex items-center space-x-2">
            <img src="/images/Client/product-page/PillLogo.svg" alt="PillPoint" className="h-12 w-12" />
            <span className="text-2xl font-semibold text-gray-800">PillPoint</span>
          </Link>

          {/* Hamburger Icon for Mobile */}
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="md:hidden">
            <span className="text-gray-600">☰</span>
          </button>

          {/* Sidebar for Mobile */}
          {isSidebarOpen && (
            <div className="fixed inset-0 bg-white z-50 md:hidden">
              <div className="flex flex-col p-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="flex items-center space-x-2 text-gray-600 hover:text-pill-blue mb-2"
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <img src={item.icon} alt={item.name} className="w-5 h-5" />
                    <span className="text-sm">{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center space-x-16">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="flex items-center space-x-2 text-gray-600 hover:text-pill-blue"
              >
                <img src={item.icon} alt={item.name} className="w-5 h-5" />
                <span className="text-sm">{item.name}</span>
              </Link>
            ))}
          </div>

          {/* Search bar and User */}
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

            {/* User Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 hover:opacity-80"
              >
                <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center text-sm text-white">
                  {firstName.charAt(0)}
                </div>
                <span className="text-sm hidden md:block">
                  {firstName}
                </span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  <Link
                    to="/seller-profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
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
  );
};

export default NavbarSeller;