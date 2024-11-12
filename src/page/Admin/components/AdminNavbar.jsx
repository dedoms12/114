import { useState } from 'react';
import { FiSearch, FiChevronDown, FiSun } from 'react-icons/fi';

const AdminNavbar = () => {
  const [language, setLanguage] = useState('English (US)');

  return (
    <nav className="bg-white border-b">
      <div className="px-6 py-2">
        <div className="flex items-center justify-between">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-2xl">
            <input
              type="text"
              placeholder="Search for anything here.."
              className="w-full pl-4 pr-10 py-2 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:border-gray-300"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <FiSearch className="w-5 h-5" />
            </button>
          </div>

          {/* Right Side - Language and Time */}
          <div className="flex items-center space-x-6">
            {/* Language Selector */}
            <div className="flex items-center space-x-2">
              <img src="/images/Admin/language.svg" alt="Language" className="w-5 h-5" />
              <span className="text-sm text-gray-600">{language}</span>
              <FiChevronDown className="w-4 h-4 text-gray-400" />
            </div>

            {/* Time and Date */}
            <div className="text-right">
              <div className="text-sm font-medium flex items-center justify-end gap-2">
                <FiSun className="w-5 h-5 text-yellow-400" />
                Good Morning
              </div>
              <div className="text-xs text-gray-500">
                {new Date().toLocaleDateString('en-US', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })} - {' '}
                {new Date().toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit'
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar; 