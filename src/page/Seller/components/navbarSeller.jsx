import { Link } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import { useState } from 'react';

const NavbarSeller = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { name: 'Home', path: '/dashboard', icon: '/images/Client/product-page/home-logo.svg' },
    { name: 'Products Management', path: '/product-management', icon: '/images/Client/product-page/client-package.svg' },
    { name: 'Sales', path: '/sales', icon: '/images/Client/product-page/client-shopping-cart.svg' },
  ];

  return (
    <nav className="bg-[#FCFFFE] shadow-sm py-4">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo and Nav Items */}
          <Link to="/dashboard" className="flex items-center space-x-2">
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

            {/* User Profile */}
            <Link to="/seller-profile" className="flex items-center space-x-2">
              <img
                src="/images/Client/product-page/client-account.svg"
                alt="User"
                className="w-6 h-6 cursor-pointer hover:opacity-80"
              />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarSeller;