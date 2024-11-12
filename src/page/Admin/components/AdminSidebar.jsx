import { Link } from 'react-router-dom';
import { FiGrid, FiPackage, FiFileText, FiSettings, FiUsers, FiBell, FiMessageSquare, FiSliders, FiShield, FiHelpCircle } from 'react-icons/fi';
import ProfileMenu from './ProfileMenu';

const AdminSidebar = () => {
  const menuItems = [
    { icon: FiGrid, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: FiPackage, label: 'Inventory', path: '/admin/inventory' },
    { icon: FiFileText, label: 'Reports', path: '/admin/reports' },
    { icon: FiSettings, label: 'Configuration', path: '/admin/configuration' },
    { icon: FiUsers, label: 'Contact Management', path: '/admin/contacts' },
    { icon: FiBell, label: 'Notifications', path: '/admin/notifications', badge: '01' },
    { icon: FiMessageSquare, label: 'Chat with Visitors', path: '/admin/chat' },
    { icon: FiSliders, label: 'Application Settings', path: '/admin/settings' },
    { icon: FiShield, label: 'Covid -19', path: '/admin/covid' },
    { icon: FiHelpCircle, label: 'Get Technical Help', path: '/admin/help' },
  ];

  return (
    <div className="w-64 bg-[#1C2434] min-h-screen text-white">
      <div className="p-4 flex items-center gap-2 border-b border-gray-700">
        <img src="/images/PillLogo.svg" alt="PillPoint" className="h-8 w-8" />
        <span className="text-xl font-semibold">PillPoint</span>
      </div>

      <div className="p-4 border-b border-gray-700">
        <ProfileMenu />
      </div>

      <nav className="mt-6">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className="flex items-center gap-3 px-6 py-3 hover:bg-[#2A3547] transition-colors"
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
            {item.badge && (
              <span className="ml-auto bg-red-500 text-xs px-2 py-1 rounded-full">
                {item.badge}
              </span>
            )}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default AdminSidebar; 