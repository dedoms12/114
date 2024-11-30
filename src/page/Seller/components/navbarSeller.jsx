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
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const firstName = currentUser?.name?.split(' ')[1] || 'Seller';

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to log out?");
    if (confirmed) {
      setCurrentUser(null);
      localStorage.removeItem('token');
      navigate('/signin');
    }
  };

  const navItems = [
    { name: 'Dashboard', path: '/seller/dashboard', icon: '/images/Seller/dashboard.png' },
    { name: 'Sales', path: '/seller/sales', icon: '/images/Seller/sales.png' },
    { name: 'Products', path: '/seller/product-management', icon: '/images/Seller/products.png' },
    { name: 'Orders', path: '/seller/records/orders', icon: '/images/Seller/order-delivery.png' },
    { name: 'Customers', path: '/seller/records/customers', icon: '/images/Seller/customer.png' },
  ];

  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleDropdownClick = (itemName) => {
    if (activeDropdown === itemName) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(itemName);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim()) {
      const filtered = navItems.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered);
      setShowSearchResults(true);
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  };

  const handleSearchItemClick = (item) => {
    navigate(item.path);
    setSearchQuery('');
    setShowSearchResults(false);
  };

  const searchBarJSX = (
    <div className="relative">
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search for Dashboard, Sales, Products... "
        className="w-64 pl-4 pr-10 py-2 rounded-full border border-gray-200 focus:outline-none focus:border-yellow-500 text-black"
      />
      <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
        <FiSearch className="w-5 h-5" />
      </button>

      {/* Search Results Dropdown */}
      {showSearchResults && searchResults.length > 0 && (
        <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          {searchResults.map((item, index) => (
            <div
              key={index}
              onClick={() => handleSearchItemClick(item)}
              className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center space-x-2"
            >
              <FiSearch className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-700">{item.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <nav className="bg-[#FCFFFE] shadow-sm py-4 bg-gray-900 text-white">
      <div className="container mx-auto px-20">
        <div className="flex items-center justify-between">
          {/* Logo and Nav Items */}
          <Link to="/seller/dashboard" className="flex items-center space-x-2">
            <img src="/images/thriftstorelogo.png" alt="logo" className="h-20 w-50" />
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
              <div key={item.name} className="relative">
                <Link
                  to={item.path}
                  className="flex items-center space-x-2 text-white hover:text-yellow-500"
                >
                  <img src={item.icon} alt={item.name} className="w-5 h-5 invert" />
                  <span className="text-sm">{item.name}</span>
                </Link>
              </div>
            ))}
          </div>

          {/* Search bar and User */}
          <div className="flex items-center space-x-6">
            {searchBarJSX}

            {/* User Profile Dropdown */}
            <div className="relative px-5">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 hover:opacity-80"
              >
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
