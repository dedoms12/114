import { useState } from 'react';
import AdminNavbar from '../components/AdminNavbar';
import AdminSidebar from '../components/AdminSidebar';
import { 
  FiUser, FiLock, FiBell, FiGlobe, FiShield, FiClock, 
  FiMail, FiPhone, FiDollarSign, FiSave, FiAlertCircle 
} from 'react-icons/fi';

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    system: true,
    security: true
  });
  const [businessHours, setBusinessHours] = useState({
    weekday: { start: '09:00', end: '18:00' },
    saturday: { start: '09:00', end: '13:00' },
    sunday: { start: 'closed', end: 'closed' }
  });

  const settingsSections = [
    {
      id: 'general',
      icon: FiUser,
      title: 'General Settings',
      description: 'Basic pharmacy information and business hours'
    },
    {
      id: 'security',
      icon: FiLock,
      title: 'Security',
      description: 'Security controls and authentication settings'
    },
    {
      id: 'notifications',
      icon: FiBell,
      title: 'Notifications',
      description: 'Alert and communication preferences'
    },
    {
      id: 'system',
      icon: FiGlobe,
      title: 'System',
      description: 'Technical configurations and maintenance'
    }
  ];

  const renderGeneralSettings = () => (
    <div className="space-y-8">
      <section className="border-b pb-6">
        <h3 className="text-lg font-medium mb-4">Pharmacy Information</h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Pharmacy Name</label>
            <input type="text" className="w-full border rounded-lg px-3 py-2" defaultValue="MedCare Pharmacy" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">License Number</label>
            <input type="text" className="w-full border rounded-lg px-3 py-2" defaultValue="PH-12345-2024" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
            <input type="email" className="w-full border rounded-lg px-3 py-2" defaultValue="contact@medcare.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <input type="tel" className="w-full border rounded-lg px-3 py-2" defaultValue="+1 234 567 8900" />
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-medium mb-4">Business Hours</h3>
        <div className="space-y-4">
          {Object.entries(businessHours).map(([day, hours]) => (
            <div key={day} className="flex justify-between items-center">
              <span className="text-gray-600 capitalize">{day}</span>
              <div className="flex gap-2">
                <select 
                  className="border rounded-lg px-3 py-2"
                  value={hours.start}
                  onChange={(e) => setBusinessHours(prev => ({
                    ...prev,
                    [day]: { ...prev[day], start: e.target.value }
                  }))}
                >
                  <option value="closed">Closed</option>
                  {Array.from({ length: 24 }).map((_, i) => (
                    <option key={i} value={`${String(i).padStart(2, '0')}:00`}>
                      {`${String(i).padStart(2, '0')}:00`}
                    </option>
                  ))}
                </select>
                <span>to</span>
                <select 
                  className="border rounded-lg px-3 py-2"
                  value={hours.end}
                  onChange={(e) => setBusinessHours(prev => ({
                    ...prev,
                    [day]: { ...prev[day], end: e.target.value }
                  }))}
                >
                  <option value="closed">Closed</option>
                  {Array.from({ length: 24 }).map((_, i) => (
                    <option key={i} value={`${String(i).padStart(2, '0')}:00`}>
                      {`${String(i).padStart(2, '0')}:00`}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-8">
      <section className="border-b pb-6">
        <h3 className="text-lg font-medium mb-4">Authentication Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Two-Factor Authentication</h4>
              <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
            </div>
            <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg">Enable</button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Session Timeout</h4>
              <p className="text-sm text-gray-600">Automatically log out after inactivity</p>
            </div>
            <select className="border rounded-lg px-3 py-2">
              <option>15 minutes</option>
              <option>30 minutes</option>
              <option>1 hour</option>
            </select>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-medium mb-4">Access Control</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium">IP Whitelist</h4>
              <p className="text-sm text-gray-600">Restrict access to specific IP addresses</p>
            </div>
            <button className="px-4 py-2 bg-white border rounded-lg">Configure</button>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium">Role Management</h4>
              <p className="text-sm text-gray-600">Manage user roles and permissions</p>
            </div>
            <button className="px-4 py-2 bg-white border rounded-lg">Manage Roles</button>
          </div>
        </div>
      </section>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-8">
      <section className="border-b pb-6">
        <h3 className="text-lg font-medium mb-4">Notification Preferences</h3>
        <div className="space-y-4">
          {Object.entries(notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <h4 className="font-medium capitalize">{key} Notifications</h4>
                <p className="text-sm text-gray-600">
                  Receive notifications via {key}
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={() => setNotifications(prev => ({
                    ...prev,
                    [key]: !prev[key]
                  }))}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-lg font-medium mb-4">Alert Settings</h3>
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium mb-2">Low Stock Alerts</h4>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Trigger alert when stock falls below:</span>
              <input type="number" className="w-24 border rounded-lg px-3 py-2" defaultValue="10" />
              <span className="text-sm text-gray-600">units</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  const renderSystemSettings = () => (
    <div className="space-y-8">
      <section className="border-b pb-6">
        <h3 className="text-lg font-medium mb-4">System Maintenance</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
            <div className="flex items-center gap-3">
              <FiClock className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="font-medium text-yellow-600">Next Maintenance Window</p>
                <p className="text-sm text-yellow-700">Sunday, 2:00 AM - 4:00 AM</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg">
              Reschedule
            </button>
          </div>
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-3">
              <FiSave className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-medium text-blue-600">Backup Settings</p>
                <p className="text-sm text-blue-700">Daily automatic backup at 1:00 AM</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg">
              Configure
            </button>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-medium mb-4">System Health</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <FiShield className="w-5 h-5 text-green-600" />
              <h4 className="font-medium text-green-600">Security Status</h4>
            </div>
            <p className="text-sm text-green-700">All systems secure</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <FiGlobe className="w-5 h-5 text-blue-600" />
              <h4 className="font-medium text-blue-600">System Version</h4>
            </div>
            <p className="text-sm text-blue-700">v2.1.0 (Latest)</p>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminNavbar />
        <div className="flex-1 bg-gray-100 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Settings</h1>
            <p className="text-sm text-gray-600">Manage your pharmacy system settings</p>
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
            {activeTab === 'general' && renderGeneralSettings()}
            {activeTab === 'security' && renderSecuritySettings()}
            {activeTab === 'notifications' && renderNotificationSettings()}
            {activeTab === 'system' && renderSystemSettings()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
