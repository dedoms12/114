import React from 'react';
import { 
  FiX, FiUser, FiMapPin, FiPhone, FiCalendar, FiDollarSign, 
  FiPackage, FiTruck, FiClock, FiCheckCircle, FiXCircle, FiMail 
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useOrderCustomer } from '../context/OrderCustomerContext';
import { statuses } from '../data/store-data';

const OrderModal = ({ order, onClose, onUpdateStatus }) => {
  const navigate = useNavigate();
  const { getOrderCustomer } = useOrderCustomer();
  
  if (!order) return null;

  const customer = getOrderCustomer(order.id);

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

  const handleViewCustomer = () => {
    navigate('/seller/records/customers', {
      state: { highlightCustomerId: customer?.id }
    });
    onClose();
  };

  const StatusIcon = getStatusConfig(order.status).icon;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-6 border w-full max-w-3xl shadow-lg rounded-md bg-white">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">Order #{order.id}</h2>
            <div className="flex items-center mt-2">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                ${getStatusConfig(order.status).color}`}>
                <StatusIcon className={`mr-1 h-3 w-3 ${getStatusConfig(order.status).iconColor}`} />
                {order.status}
              </span>
              <select
                value={order.status}
                onChange={(e) => onUpdateStatus(order.id, e.target.value)}
                className="ml-4 border rounded-md px-2 py-1 text-sm text-gray-700"
              >
                {statuses.order.map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <FiX size={24} />
          </button>
        </div>

        {/* Customer Information */}
        <div className="bg-gray-50 rounded-lg p-4 mb-8">
          <div className="flex justify-between items-start">
            <div className="flex items-start">
              <div className="h-12 w-12 rounded-full bg-[#4C9BF5] flex items-center justify-center text-white text-xl">
                {customer?.name?.charAt(0) || '?'}
              </div>
              <div className="ml-3">
                <button 
                  onClick={handleViewCustomer}
                  className="text-base font-medium text-gray-900 hover:text-blue-600 hover:underline"
                >
                  {customer?.name || 'Unknown Customer'}
                </button>
                <div className="mt-1 space-y-1">
                  <p className="text-sm text-gray-500 flex items-center">
                    <FiMail className="mr-2" />
                    {customer?.email || 'No email provided'}
                  </p>
                  <p className="text-sm text-gray-500 flex items-center">
                    <FiPhone className="mr-2" />
                    {order.contactNumber || customer?.phone || 'No phone provided'}
                  </p>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">
                <div className="flex items-center justify-end mb-2">
                  <FiMapPin className="mr-2 flex-shrink-0" />
                  <span className="text-right">
                    {order.shippingAddress || 'No address provided'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="text-blue-600">
                <FiCalendar size={20} />
              </div>
              <span className="text-sm font-semibold text-blue-600">
                {new Date(order.orderDate).toLocaleDateString()}
              </span>
            </div>
            <p className="mt-1 text-sm text-blue-600">Order Date</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="text-green-600">
                <FiDollarSign size={20} />
              </div>
              <span className="text-xl font-semibold text-green-600">
                ₱{order.totalAmount.toLocaleString()}
              </span>
            </div>
            <p className="mt-1 text-sm text-green-600">Total Amount</p>
          </div>
        </div>

        {/* Order Items */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Items</h3>
          <div className="bg-gray-50 rounded-lg divide-y">
            {order.products.map((product, index) => (
              <div key={index} className="flex justify-between items-center p-4">
                <div>
                  <p className="text-sm font-medium text-gray-900">{product.name}</p>
                  <p className="text-sm text-gray-500">{product.category}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">₱{product.price.toLocaleString()} × {product.quantity}</p>
                  <p className="text-sm font-medium text-gray-900">₱{(product.price * product.quantity).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Information */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Payment Method</p>
              <p className="text-sm font-medium text-gray-900">{order.paymentMethod}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Total Amount</p>
              <p className="text-lg font-semibold text-gray-900">₱{order.totalAmount.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderModal; 