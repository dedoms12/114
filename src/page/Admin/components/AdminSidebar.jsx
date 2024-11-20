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
      description: 'Medicine and pharmacy management',
      subItems: [
        { icon: FiList, label: 'Medicine List', path: '/admin/inventory/medicines' },
        { icon: FiShoppingBag, label: 'Store List', path: '/admin/inventory/stores' },
        { icon: FiAlertCircle, label: 'Blocklist', path: '/admin/inventory/blocklist', badge: '2' }
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
              <img src="/images/PillLogo.svg" alt="PillPoint" className="h-6 w-6" />
              <h3 className="font-semibold">PillPoint Support</h3>
            </div>
            
            <div className="space-y-3">
              <div className="hover:bg-gray-50 p-2 rounded-lg transition-colors">
                <h4 className="font-medium text-sm">Version</h4>
                <p className="text-sm text-gray-600">v2.1.0 (Latest)</p>
              </div>
              
              <div className="hover:bg-gray-50 p-2 rounded-lg transition-colors">
                <h4 className="font-medium text-sm">Contact Support</h4>
                <p className="text-sm text-gray-600">support@pillpoint.com</p>
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
    <aside className="min-h-screen flex flex-col bg-[#1C2434] text-white sticky top-0">
      {/* Header */}
      <div className="p-4 flex items-center gap-3 border-b border-gray-700">
        <img src="/images/PillLogo.svg" alt="PillPoint" className="h-8 w-8" />
        {!isCollapsed && <span className="text-xl font-semibold">PillPoint</span>}
      </div>

      {/* Scrollable Navigation */}
      <div className="flex-1 overflow-y-auto">
        <nav className="p-4 space-y-2">
          {menuItems.map((item, index) => (
            <div key={index}>
              <button
                onClick={() => {
                  if (item.subItems) {
                    toggleDropdown(item.label.toLowerCase());
                  } else {
                    navigate(item.path);
                  }
                }}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-lg
                  ${location.pathname.includes(item.path) ? 'bg-[#2A3547]' : 'hover:bg-[#2A3547]'}
                  transition-colors
                `}
              >
                <item.icon className="w-5 h-5" />
                {!isCollapsed && (
                  <>
                    <div className="flex-1 text-left">
                      <span className="font-medium">{item.label}</span>
                      <p className="text-xs text-gray-400">{item.description}</p>
                    </div>
                    {item.subItems && (
                      <FiChevronDown 
                        className={`w-4 h-4 transition-transform ${
                          dropdownStates[item.label.toLowerCase()] ? 'rotate-180' : ''
                        }`} 
                      />
                    )}
                  </>
                )}
              </button>

              {/* Dropdown Menu */}
              {item.subItems && dropdownStates[item.label.toLowerCase()] && !isCollapsed && (
                <div className="ml-4 mt-2 space-y-1">
                  {item.subItems.map((subItem, subIndex) => (
                    <Link
                      key={subIndex}
                      to={subItem.path}
                      className={`
                        flex items-center gap-3 px-4 py-2 rounded-lg
                        ${location.pathname === subItem.path ? 'bg-[#2A3547]' : 'hover:bg-[#2A3547]'}
                      `}
                    >
                      <subItem.icon className="w-4 h-4" />
                      <span className="flex-1">{subItem.label}</span>
                      {subItem.badge && (
                        <span className="px-2 py-1 text-xs bg-red-500 rounded-full">
                          {subItem.badge}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700 mt-auto">
        <Link
          to="/admin/settings"
          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#2A3547]"
        >
          <FiSettings className="w-5 h-5" />
          {!isCollapsed && <span>Settings</span>}
        </Link>
        <SupportSection />
      </div>
    </aside>
  );
};

export default AdminSidebar; 