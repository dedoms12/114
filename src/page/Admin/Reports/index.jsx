import AdminNavbar from '../components/AdminNavbar';
import AdminSidebar from '../components/AdminSidebar';
import { FiDollarSign, FiUsers, FiBarChart2, FiArrowRight, FiCheckCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

const AdminReports = () => {
  const reports = [
    {
      icon: FiBarChart2,
      title: 'Sales Analytics',
      description: 'View detailed sales performance and trends',
      stats: [
        { label: 'Total Sales', value: '₱855,875' },
        { label: 'Monthly Growth', value: '+12.5%' },
        { label: 'Total Orders', value: '523' }
      ],
      link: '/admin/reports/sales',
      color: 'blue'
    },
    {
      icon: FiUsers,
      title: 'User Statistics',
      description: 'Monitor user registration and activity',
      stats: [
        { label: 'Total Users', value: '1,234' },
        { label: 'Active Users', value: '892' },
        { label: 'New This Month', value: '45' }
      ],
      link: '/admin/reports/users',
      color: 'green'
    },
    {
      icon: FiCheckCircle,
      title: 'Store Verification',
      description: 'Monitor and verify pharmacy store applications',
      stats: [
        { label: 'Pending', value: '15' },
        { label: 'Verified', value: '234' },
        { label: 'Rejected', value: '12' }
      ],
      link: '/admin/reports/store-verification',
      color: 'purple'
    }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminNavbar />
        <div className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Reports Dashboard</h1>
            <p className="mt-2 text-gray-600">Access and analyze pharmacy performance metrics</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {reports.map((report, index) => (
              <Link
                key={index}
                to={report.link}
                data-tooltip-id={`report-card-${index}`}
                data-tooltip-content={`View detailed ${report.title.toLowerCase()} and analytics`}
                className="block bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 rounded-lg bg-${report.color}-50`}>
                      <report.icon className={`w-6 h-6 text-${report.color}-600`} />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">{report.title}</h2>
                      <p className="text-sm text-gray-600">{report.description}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    {report.stats.map((stat, statIndex) => (
                      <div key={statIndex} className="text-center">
                        <div className="text-lg font-bold text-gray-900">{stat.value}</div>
                        <div className="text-sm text-gray-600">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-end text-sm font-medium text-blue-600">
                    View Details <FiArrowRight className="ml-2" />
                  </div>
                </div>
                <Tooltip id={`report-card-${index}`} place="top" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReports; 
