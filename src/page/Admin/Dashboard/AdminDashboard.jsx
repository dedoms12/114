import AdminNavbar from '../components/AdminNavbar';
import AdminSidebar from '../components/AdminSidebar';
import { FiDownload, FiFileText } from 'react-icons/fi';
import { useState, useRef, useEffect } from 'react';

// Custom Excel Icon component
const ExcelIcon = () => (
  <svg 
    width="16" 
    height="16" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6" />
    <path d="M8 13h2" />
    <path d="M8 17h2" />
    <path d="M14 13h2" />
    <path d="M14 17h2" />
  </svg>
);

const DownloadDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDownload = (format) => {
    // Add download logic here based on format
    console.log(`Downloading ${format} report`);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border hover:bg-gray-50"
      >
        <FiDownload className="w-5 h-5" />
        <span>Download Report</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border overflow-hidden z-50">
          <button
            onClick={() => handleDownload('excel')}
            className="flex items-center gap-2 w-full px-4 py-2 text-gray-700 hover:bg-gray-50"
          >
            <ExcelIcon className="w-4 h-4 text-green-600" />
            Excel
          </button>
          <button
            onClick={() => handleDownload('pdf')}
            className="flex items-center gap-2 w-full px-4 py-2 text-gray-700 hover:bg-gray-50"
          >
            <FiFileText className="w-4 h-4 text-red-600" />
            PDF
          </button>
        </div>
      )}
    </div>
  );
};

const AdminDashboard = () => {
  const stats = [
    {
      icon: '🛡️',
      status: 'Good',
      label: 'Inventory Status',
      action: 'View Detailed Report',
      color: 'green'
    },
    {
      icon: '💰',
      status: 'Rs. 8,55,875',
      label: 'Revenue',
      subLabel: 'Jan 2022',
      action: 'View Detailed Report',
      color: 'yellow'
    },
    {
      icon: '💊',
      status: '298',
      label: 'Medicines Available',
      action: 'Visit Inventory',
      color: 'blue'
    },
    {
      icon: '⚠️',
      status: '01',
      label: 'Medicine Shortage',
      action: 'Resolve Now',
      color: 'red'
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
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <p className="text-sm text-gray-600">A quick data overview of the inventory.</p>
            </div>
            <DownloadDropdown />
          </div>

          <div className="grid grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className={`bg-white p-6 rounded-lg border-t-4 border-${stat.color}-500`}>
                <div className="text-center">
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-xl font-bold">{stat.status}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                  {stat.subLabel && (
                    <div className="text-sm text-gray-500">{stat.subLabel}</div>
                  )}
                  <button className={`mt-4 text-${stat.color}-600 text-sm hover:underline`}>
                    {stat.action} →
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add the remaining dashboard sections here */}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 