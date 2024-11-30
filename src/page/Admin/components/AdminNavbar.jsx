import { useState } from 'react';
import { FiSearch, FiChevronDown, FiSun, FiHelpCircle } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

const AdminNavbar = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState('English (US)');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(() => {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  });

  const firstName = currentUser?.name?.split(' ')[0] || 'Admin';

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to log out?");
    if (confirmed) {
      setCurrentUser(null);
      localStorage.removeItem('token');
      navigate('/signin');
    }
  };

  return (
    <nav className="bg-white border-b">
      <div className="px-6 py-2  bg-gray-900 ">
        <div className="flex items-center justify-between">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-2x1">
            <input
              type="text"
              placeholder="Search for anything here.."
              className="w-full pl-4 pr-10 py-2 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:border-gray-300"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <FiSearch className="w-5 h-5" />
            </button>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-6">
            {/* Time and Date */}
            <div className="text-right text-white">
              <div className="text-sm font-medium flex items-center justify-end gap-2 px-4">
              <FiHelpCircle className="w-5 h-5" />
              </div>
            </div>

            {/* User Profile Dropdown */}
            <div className="relative text-white">
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
                    to="/admin/settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    Settings
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

export default AdminNavbar; 