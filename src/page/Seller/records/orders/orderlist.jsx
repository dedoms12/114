import React, { useState, useEffect } from 'react';
import NavbarSeller from '../../components/navbarSeller';
import { FiSearch, FiFilter, FiDownload, FiEye, FiPackage, FiDollarSign, 
         FiClock, FiTruck, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { 
  storeData, 
  sortOptions, 
  statuses, 
  branches,
  getOrderWithCustomer 
} from '../../data/store-data';
import OrderModal from '../../components/OrderModal';
import { customerData } from '../customers/customer-data';
import { useNavigate, useLocation } from 'react-router-dom';
import { useOrderCustomer } from '../../context/OrderCustomerContext';

const OrderList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedSort, setSelectedSort] = useState('recent');
  const [selectedBranch, setSelectedBranch] = useState('All Branches');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const ordersPerPage = 5;
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [bulkAction, setBulkAction] = useState('');
  const [amountRange, setAmountRange] = useState({ min: '', max: '' });
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('all');
  const [advancedSearch, setAdvancedSearch] = useState({
    orderId: '',
    customer: '',
    product: '',
    minAmount: '',
    maxAmount: '',
    status: 'all',
    branch: 'All Branches',
    dateFrom: '',
    dateTo: ''
  });
  const [orderDataState, setOrderDataState] = useState(storeData.orders);
  const navigate = useNavigate();
  const location = useLocation();
  const { getOrderCustomer } = useOrderCustomer();

  useEffect(() => {
    // Handle navigation from customer list
    if (location.state?.customerId) {
      setAdvancedSearch(prev => ({
        ...prev,
        customer: location.state.customerName
      }));
    }
  }, [location]);

  // Quick stats
  const stats = [
    {
      label: 'Total Orders',
      value: storeData.orders.length,
      icon: FiPackage,
      color: 'text-blue-500'
    },
    {
      label: 'Pending Orders',
      value: storeData.orders.filter(order => order.status === 'Pending').length,
      icon: FiClock,
      color: 'text-yellow-500'
    },
    {
      label: 'Total Revenue',
      value: `₱${storeData.orders.reduce((acc, order) => acc + order.totalAmount, 0).toLocaleString()}`,
      icon: FiDollarSign,
      color: 'text-green-500'
    },
    {
      label: 'Delivered Orders',
      value: storeData.orders.filter(order => order.status === 'Delivered').length,
      icon: FiCheckCircle,
      color: 'text-green-500'
    }
  ];

  // Enhanced getCustomerName function
  const getCustomerName = (customerId) => {
    const customer = storeData.customers.find(c => c.id === customerId);
    return {
      name: customer ? customer.name : 'Unknown Customer',
      email: customer ? customer.email : '',
      phone: customer ? customer.phone : ''
    };
  };

  // Update the filtered orders to include customer details
  const filteredOrders = orderDataState.map(order => {
    const customerInfo = getCustomerName(order.customerId);
    return {
      ...order,
      customerName: customerInfo.name,
      customerEmail: customerInfo.email,
      customerPhone: customerInfo.phone
    };
  }).filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    const matchesBranch = selectedBranch === 'All Branches' || order.branch === selectedBranch;
    
    const matchesDateRange = (!dateRange.start || new Date(order.orderDate) >= new Date(dateRange.start)) &&
                            (!dateRange.end || new Date(order.orderDate) <= new Date(dateRange.end));
    
    const matchesAmountRange = (!amountRange.min || order.totalAmount >= Number(amountRange.min)) &&
                              (!amountRange.max || order.totalAmount <= Number(amountRange.max));
    
    const matchesPaymentMethod = selectedPaymentMethod === 'all' || 
                                order.paymentMethod === selectedPaymentMethod;

    return matchesSearch && matchesStatus && matchesBranch && 
           matchesDateRange && matchesAmountRange && matchesPaymentMethod;
  });

  // Sorting logic
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    switch (selectedSort) {
      case 'recent':
        return new Date(b.orderDate) - new Date(a.orderDate);
      case 'oldest':
        return new Date(a.orderDate) - new Date(b.orderDate);
      case 'amount-high':
        return b.totalAmount - a.totalAmount;
      case 'amount-low':
        return a.totalAmount - b.totalAmount;
      case 'status':
        return a.status.localeCompare(b.status);
      default:
        return 0;
    }
  });

  // Pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = sortedOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(sortedOrders.length / ordersPerPage);

  // Export function
  const handleExportOrders = () => {
    const csvContent = storeData.orders.map(order => {
      return [
        order.id,
        order.customerName,
        order.products.map(p => `${p.name}(${p.quantity})`).join(';'),
        order.totalAmount,
        order.status,
        order.orderDate,
        order.branch,
        order.paymentMethod
      ].join(',');
    });
    
    const header = ['Order ID,Customer,Products,Total Amount,Status,Order Date,Branch,Payment Method\n'];
    const csv = [...header, ...csvContent].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'orders.csv';
    a.click();
  };

  // Modify handleViewOrder to not rely on CustomerDetails
  const handleViewOrder = (order) => {
    const customer = getOrderCustomer(order.customerId);
    setSelectedOrder({
      ...order,
      customer
    });
    setShowOrderModal(true);
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = orderDataState.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrderDataState(updatedOrders);
    setShowOrderModal(false);
  };

  const handleBulkAction = async () => {
    if (!bulkAction || selectedOrders.length === 0) return;

    try {
      switch (bulkAction) {
        case 'mark-delivered':
          await handleBulkStatusUpdate('Delivered');
          break;
        case 'mark-processing':
          await handleBulkStatusUpdate('Processing');
          break;
        case 'mark-shipped':
          await handleBulkStatusUpdate('Shipped');
          break;
        case 'mark-cancelled':
          await handleBulkStatusUpdate('Cancelled');
          break;
        case 'export':
          handleBulkExport();
          break;
        default:
          break;
      }
      
      // Reset selections after action
      setSelectedOrders([]);
      setBulkAction('');
    } catch (error) {
      console.error('Bulk action failed:', error);
      // Add error handling UI here
    }
  };

  const handleBulkStatusUpdate = async (newStatus) => {
    const updatedOrders = orderDataState.map(order => 
      selectedOrders.includes(order.id) 
        ? { ...order, status: newStatus }
        : order
    );
    setOrderDataState(updatedOrders);
    setSelectedOrders([]);
    setBulkAction('');
  };

  const handleBulkExport = () => {
    const selectedOrdersData = storeData.orders.filter(order => selectedOrders.includes(order.id));
    const csvContent = selectedOrdersData.map(order => {
      return [
        order.id,
        order.customerName,
        order.products.map(p => `${p.name}(${p.quantity})`).join(';'),
        order.totalAmount,
        order.status,
        order.orderDate,
        order.branch,
        order.paymentMethod
      ].join(',');
    });
    
    const header = ['Order ID,Customer,Products,Total Amount,Status,Order Date,Branch,Payment Method\n'];
    const csv = [...header, ...csvContent].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `selected-orders-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  // Add these functions after the existing handlers
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedOrders(currentOrders.map(order => order.id));
    } else {
      setSelectedOrders([]);
    }
  };

  const handleSelectOrder = (orderId) => {
    setSelectedOrders(prev => 
      prev.includes(orderId) 
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  };

  // Add this status configuration object
  const statusConfig = {
    Pending: {
      color: 'bg-yellow-100 text-yellow-800',
      icon: FiClock,
      iconColor: 'text-yellow-500'
    },
    Processing: {
      color: 'bg-blue-100 text-blue-800',
      icon: FiPackage,
      iconColor: 'text-blue-500'
    },
    Shipped: {
      color: 'bg-purple-100 text-purple-800',
      icon: FiTruck,
      iconColor: 'text-purple-500'
    },
    Delivered: {
      color: 'bg-green-100 text-green-800',
      icon: FiCheckCircle,
      iconColor: 'text-green-500'
    },
    Cancelled: {
      color: 'bg-red-100 text-red-800',
      icon: FiXCircle,
      iconColor: 'text-red-500'
    }
  };

  // Add payment methods array
  const paymentMethods = ['Cash', 'Credit Card', 'GCash', 'Bank Transfer'];

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarSeller />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header and Stats */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Order Management</h1>
              <p className="text-sm text-gray-500">Track and manage all orders across branches</p>
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

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                    <p className="text-2xl font-semibold mt-1">{stat.value}</p>
                  </div>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filters Section */}
        {showFilters && (
          <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Date Range Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Order Date Range</label>
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

              {/* Status Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Order Status</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md"
                >
                  <option value="all">All Statuses</option>
                  {statuses.order.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              {/* Branch Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Branch</label>
                <select
                  value={selectedBranch}
                  onChange={(e) => setSelectedBranch(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md"
                >
                  <option value="All Branches">All Branches</option>
                  {branches.map(branch => (
                    <option key={branch} value={branch}>{branch}</option>
                  ))}
                </select>
              </div>

              {/* Amount Range Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Order Amount Range
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={amountRange.min}
                    onChange={(e) => setAmountRange(prev => ({ ...prev, min: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-md"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={amountRange.max}
                    onChange={(e) => setAmountRange(prev => ({ ...prev, max: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-md"
                  />
                </div>
              </div>

              {/* Payment Method Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                <select
                  value={selectedPaymentMethod}
                  onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md"
                >
                  <option value="all">All Payment Methods</option>
                  {paymentMethods.map(method => (
                    <option key={method} value={method}>{method}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Filter Actions */}
            <div className="flex justify-end mt-4 gap-2">
              <button
                onClick={() => {
                  setDateRange({ start: '', end: '' });
                  setSelectedStatus('all');
                  setSelectedBranch('All Branches');
                  setAmountRange({ min: '', max: '' });
                  setSelectedPaymentMethod('all');
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

        {/* Search and Sort Bar */}
        <div className="flex justify-between items-center mb-4">
          <div className="relative w-96">
            <input
              type="text"
              placeholder="Search by order ID or customer name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
          </div>
          
          <div className="flex items-center gap-4">
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {sortOptions.order.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Add this before the table */}
        <div className="mb-4 flex items-center gap-4">
          <select
            value={bulkAction}
            onChange={(e) => setBulkAction(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-md"
            disabled={selectedOrders.length === 0}
          >
            <option value="">Select Bulk Action</option>
            <option value="mark-delivered">Mark as Delivered</option>
            <option value="mark-processing">Mark as Processing</option>
            <option value="mark-shipped">Mark as Shipped</option>
            <option value="mark-cancelled">Mark as Cancelled</option>
            <option value="export">Export Selected</option>
          </select>
          
          <button
            onClick={handleBulkAction}
            disabled={!bulkAction || selectedOrders.length === 0}
            className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
          >
            Apply to {selectedOrders.length} selected
          </button>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    <input
                      type="checkbox"
                      checked={selectedOrders.length === currentOrders.length}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Products
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Branch
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedOrders.includes(order.id)}
                        onChange={() => handleSelectOrder(order.id)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-8 w-8 flex-shrink-0">
                          <div className="h-8 w-8 rounded-full bg-[#4C9BF5] flex items-center justify-center text-white text-sm">
                            {order.customerName.charAt(0)}
                          </div>
                        </div>
                        <div className="ml-3">
                          <button 
                            onClick={() => handleViewOrder(order)}
                            className="text-sm font-medium text-gray-900 hover:text-blue-600"
                          >
                            {order.customerName}
                          </button>
                          <div className="text-xs text-gray-500">
                            {order.customerEmail}
                          </div>
                          <div className="text-xs text-gray-500">
                            {order.customerPhone}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {order.products.map(p => `${p.name} (${p.quantity})`).join(', ')}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₱{order.totalAmount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex items-center gap-1 text-xs leading-5 font-semibold rounded-full
                        ${statusConfig[order.status].color}`}>
                        {React.createElement(statusConfig[order.status].icon, {
                          className: `w-4 h-4 ${statusConfig[order.status].iconColor}`
                        })}
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {order.branch}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(order.orderDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900" onClick={() => handleViewOrder(order)}>
                        <FiEye className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
                Showing <span className="font-medium">{Math.min(indexOfFirstOrder + 1, filteredOrders.length)}</span> to{' '}
                <span className="font-medium">
                  {Math.min(indexOfLastOrder, filteredOrders.length)}
                </span>{' '}
                of <span className="font-medium">{filteredOrders.length}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  Previous
                </button>
                
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
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
      {showOrderModal && (
        <OrderModal
          order={selectedOrder}
          onClose={() => setShowOrderModal(false)}
          onUpdateStatus={handleUpdateOrderStatus}
        />
      )}
    </div>
  );
};

export default OrderList;
