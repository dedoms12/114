import AdminNavbar from '../components/AdminNavbar';
import AdminSidebar from '../components/AdminSidebar';
import { FiShield, FiUserCheck, FiPackage, FiAlertOctagon, FiTrendingUp, FiTrendingDown } from 'react-icons/fi';
import { useState } from 'react';
import { LineChart, BarChart } from '@mui/x-charts';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const monitoringStats = [
    {
      icon: FiUserCheck,
      status: '156',
      label: 'Pending Verifications',
      description: 'Seller accounts awaiting approval',
      color: 'yellow',
      action: 'Review Now',
      path: '/admin/reports/store-verification',
      tooltip: 'View and manage pending pharmacy verifications'
    },
    {
      icon: FiPackage,
      status: '298',
      label: 'Active Medicines',
      description: 'Currently listed products',
      color: 'blue',
      action: 'View List',
      path: '/admin/inventory/medicines',
      tooltip: 'Manage active medicine listings and inventory'
    },
    {
      icon: FiShield,
      status: '45',
      label: 'Quality Checks',
      description: 'Products requiring review',
      color: 'green',
      action: 'Review',
      path: '/admin/inventory',
      tooltip: 'Review products flagged for quality inspection'
    },
    {
      icon: FiAlertOctagon,
      status: '3',
      label: 'Reported Items',
      description: 'Products flagged by users',
      color: 'red',
      action: 'Investigate',
      path: '/admin/inventory/blocklist',
      tooltip: 'Investigate reported products and take action'
    }
  ];

  const criticalAlerts = [
    {
      type: 'Verification',
      message: 'New pharmacy registration requires document verification',
      time: '10 minutes ago',
      priority: 'high',
      action: 'Verify Now'
    },
    {
      type: 'Product',
      message: 'Multiple reports on medicine quality concerns',
      time: '1 hour ago',
      priority: 'high',
      action: 'Review'
    },
    {
      type: 'Compliance',
      message: 'Seller license expiring in 5 days',
      time: '2 hours ago',
      priority: 'medium',
      action: 'Notify'
    }
  ];

  const verificationData = {
    dates: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'New Pharmacy Registrations',
        data: [32, 45, 38, 52, 48, 60],
        color: '#818CF8' // indigo-400
      },
      {
        label: 'Document Verifications',
        data: [28, 40, 35, 48, 42, 55],
        color: '#34D399' // emerald-400
      },
      {
        label: 'License Validations',
        data: [25, 38, 32, 45, 40, 52],
        color: '#60A5FA' // blue-400
      },
      {
        label: 'Rejected Applications',
        data: [4, 5, 3, 4, 6, 5],
        color: '#F87171' // red-400
      }
    ]
  };

  const verificationBreakdown = {
    total: 298,
    data: [
      { value: 60, label: 'Fully Verified', color: '#34D399' },
      { value: 25, label: 'Pending Documents', color: '#FBBF24' },
      { value: 10, label: 'License Expired', color: '#F87171' },
      { value: 5, label: 'Under Review', color: '#818CF8' }
    ]
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminNavbar />
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Control Center</h1>
                <p className="text-sm text-gray-600">Monitor and manage platform safety & compliance</p>
              </div>
              <div className="flex items-center gap-3">
                <select className="px-4 py-2 bg-white border rounded-lg text-sm">
                  <option>Last 24 Hours</option>
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                </select>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700">
                  Export Summary
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {monitoringStats.map((stat, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => navigate(stat.path)}
                  data-tooltip-id={`stat-tooltip-${index}`}
                  data-tooltip-content={stat.tooltip}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg bg-${stat.color}-50`}>
                      <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="text-2xl font-bold text-gray-900">{stat.status}</div>
                    <div className="text-sm font-medium text-gray-900">{stat.label}</div>
                    <div className="text-xs text-gray-500">{stat.description}</div>
                  </div>
                  <button 
                    className={`w-full py-2 text-sm font-medium text-${stat.color}-600 bg-${stat.color}-50 rounded-lg hover:bg-${stat.color}-100`}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(stat.path);
                    }}
                  >
                    {stat.action}
                  </button>
                  <Tooltip id={`stat-tooltip-${index}`} place="top" />
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-lg font-semibold">Verification Activity</h2>
                    <p className="text-sm text-gray-500">Pharmacy registration and verification progress</p>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      className="px-3 py-1 text-sm bg-indigo-50 text-indigo-600 rounded-lg font-medium"
                      data-tooltip-id="chart-period-tooltip"
                      data-tooltip-content="View daily verification statistics"
                    >
                      Daily
                    </button>
                    <button 
                      className="px-3 py-1 text-sm bg-gray-100 rounded-lg"
                      data-tooltip-id="chart-period-tooltip"
                      data-tooltip-content="View weekly verification statistics"
                    >
                      Weekly
                    </button>
                    <button 
                      className="px-3 py-1 text-sm bg-gray-100 rounded-lg"
                      data-tooltip-id="chart-period-tooltip"
                      data-tooltip-content="View monthly verification statistics"
                    >
                      Monthly
                    </button>
                    <Tooltip id="chart-period-tooltip" place="top" />
                  </div>
                </div>
                
                <div className="grid grid-cols-4 gap-4 mb-6">
                  {verificationBreakdown.data.map((item, index) => (
                    <div key={index} className="text-center">
                      <div className="text-2xl font-bold" style={{ color: item.color }}>
                        {item.value}%
                      </div>
                      <div className="text-sm text-gray-600">{item.label}</div>
                    </div>
                  ))}
                </div>

                <div className="h-80">
                  <LineChart
                    series={verificationData.datasets.map(dataset => ({
                      data: dataset.data,
                      label: dataset.label,
                      color: dataset.color,
                      showMark: true,
                      curve: "natural",
                      area: true,
                      stack: false,
                      opacity: 0.2
                    }))}
                    xAxis={[{
                      data: verificationData.dates,
                      scaleType: 'band',
                      tickLabelStyle: {
                        angle: 0,
                        textAnchor: 'middle',
                      }
                    }]}
                    yAxis={[{
                      tickMinStep: 1,
                      tickLabelStyle: {
                        fontSize: 12
                      }
                    }]}
                    sx={{
                      '.MuiLineElement-root': {
                        strokeWidth: 2,
                      },
                      '.MuiAreaElement-root': {
                        fillOpacity: 0.1
                      }
                    }}
                    height={300}
                    margin={{ top: 20, right: 20, bottom: 30, left: 40 }}
                    legend={{
                      direction: 'row',
                      position: { vertical: 'top', horizontal: 'middle' },
                      padding: 20,
                      itemMarkWidth: 10,
                      itemMarkHeight: 2,
                      gap: 15
                    }}
                  />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Critical Alerts</h2>
                  <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                    View All
                  </button>
                </div>
                <div className="space-y-4">
                  {criticalAlerts.map((alert, index) => (
                    <div 
                      key={index} 
                      className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
                      onClick={() => {
                        switch(alert.type) {
                          case 'Verification':
                            navigate('/admin/reports/store-verification');
                            break;
                          case 'Product':
                            navigate('/admin/inventory/medicines');
                            break;
                          case 'Compliance':
                            navigate('/admin/reports/users');
                            break;
                        }
                      }}
                      data-tooltip-id={`alert-tooltip-${index}`}
                      data-tooltip-content="Click to view details and take action"
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          alert.priority === 'high' ? 'bg-red-500' : 'bg-yellow-500'
                        }`} />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-gray-900">{alert.type}</span>
                            <span className="text-xs text-gray-500">{alert.time}</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{alert.message}</p>
                          <button className="text-xs font-medium text-indigo-600 hover:text-indigo-700">
                            {alert.action} 
                          </button>
                        </div>
                      </div>
                      <Tooltip id={`alert-tooltip-${index}`} place="left" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 