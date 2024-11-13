import AdminNavbar from '../components/AdminNavbar';
import AdminSidebar from '../components/AdminSidebar';
import { FiDollarSign, FiCreditCard } from 'react-icons/fi';

const AdminReports = () => {
  const reports = [
    {
      icon: FiDollarSign,
      amount: 'Rs. 8,55,875',
      label: 'Total Sales Report',
      action: 'View Detailed Report',
      buttonClass: 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100'
    },
    {
      icon: FiCreditCard,
      amount: '523',
      label: 'Payment Report',
      action: 'View Detailed Report',
      buttonClass: 'bg-green-50 text-green-600 hover:bg-green-100'
    }
  ];

  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminNavbar />
        <div className="flex-1 bg-gray-100 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Reports</h1>
            <p className="text-sm text-gray-600">Overall reports related to the pharmacy.</p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {reports.map((report, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex flex-col">
                  <div className="flex items-center gap-4 mb-4">
                    <report.icon className="w-8 h-8 text-gray-600" />
                    <div>
                      <div className="text-2xl font-bold">{report.amount}</div>
                      <div className="text-sm text-gray-600">{report.label}</div>
                    </div>
                  </div>
                  <button className={`w-full py-2 rounded-lg text-sm font-medium ${report.buttonClass}`}>
                    {report.action} →
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

export default AdminReports; 