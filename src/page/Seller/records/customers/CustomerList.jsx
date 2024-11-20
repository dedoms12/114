import { useState } from 'react';
import NavbarSeller from '../../components/navbarSeller';
import { FiSearch, FiFilter, FiMail, FiPhone, FiShoppingBag, FiCalendar, FiMap, 
         FiClock, FiDollarSign, FiGrid, FiList, FiDownload, FiEye, FiUsers, FiUserCheck, 
         FiUserPlus, FiUser } from 'react-icons/fi';
import { 
  storeData, 
  sortOptions, 
  statuses, 
  branches,
  getCustomerWithStats 
} from '../../data/store-data';
import CustomerModal from '../../components/CustomerModal';
import { orderData } from '../orders/order-data';
import { useNavigate } from 'react-router-dom';
import { useOrderCustomer } from '../../context/OrderCustomerContext';

const CustomerList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedSort, setSelectedSort] = useState('recent');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [viewMode, setViewMode] = useState('list');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [spentRange, setSpentRange] = useState({ min: '', max: '' });
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const customersPerPage = 10;
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const navigate = useNavigate();
  const { getCustomerOrders } = useOrderCustomer();

  // Use storeData.customers.map() with getCustomerWithStats
  const customers = storeData.customers.map(c => getCustomerWithStats(c.id));

  // Filter customers based on all criteria
  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || customer.status === selectedStatus;
    const matchesSpent = (!spentRange.min || customer.totalSpent >= parseFloat(spentRange.min)) &&
                        (!spentRange.max || customer.totalSpent <= parseFloat(spentRange.max));
    const matchesLocation = selectedLocation === 'All Locations' || 
                           customer.purchaseLocations.includes(selectedLocation);
    const matchesDate = (!dateRange.start || new Date(customer.joinDate) >= new Date(dateRange.start)) &&
                       (!dateRange.end || new Date(customer.joinDate) <= new Date(dateRange.end));
    
    return matchesSearch && matchesStatus && matchesSpent && matchesLocation && matchesDate;
  });

  // Sort customers
  const sortedCustomers = [...filteredCustomers].sort((a, b) => {
    switch (selectedSort) {
      case 'spent-high':
        return b.totalSpent - a.totalSpent;
      case 'orders-high':
        return b.totalOrders - a.totalOrders;
      case 'alpha':
        return a.name.localeCompare(b.name);
      default:
        return new Date(b.lastOrder) - new Date(a.lastOrder);
    }
  });

  // Pagination
  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = sortedCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer);
  const totalPages = Math.ceil(sortedCustomers.length / customersPerPage);

  const handleViewCustomer = (customer) => {
    const customerWithOrders = {
      ...customer,
      orders: getCustomerOrders(customer.id)
    };
    setSelectedCustomer(customerWithOrders);
    setShowCustomerModal(true);
  };

  const handleViewOrders = (customer) => {
    navigate('/seller/records/orders', {
      state: { 
        customerId: customer.id,
        customerName: customer.name
      }
    });
  };

  const handleExportCustomers = () => {
    const csvContent = customers.map(customer => {
      return [
        customer.name,
        customer.email,
        customer.phone,
        customer.totalOrders,
        customer.totalSpent,
        customer.status,
        customer.location,
        customer.joinDate
      ].join(',');
    });
    
    const header = ['Name,Email,Phone,Total Orders,Total Spent,Status,Location,Join Date\n'];
    const csv = [...header, ...csvContent].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'customers.csv';
    a.click();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarSeller />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with Stats */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Customer Management</h1>
              <p className="text-sm text-gray-500">Track and manage your customer relationships</p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center px-4 py-2 text-sm text-gray-600 bg-white rounded-md border border-gray-200 hover:bg-gray-50">
                <FiDownload className="mr-2" /> Export
              </button>
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center px-4 py-2 text-sm text-white bg-[#4C9BF5] rounded-md hover:bg-blue-600"
              >
                <FiFilter className="mr-2" /> Filters
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { label: 'Total Customers', value: customers.length, icon: FiUsers },
              { label: 'Active Customers', value: customers.filter(c => c.status === 'active').length, icon: FiUserCheck },
              { label: 'New This Month', value: 12, icon: FiUserPlus },
              { label: 'Total Revenue', value: `₱${customers.reduce((acc, curr) => acc + curr.totalSpent, 0).toLocaleString()}`, icon: FiDollarSign }
            ].map((stat, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                    <p className="text-2xl font-semibold mt-1">{stat.value}</p>
                  </div>
                  <stat.icon className="w-8 h-8 text-[#4C9BF5]" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Advanced Filters Panel */}
        {showFilters && (
          <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Date Range Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Join Date Range</label>
                <div className="flex gap-2">
                  <input
                    type="date"
                    value={dateRange.start}
                    onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-md"
                  />
                  <input
                    type="date"
                    value={dateRange.end}
                    onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-md"
                  />
                </div>
              </div>

              {/* Spent Range Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Total Spent Range</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={spentRange.min}
                    onChange={(e) => setSpentRange(prev => ({ ...prev, min: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-md"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={spentRange.max}
                    onChange={(e) => setSpentRange(prev => ({ ...prev, max: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-md"
                  />
                </div>
              </div>

              {/* Branch Location Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Branch Location</label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md"
                >
                  {branches.map(branch => (
                    <option key={branch} value={branch}>{branch}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Filter Actions */}
            <div className="flex justify-end mt-4 gap-2">
              <button
                onClick={() => {
                  setDateRange({ start: '', end: '' });
                  setSpentRange({ min: '', max: '' });
                  setSelectedLocation('All Locations');
                  setSelectedStatus('all');
                }}
                className="px-4 py-2 text-sm text-gray-600 bg-white rounded-md border border-gray-200 hover:bg-gray-50"
              >
                Reset Filters
              </button>
              <button
                onClick={() => setShowFilters(false)}
                className="px-4 py-2 text-sm text-white bg-[#4C9BF5] rounded-md hover:bg-blue-600"
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}

        {/* Customer Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact Info
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Orders
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Spent
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-[#4C9BF5] flex items-center justify-center text-white">
                            {customer.name.charAt(0)}
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                          <div className="text-sm text-gray-500">Joined {new Date(customer.joinDate).toLocaleDateString()}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{customer.email}</div>
                      <div className="text-sm text-gray-500">{customer.phone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {customer.totalOrders} orders
                        {customer.totalOrders > 0 && (
                          <button
                            onClick={() => handleViewOrders(customer)}
                            className="ml-2 text-blue-600 hover:text-blue-800 text-xs"
                          >
                            View Orders
                          </button>
                        )}
                      </div>
                      <div className="text-sm text-gray-500">
                        Last: {customer.lastOrder ? new Date(customer.lastOrder).toLocaleDateString() : 'Never'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-[#FF6B6B]">₱{customer.totalSpent.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${customer.status === 'active' ? 'bg-green-100 text-green-800' : 
                          customer.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
                          customer.status === 'new' ? 'bg-blue-100 text-blue-800' :
                          'bg-red-100 text-red-800'}`}>
                        {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <button 
                        onClick={() => handleViewCustomer(customer)} 
                        className="text-[#4C9BF5] hover:text-blue-700 mr-3"
                        title="View Details"
                      >
                        <FiEye size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{indexOfFirstCustomer + 1}</span> to{' '}
                  <span className="font-medium">
                    {Math.min(indexOfLastCustomer, filteredCustomers.length)}
                  </span>{' '}
                  of <span className="font-medium">{filteredCustomers.length}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                    <button
                      key={number}
                      onClick={() => setCurrentPage(number)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium
                        ${currentPage === number 
                          ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                        }`}
                    >
                      {number}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showCustomerModal && (
        <CustomerModal 
          customer={selectedCustomer} 
          onClose={() => setShowCustomerModal(false)} 
        />
      )}
    </div>
  );
};

export default CustomerList; 