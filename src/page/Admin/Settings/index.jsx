import AdminNavbar from '../components/AdminNavbar';
import AdminSidebar from '../components/AdminSidebar';
import { FiUser, FiLock, FiBell, FiGlobe, FiShield, FiClock } from 'react-icons/fi';
import { useState } from 'react';

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState('general');

  const settingsSections = [
    {
      id: 'general',
      icon: FiUser,
      title: 'General Settings',
      description: 'Manage your account preferences'
    },
    {
      id: 'security',
      icon: FiLock,
      title: 'Security',
      description: 'Update your security settings'
    },
    {
      id: 'notifications',
      icon: FiBell,
      title: 'Notifications',
      description: 'Configure notification preferences'
    },
    {
      id: 'system',
      icon: FiGlobe,
      title: 'System',
      description: 'System-wide configurations'
    }
  ];

  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminNavbar />
        <div className="flex-1 bg-gray-100 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Settings</h1>
            <p className="text-sm text-gray-600">Manage your application settings</p>
          </div>

          <div className="grid grid-cols-4 gap-6 mb-6">
            {settingsSections.map((section) => (
              <button
                key={section.id}
                className={`bg-white p-6 rounded-lg shadow-sm text-left transition-colors ${
                  activeTab === section.id ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setActiveTab(section.id)}
              >
                <section.icon className={`w-8 h-8 mb-4 ${
                  activeTab === section.id ? 'text-blue-500' : 'text-gray-600'
                }`} />
                <h3 className="font-medium mb-2">{section.title}</h3>
                <p className="text-sm text-gray-600">{section.description}</p>
              </button>
            ))}
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            {activeTab === 'general' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Business Hours</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Monday - Friday</span>
                      <div className="flex gap-2">
                        <input type="time" className="border rounded px-2 py-1" defaultValue="09:00" />
                        <span>to</span>
                        <input type="time" className="border rounded px-2 py-1" defaultValue="18:00" />
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Saturday</span>
                      <div className="flex gap-2">
                        <input type="time" className="border rounded px-2 py-1" defaultValue="09:00" />
                        <span>to</span>
                        <input type="time" className="border rounded px-2 py-1" defaultValue="13:00" />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">System Maintenance</h3>
                  <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FiClock className="w-5 h-5 text-yellow-600" />
                      <div>
                        <p className="font-medium text-yellow-600">Next Maintenance Window</p>
                        <p className="text-sm text-yellow-700">Sunday, 2:00 AM - 4:00 AM</p>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg text-sm font-medium">
                      Reschedule
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Security Audit Log</h3>
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FiShield className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-medium text-green-600">Last Security Scan</p>
                        <p className="text-sm text-green-700">Completed 2 hours ago</p>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
                      View Report
                    </button>
                  </div>
                </div>
              </div>
            )}
            {/* Add other tab content sections as needed */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
