import React from 'react';
import { 
  FiX, FiMail, FiPhone, FiMapPin, FiCalendar, FiShoppingBag, 
  FiDollarSign, FiClock, FiPackage, FiTruck, FiCheckCircle, FiXCircle 
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useOrderCustomer } from '../context/OrderCustomerContext';

const CustomerModal = ({ customer, onClose }) => {
  const navigate = useNavigate();
  const { getCustomerOrders } = useOrderCustomer();
  
  if (!customer) return null;

  const customerOrders = getCustomerOrders(customer.id);

  const getStatusConfig = (status) => {
    const config = {
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
    return config[status] || config.Pending;
  };

  const handleViewOrder = (orderId) => {
    navigate('/seller/records/orders', {
      state: { 
        highlightOrderId: orderId,
        customerId: customer.id 
      }
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-6 border w-full max-w-3xl shadow-lg rounded-md bg-white">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center">
            <div className="h-16 w-16 rounded-full bg-[#4C9BF5] flex items-center justify-center text-white text-2xl">
              {customer.name.charAt(0)}
            </div>
            <div className="ml-4">
              <h2 className="text-2xl font-semibold text-gray-900">{customer.name}</h2>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                ${customer.status === 'active' ? 'bg-green-100 text-green-800' :
                  customer.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
                  customer.status === 'blocked' ? 'bg-red-100 text-red-800' :
                  'bg-blue-100 text-blue-800'}`}>
                {customer.status}
              </span>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <FiX size={24} />
          </button>
        </div>

        {/* Customer Information Grid */}
        <div className="grid grid-cols-2 gap-6 mb-8 bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center">
            <FiMail className="text-gray-400 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-sm font-medium text-gray-900">{customer.email}</p>
            </div>
          </div>
          <div className="flex items-center">
            <FiPhone className="text-gray-400 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="text-sm font-medium text-gray-900">{customer.phone}</p>
            </div>
          </div>
          <div className="flex items-center">
            <FiMapPin className="text-gray-400 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Location</p>
              <p className="text-sm font-medium text-gray-900">{customer.location}</p>
            </div>
          </div>
          <div className="flex items-center">
            <FiCalendar className="text-gray-400 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Join Date</p>
              <p className="text-sm font-medium text-gray-900">
                {new Date(customer.joinDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Customer Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="text-blue-600">
                <FiShoppingBag size={20} />
              </div>
              <span className="text-2xl font-semibold text-blue-600">
                {customer.totalOrders}
              </span>
            </div>
            <p className="mt-1 text-sm text-blue-600">Total Orders</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="text-green-600">
                <FiDollarSign size={20} />
              </div>
              <span className="text-2xl font-semibold text-green-600">
                ₱{customer.totalSpent.toLocaleString()}
              </span>
            </div>
            <p className="mt-1 text-sm text-green-600">Total Spent</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="text-purple-600">
                <FiCalendar size={20} />
              </div>
              <span className="text-sm font-semibold text-purple-600">
                {new Date(customer.lastVisit).toLocaleDateString()}
              </span>
            </div>
            <p className="mt-1 text-sm text-purple-600">Last Visit</p>
          </div>
        </div>

        {/* Order History */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Order History</h3>
          <div className="space-y-4 max-h-64 overflow-y-auto">
            {customerOrders.map(order => {
              const StatusIcon = getStatusConfig(order.status).icon;
              return (
                <div 
                  key={order.id}
                  onClick={() => handleViewOrder(order.id)}
                  className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Order #{order.id}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(order.orderDate).toLocaleString()}
                      </p>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${getStatusConfig(order.status).color}`}>
                      <StatusIcon className={`mr-1 h-3 w-3 ${getStatusConfig(order.status).iconColor}`} />
                      {order.status}
                    </span>
                  </div>
                  <div className="flex justify-between items-end">
                    <div className="text-sm text-gray-500">
                      {order.products.map(p => p.name).join(', ')}
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      ₱{order.totalAmount.toLocaleString()}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerModal; 