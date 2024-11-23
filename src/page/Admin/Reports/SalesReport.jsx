import AdminNavbar from '../components/AdminNavbar';
import AdminSidebar from '../components/AdminSidebar';
import { 
  FiDownload, FiTrendingUp, FiTrendingDown, 
  FiCalendar, FiDollarSign, FiShoppingBag, FiPackage,
  FiFilter
} from 'react-icons/fi';
import { useState } from 'react';
import { LineChart, BarChart } from '@mui/x-charts';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

const SalesReport = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedDateRange, setSelectedDateRange] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const summaryCards = [
    {
      title: 'Total Revenue',
      value: '₱178,325',
      change: '+15.3%',
      icon: FiDollarSign,
      color: 'blue',
      trend: 'up'
    },
    {
      title: 'Total Orders',
      value: '490',
      change: '+7.8%',
      icon: FiShoppingBag,
      color: 'green',
      trend: 'up'
    },
    {
      title: 'Average Order Value',
      value: '₱364',
      change: '+5.2%',
      icon: FiPackage,
      color: 'purple',
      trend: 'up'
    }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminNavbar />
        <div className="flex-1 overflow-auto p-6">
          {/* Header Section with Enhanced Styling */}
          <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Sales Analytics</h1>
                <p className="text-sm text-gray-600 mt-1">Track and analyze sales performance metrics</p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <button 
                  data-tooltip-id="filter-tooltip"
                  data-tooltip-content="Show advanced filters"
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-50"
                >
                  <FiFilter className="w-4 h-4" />
                  Filters
                </button>
                <div className="relative">
                  <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="date"
                    className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    value={selectedDateRange}
                    onChange={(e) => setSelectedDateRange(e.target.value)}
                  />
                </div>
                <select
                  className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
                <button
                  data-tooltip-id="export-tooltip"
                  data-tooltip-content="Export sales report"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white"
                >
                  <FiDownload className="w-4 h-4" />
                  Export
                </button>
              </div>
            </div>
          </div>

          {/* Summary Cards with Enhanced Visual Design */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {summaryCards.map((card, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-${card.color}-50`}>
                    <card.icon className={`w-6 h-6 text-${card.color}-600`} />
                  </div>
                  <div className="flex items-center gap-1">
                    {card.trend === 'up' ? 
                      <FiTrendingUp className="w-4 h-4 text-green-500" /> : 
                      <FiTrendingDown className="w-4 h-4 text-red-500" />
                    }
                    <span className={`text-sm font-semibold ${
                      card.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {card.change}
                    </span>
                  </div>
                </div>
                <h3 className="text-base font-medium text-gray-600">{card.title}</h3>
                <p className="text-2xl font-bold mt-1">{card.value}</p>
              </div>
            ))}
          </div>

          {/* Charts Section with Improved Layout */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Sales Trend Chart */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Sales Trend</h3>
                  <p className="text-sm text-gray-600">Daily revenue overview</p>
                </div>
                <select className="px-3 py-2 border rounded-lg text-sm bg-gray-50">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                </select>
              </div>
              <div className="h-[300px]">
                <LineChart
                  xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7] }]}
                  series={[{
                    data: [65000, 72000, 68000, 85875, 82000, 91000, 85875],
                    curve: "natural",
                    area: true,
                    color: "#3b82f6",
                    showInLegend: true,
                    label: "Revenue"
                  }]}
                  width={500}
                  height={300}
                  margin={{ top: 20, right: 20, bottom: 20, left: 40 }}
                />
              </div>
            </div>

            {/* Category Distribution */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Sales by Category</h3>
                  <p className="text-sm text-gray-600">Product category distribution</p>
                </div>
              </div>
              <div className="h-[300px]">
                <BarChart
                  xAxis={[{ 
                    scaleType: 'band', 
                    data: ['Medicines', 'Medical Supplies', 'Equipment'] 
                  }]}
                  series={[{ 
                    data: [150, 54, 30],
                    color: "#3b82f6"
                  }]}
                  width={500}
                  height={300}
                  margin={{ top: 20, right: 20, bottom: 20, left: 40 }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Tooltip id="filter-tooltip" place="top" />
      <Tooltip id="export-tooltip" place="top" />
    </div>
  );
};

export default SalesReport;
