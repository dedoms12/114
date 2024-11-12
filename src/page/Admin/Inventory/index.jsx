import AdminNavbar from '../components/AdminNavbar';
import AdminSidebar from '../components/AdminSidebar';
import { FiPlus } from 'react-icons/fi';

const AdminInventory = () => {
  const stats = [
    {
      icon: '💊',
      count: '298',
      label: 'Medicines Available',
      action: 'View Full List',
      buttonClass: 'bg-blue-50'
    },
    {
      icon: '📦',
      count: '02',
      label: 'Medicine Groups',
      action: 'View Groups',
      buttonClass: 'bg-green-50'
    },
    {
      icon: '⚠️',
      count: '01',
      label: 'Medicine Shortage',
      action: 'Resolve Now',
      buttonClass: 'bg-red-50'
    }
  ];

  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminNavbar />
        <div className="flex-1 bg-gray-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold">Inventory</h1>
              <p className="text-sm text-gray-600">List of medicines available for sales.</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
              <FiPlus className="w-5 h-5" />
              Add New Item
            </button>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg border">
                <div className="flex flex-col items-center p-6">
                  <div className="text-4xl mb-4">{stat.icon}</div>
                  <div className="text-2xl font-bold mb-2">{stat.count}</div>
                  <div className="text-gray-600 mb-4">{stat.label}</div>
                  <button className={`w-full py-2 ${stat.buttonClass} rounded-lg hover:opacity-90 transition-opacity`}>
                    {stat.action} →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminInventory; 