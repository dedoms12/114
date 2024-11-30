import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  FiHome, FiPackage, FiFileText, FiSettings, FiHelpCircle,
  FiChevronDown, FiMenu, FiMessageSquare, FiList, FiShoppingBag, FiAlertCircle, FiBarChart2, FiUsers, FiCheckCircle
} from 'react-icons/fi';
import ProfileMenu from './ProfileMenu';
import { useState, useEffect } from 'react';

const AdminSidebar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [dropdownStates, setDropdownStates] = useState({
    inventory: false,
    reports: false
  });
  const location = useLocation();
  const navigate = useNavigate();
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [supportHoverTimeout, setSupportHoverTimeout] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = [
    {
      icon: FiHome,
      label: 'Dashboard',
      path: '/admin/dashboard',
      description: 'Overview and statistics'
    },
    {
      icon: FiPackage,
      label: 'Inventory',
      path: '/admin/inventory',
      description: 'Products and Store management',
      subItems: [
        { icon: FiList, label: 'Products', path: '/admin/inventory/products' },
        { icon: FiShoppingBag, label: 'Store List', path: '/admin/inventory/stores' },
        { icon: FiAlertCircle, label: 'Blocklist', path: '/admin/inventory/blocklist', badge: '' }
      ]
    },
    {
      icon: FiFileText,
      label: 'Reports',
      path: '/admin/reports',
      description: 'Analytics and monitoring',
      subItems: [
        { icon: FiBarChart2, label: 'Sales Report', path: '/admin/reports/sales' },
        { icon: FiUsers, label: 'Registered Users', path: '/admin/reports/users' },
        { icon: FiCheckCircle, label: 'Store Verification', path: '/admin/reports/store-verification' }
      ]
    },
    {
      icon: FiMessageSquare,
      label: 'Contact Management',
      path: '/admin/contacts',
      description: 'User inquiries and support'
    }
  ];

  const toggleDropdown = (section) => {
    setDropdownStates(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleSupportMouseEnter = () => {
    if (supportHoverTimeout) clearTimeout(supportHoverTimeout);
    setShowSupportModal(true);
  };

  const handleSupportMouseLeave = () => {
    const timeout = setTimeout(() => {
      setShowSupportModal(false);
    }, 300); // 300ms delay before hiding
    setSupportHoverTimeout(timeout);
  };

  const handleModalMouseEnter = () => {
    if (supportHoverTimeout) clearTimeout(supportHoverTimeout);
  };

  const handleModalMouseLeave = () => {
    setShowSupportModal(false);
  };

  const SupportSection = () => (
    <div className="relative">
      <button
        onMouseEnter={handleSupportMouseEnter}
        onMouseLeave={handleSupportMouseLeave}
        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#2A3547]"
      >
        <FiHelpCircle className="w-5 h-5" />
        {!isCollapsed && <span>Support</span>}
      </button>

      {showSupportModal && !isCollapsed && (
        <div
          onMouseEnter={handleModalMouseEnter}
          onMouseLeave={handleModalMouseLeave}
          className="absolute bottom-0 left-full ml-2 w-80 bg-white text-gray-900 rounded-lg shadow-xl p-4 transition-opacity duration-200"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b pb-2">
              <img src="/images/thriftstorelogo.png" alt="Logo" className="h-6 w-6" />
              <h3 className="font-semibold">Thriftstore Support</h3>
            </div>

            <div className="space-y-3">
              <div className="hover:bg-gray-50 p-2 rounded-lg transition-colors">
                <h4 className="font-medium text-sm">Version</h4>
                <p className="text-sm text-gray-600">v2.1.0 (Latest)</p>
              </div>

              <div className="hover:bg-gray-50 p-2 rounded-lg transition-colors">
                <h4 className="font-medium text-sm">Contact Support</h4>
                <p className="text-sm text-gray-600">support@thrifstore.com</p>
                <p className="text-sm text-gray-600">+1 234 567 8900</p>
              </div>

              <div className="hover:bg-gray-50 p-2 rounded-lg transition-colors">
                <h4 className="font-medium text-sm">Documentation</h4>
                <a
                  href="#"
                  className="text-sm text-blue-600 hover:text-blue-800 block"
                >
                  View Admin Guide
                </a>
                <a
                  href="#"
                  className="text-sm text-blue-600 hover:text-blue-800 block"
                >
                  API Documentation
                </a>
              </div>

              <div className="hover:bg-gray-50 p-2 rounded-lg transition-colors">
                <h4 className="font-medium text-sm">Quick Links</h4>
                <a
                  href="#"
                  className="text-sm text-blue-600 hover:text-blue-800 block"
                >
                  FAQs
                </a>
                <a
                  href="#"
                  className="text-sm text-blue-600 hover:text-blue-800 block"
                >
                  Report an Issue
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <aside className="min-h-screen flex flex-col bg-white top-0">


      {/* Scrollable Navigation */}
      <div className="flex-1 overflow-y-auto">
        <aside className="min-h-screen flex flex-col bg-gray-900 text-white sticky top-0">
          {/* Header */}
          <div className="p-4 flex justify-center gap-3 border-b border-gray-700">
            <h1 className="text-lg font-bold">Admin Panel</h1>
          </div>

          {/* Scrollable Navigation */}
          <div className="flex-1 overflow-y-auto">
            <nav className="p-4 space-y-5">
              {[
                // Flattened menu structure
                { icon: FiHome, label: 'Dashboard', path: '/admin/dashboard' },
                { icon: FiList, label: 'Products', path: '/admin/inventory/products' },
                { icon: FiShoppingBag, label: 'Store List', path: '/admin/inventory/stores' },
                { icon: FiAlertCircle, label: 'Blocklist', path: '/admin/inventory/blocklist' },
                { icon: FiBarChart2, label: 'Sales Report', path: '/admin/reports/sales' },
                { icon: FiUsers, label: 'Registered Users', path: '/admin/reports/users' },
                { icon: FiCheckCircle, label: 'Store Verification', path: '/admin/reports/store-verification' },
                { icon: FiMessageSquare, label: 'Contact Management', path: '/admin/contacts' }
              ].map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg 
            ${location.pathname === item.path ? 'bg-[#2A3547]' : 'hover:bg-[#2A3547]'}
            transition-colors`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="ml-auto px-2 py-1 text-xs bg-red-500 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
            </nav>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-700 mt-auto flex items-center gap-2 flex justify-center">
            <FiHelpCircle className="w-5 h-5" />
            <span>Help & Support</span>
          </div>
        </aside>

      </div>
    </aside>
  );
};

export default AdminSidebar; 