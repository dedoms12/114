import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  FiHome, FiPackage, FiFileText, FiSettings, FiHelpCircle, 
  FiChevronDown, FiMenu, FiMessageSquare, FiList, FiShoppingBag, FiAlertCircle, FiBarChart2, FiUsers 
} from 'react-icons/fi';
import ProfileMenu from './ProfileMenu';
import { useState, useEffect } from 'react';

const AdminSidebar = () => {
  const [activeSection, setActiveSection] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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
        { icon: FiUsers, label: 'Registered Users', path: '/admin/reports/users' }
      ]
    },
    {
      icon: FiMessageSquare,
      label: 'Contact Management',
      path: '/admin/contacts',
      description: 'User inquiries and support'
    }
  ];

  return (
    <aside className="h-screen flex flex-col bg-[#1C2434] text-white">
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
                    setIsInventoryOpen(!isInventoryOpen);
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
                      <FiChevronDown className={`w-4 h-4 transition-transform ${isInventoryOpen ? 'rotate-180' : ''}`} />
                    )}
                  </>
                )}
              </button>

              {/* Dropdown Menu */}
              {item.subItems && isInventoryOpen && !isCollapsed && (
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
      <div className="p-4 border-t border-gray-700">
        <Link
          to="/admin/settings"
          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#2A3547]"
        >
          <FiSettings className="w-5 h-5" />
          {!isCollapsed && <span>Settings</span>}
        </Link>
        <Link
          to="/admin/support"
          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#2A3547]"
        >
          <FiHelpCircle className="w-5 h-5" />
          {!isCollapsed && <span>Support</span>}
        </Link>
      </div>
    </aside>
  );
};

export default AdminSidebar; 