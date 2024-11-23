import AdminNavbar from '../components/AdminNavbar';
import AdminSidebar from '../components/AdminSidebar';
import { 
  FiPackage, FiShoppingBag, FiAlertTriangle, FiShield,
  FiTrendingUp, FiTrendingDown, FiArrowRight, FiSlash,
  FiRefreshCw, FiAlertOctagon
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

const AdminInventory = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('weekly');
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Simplified inventory stats focusing on monitoring
  const inventoryStats = [
    {
      title: 'System Overview',
      description: 'Current system status and alerts',
      stats: [
        {
          icon: <FiPackage className="w-8 h-8" />,
          count: '298',
          label: 'Active Medicines',
          trend: '+12%',
          trendIcon: <FiTrendingUp className="w-4 h-4" />,
          trendColor: 'text-green-500',
          path: '/admin/inventory/medicines',
          description: 'Currently listed medicines'
        },
        {
          icon: <FiShoppingBag className="w-8 h-8" />,
          count: '24',
          label: 'Registered Pharmacies',
          trend: '+3',
          trendIcon: <FiTrendingUp className="w-4 h-4" />,
          trendColor: 'text-green-500',
          path: '/admin/inventory/pharmacies',
          description: 'Active pharmacy partners'
        },
        {
          icon: <FiAlertOctagon className="w-8 h-8" />,
          count: '8',
          label: 'Blocked Items',
          trend: '+2',
          trendIcon: <FiTrendingUp className="w-4 h-4" />,
          trendColor: 'text-red-500',
          path: '/admin/inventory/blocklist',
          description: 'Blocked medicines & stores'
        }
      ]
    }
  ];

  // Monitoring sections
  const monitoringSections = [
    {
      title: 'Medicine Monitoring',
      description: 'Track medicine listings and status',
      path: '/admin/inventory/medicines',
      icon: <FiPackage className="w-6 h-6" />,
      color: 'bg-blue-500',
      stats: [
        { label: 'Active Listings', value: '245' },
        { label: 'Temporarily Blocked', value: '8' },
        { label: 'Permanently Blocked', value: '4' }
      ]
    },
    {
      title: 'Pharmacy Oversight',
      description: 'Monitor registered pharmacies and documentation',
      path: '/admin/inventory/pharmacies',
      icon: <FiShoppingBag className="w-6 h-6" />,
      color: 'bg-purple-500',
      stats: [
        { label: 'Active Stores', value: '18' },
        { label: 'Blocked', value: '3' },
        { label: 'License Expiring', value: '2' }
      ]
    },
    {
      title: 'Blocklist Management',
      description: 'View and manage blocked items and stores',
      path: '/admin/inventory/blocklist',
      icon: <FiShield className="w-6 h-6" />,
      color: 'bg-red-500',
      stats: [
        { label: 'Blocked Medicines', value: '12' },
        { label: 'Blocked Stores', value: '3' },
        { label: 'Under Review', value: '4' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className={`${isCollapsed ? 'ml-16' : 'ml-64'} transition-all duration-300`}>
        <AdminNavbar />
        <div className="p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Inventory Management</h1>
                <p className="text-sm text-gray-600">Monitor medicines and pharmacies across the platform</p>
              </div>
              <div className="flex items-center gap-4">
                <select
                  value={selectedTimeframe}
                  onChange={(e) => setSelectedTimeframe(e.target.value)}
                  className="px-4 py-2 bg-white border rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100">
                  <FiRefreshCw className="w-4 h-4" />
                  Refresh
                </button>
              </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {inventoryStats[0].stats.map((stat, index) => (
                <Link
                  key={index}
                  to={stat.path}
                  data-tooltip-id={`inventory-stat-${index}`}
                  data-tooltip-content={`Click to view detailed ${stat.label.toLowerCase()} information`}
                  className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2 rounded-lg bg-blue-50">{stat.icon}</div>
                    <div className={`flex items-center ${stat.trendColor}`}>
                      {stat.trendIcon}
                      <span className="ml-1 text-sm">{stat.trend}</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-1">{stat.count}</h3>
                  <p className="text-gray-600">{stat.label}</p>
                  <p className="text-sm text-gray-500 mt-1">{stat.description}</p>
                  <Tooltip id={`inventory-stat-${index}`} place="top" />
                </Link>
              ))}
            </div>

            {/* Monitoring Sections */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {monitoringSections.map((section, index) => (
                <Link
                  key={index}
                  to={section.path}
                  data-tooltip-id={`monitoring-section-${index}`}
                  data-tooltip-content={section.description}
                  className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all"
                >
                  <div className={`${section.color} text-white p-3 rounded-lg inline-flex mb-4`}>
                    {section.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{section.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{section.description}</p>
                  <div className="space-y-3">
                    {section.stats.map((stat, statIndex) => (
                      <div key={statIndex} className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">{stat.label}</span>
                        <span className="font-semibold">{stat.value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center text-sm font-medium text-blue-600">
                    View Details <FiArrowRight className="ml-2 w-4 h-4" />
                  </div>
                  <Tooltip id={`monitoring-section-${index}`} place="top" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminInventory; 