import { Link } from 'react-router-dom';
import { FiGrid, FiPackage, FiFileText, FiSettings, FiUsers, FiBell, FiMessageSquare, FiSliders, FiShield, FiHelpCircle, FiChevronDown, FiAlertTriangle } from 'react-icons/fi';
import ProfileMenu from './ProfileMenu';
import { useState } from 'react';

const AdminSidebar = () => {
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);
  const [isReportsOpen, setIsReportsOpen] = useState(false);

  const menuItems = [
    { icon: FiGrid, label: 'Dashboard', path: '/admin/dashboard' },
    {
      icon: FiPackage,
      label: 'Inventory',
      path: '/admin/inventory',
      subItems: [
        { label: 'List of Medicines', path: '/admin/inventory/medicines' },
        { label: 'Registered Pharmacies', path: '/admin/inventory/groups' }
      ]
    },
    {
      icon: FiFileText,
      label: 'Reports',
      path: '/admin/reports',
      subItems: [
        { label: 'Sales Report', path: '/admin/reports/sales' },
        { label: 'Total Registered Users', path: '/admin/reports/users' }
      ]
    },
    { icon: FiUsers, label: 'Contact Management', path: '/admin/contacts' },
    { icon: FiSliders, label: 'Application Settings', path: '/admin/settings' },
    {
      icon: FiAlertTriangle,
      label: 'Blacklisted Stores',
      path: '/admin/blacklisted-stores',
      badge: '1'
    }
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
          <div key={index}>
            {item.subItems ? (
              <div>
                <button
                  onClick={() => {
                    if (item.label === 'Inventory') setIsInventoryOpen(!isInventoryOpen);
                    if (item.label === 'Reports') setIsReportsOpen(!isReportsOpen);
                  }}
                  className="w-full flex items-center justify-between px-6 py-3 hover:bg-[#2A3547] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </div>
                  <FiChevronDown className={`w-4 h-4 transition-transform ${
                    (item.label === 'Inventory' && isInventoryOpen) || 
                    (item.label === 'Reports' && isReportsOpen) ? 'rotate-180' : ''
                  }`} />
                </button>
                {((item.label === 'Inventory' && isInventoryOpen) || 
                  (item.label === 'Reports' && isReportsOpen)) && (
                  <div className="bg-[#2A3547]">
                    {item.subItems.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        to={subItem.path}
                        className="flex items-center pl-14 py-2 hover:bg-[#374151] transition-colors text-sm"
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                to={item.path}
                className="flex items-center gap-3 px-6 py-3 hover:bg-[#2A3547] transition-colors"
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default AdminSidebar; 