import AdminNavbar from '../components/AdminNavbar';
import AdminSidebar from '../components/AdminSidebar';
import { FiDownload, FiTrendingUp, FiTrendingDown } from 'react-icons/fi';
import { useState } from 'react';
import { LineChart, BarChart } from '@mui/x-charts';

const SalesReport = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');

  const salesData = [
    {
      period: 'January 2024',
      totalSales: '₱85,875',
      orders: 234,
      growth: '+12.5%',
      isPositive: true,
      dailySales: [65000, 72000, 68000, 85875, 82000, 91000, 85875],
      ordersByCategory: {
        medicines: 150,
        supplies: 54,
        equipment: 30
      }
    },
    {
      period: 'February 2024',
      totalSales: '₱92,450',
      orders: 256,
      growth: '+7.6%',
      isPositive: true,
      dailySales: [75000, 82000, 88000, 92450, 89000, 94000, 92450],
      ordersByCategory: {
        medicines: 165,
        supplies: 61,
        equipment: 30
      }
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
              <h1 className="text-2xl font-bold">Sales Report</h1>
              <p className="text-sm text-gray-600">Overview of pharmacy sales performance</p>
            </div>
            <div className="flex gap-4">
              <select
                className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
              >
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100">
                <FiDownload />
                Export Report
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 mb-6">
            {salesData.map((data, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-lg font-semibold">{data.period}</h3>
                    <div className="mt-2 space-y-1">
                      <p className="text-2xl font-bold">{data.totalSales}</p>
                      <p className="text-sm text-gray-600">{data.orders} Orders</p>
                    </div>
                  </div>
                  <div className={`flex items-center ${data.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {data.isPositive ? <FiTrendingUp className="w-5 h-5 mr-1" /> : <FiTrendingDown className="w-5 h-5 mr-1" />}
                    <span className="font-medium">{data.growth}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-600 mb-2">Daily Sales Trend</h4>
                  <LineChart
                    xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7] }]}
                    series={[
                      {
                        data: data.dailySales,
                        curve: "natural",
                        area: true,
                      }
                    ]}
                    width={800}
                    height={200}
                    margin={{ top: 20, right: 20, bottom: 20, left: 40 }}
                  />
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-600 mb-2">Orders by Category</h4>
                  <BarChart
                    xAxis={[{ 
                      scaleType: 'band', 
                      data: ['Medicines', 'Medical Supplies', 'Equipment'] 
                    }]}
                    series={[{ 
                      data: [
                        data.ordersByCategory.medicines,
                        data.ordersByCategory.supplies,
                        data.ordersByCategory.equipment
                      ] 
                    }]}
                    width={800}
                    height={200}
                    margin={{ top: 20, right: 20, bottom: 20, left: 40 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesReport;
