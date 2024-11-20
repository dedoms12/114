import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from '../_components/navbar';
import { toast } from 'react-toastify';
import { FaBox, FaTruck, FaReceipt, FaUser, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { useOrders } from '../_components/context/OrderContext';

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const { orderDetails } = location.state || {};
  const { updateOrderStatus } = useOrders();

  const handleReceived = () => {
    updateOrderStatus(orderDetails.id, 'Completed');
    setIsSuccessModalOpen(true);
    toast.success('Order received successfully!', {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const handleCancel = () => {
    const confirmed = window.confirm('Are you sure you want to cancel this order?');
    if (confirmed) {
      updateOrderStatus(orderDetails.id, 'Cancelled');
      toast.info('Order cancelled successfully', {
        position: "top-right",
        autoClose: 2000,
      });
      setTimeout(() => {
        navigate('/user-profile');
      }, 2000);
    }
  };

  const handleNavigateToReview = () => {
    setIsSuccessModalOpen(false);
    navigate('/user-profile');
  };

  const getDeliveryTime = (shippingType) => {
    return shippingType === 'exclusive' ? '5 hours' : '10 hours';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div 
          onClick={() => navigate('/cart')}
          className="flex items-center mb-4 text-gray-600 hover:text-gray-800 cursor-pointer w-fit"
        >
          <svg 
            className="w-5 h-5 mr-2" 
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path d="M15 19l-7-7 7-7" />
          </svg>
          <span>Back to Cart</span>
        </div>

        {/* Order Status Banner */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <img src="/images/Client/check/Image 48check.svg" alt="Order Success" className="w-32" />
            </div>
            <h1 className="text-2xl font-semibold mb-2">We've Got Your Order</h1>
            <p className="text-gray-600">Order Code: <span className="font-medium">{orderDetails?.orderCode}</span></p>
          </div>
        </div>

        {/* Order Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Order Information Card */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <FaReceipt className="text-[#4C9BF5] text-xl" />
              <h2 className="font-medium text-lg">Order Information</h2>
            </div>
            <div className="space-y-4 pl-7">
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-gray-600">Total Amount</span>
                <span className="font-medium text-[#4C9BF5]">₱ {orderDetails?.total}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-gray-600">Payment Method</span>
                <span className="font-medium">{orderDetails?.payment}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-gray-600">Order Status</span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  Processing
                </span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-gray-600">Delivery Time</span>
                <span className="font-medium">{getDeliveryTime(orderDetails?.shipping)}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-gray-600">Shipping Fee</span>
                <span className="font-medium">₱ {orderDetails?.shipping === 'exclusive' ? '50' : '30'}</span>
              </div>
            </div>
          </div>

          {/* Delivery Information Card */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb">
            <div className="flex items-center gap-2 mb-6">
              <FaTruck className="text-[#4C9BF5] text-xl" />
              <h2 className="font-medium text-lg">Delivery Information</h2>
            </div>

            {/* Rider Information */}
            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-4">
                <img 
                  src={orderDetails?.rider?.image || '/images/Client/check/Avatar 5.svg'} 
                  alt="Rider" 
                  className="w-16 h-16 rounded-full object-cover" 
                />
                <div>
                  <h3 className="font-medium text-lg">Assigned Rider</h3>
                  <p className="text-gray-600">Contact updating...</p>
                </div>
              </div>
            </div>

            {/* Customer Details */}
            <div className="space-y-4 pl-2">
              <div className="flex items-center gap-4 border-b pb-3">
                <FaUser className="text-[#4C9BF5] w-5" />
                <div>
                  <p className="text-sm text-gray-500">Customer Name</p>
                  <p className="font-medium">{orderDetails?.deliveryInfo?.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 border-b pb-3">
                <FaPhone className="text-[#4C9BF5] w-5" />
                <div>
                  <p className="text-sm text-gray-500">Contact Number</p>
                  <p className="font-medium">{orderDetails?.deliveryInfo?.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <FaMapMarkerAlt className="text-[#4C9BF5] w-5" />
                <div>
                  <p className="text-sm text-gray-500">Delivery Address</p>
                  <p className="font-medium">{orderDetails?.deliveryInfo?.address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ordered Items Card */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-4 border-b">
            <div className="flex items-center gap-2">
              <FaBox className="text-[#4C9BF5] text-xl" />
              <h2 className="font-medium text-lg">Ordered Items</h2>
            </div>
          </div>
          <div className="divide-y">
            {orderDetails?.items.map((item) => (
              <div key={item.id} className="p-6 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-contain rounded-lg" />
                  <div>
                    <h3 className="font-medium mb-1">{item.name}</h3>
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                    <p className="text-sm font-medium text-[#4C9BF5]">₱ {item.price * item.quantity}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={handleCancel}
            className="bg-white border border-red-500 text-red-500 px-8 py-3 rounded-md hover:bg-red-50 transition-colors"
          >
            Cancel Order
          </button>
          <button
            onClick={handleReceived}
            className="bg-[#4C9BF5] text-white px-8 py-3 rounded-md hover:bg-blue-600 transition-colors"
          >
            Confirm Receipt
          </button>
        </div>
      </div>

      {/* Updated Success Modal */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <img src="/images/Client/check/Image 48check.svg" alt="Success" className="w-24" />
              </div>
              <h2 className="text-xl font-semibold mb-4">Order Received!</h2>
              <p className="text-gray-600 mb-6">Would you like to review your purchased items?</p>
              <div className="space-y-4">
                <button
                  onClick={handleNavigateToReview}
                  className="w-full bg-[#4C9BF5] text-white px-6 py-2 rounded-md hover:bg-blue-600 mb-2 flex items-center justify-center gap-2"
                >
                  <FaReceipt />
                  Review Product
                </button>
                <button
                  onClick={() => {
                    setIsSuccessModalOpen(false);
                    navigate('/cart');
                  }}
                  className="w-full border border-gray-300 px-6 py-2 rounded-md hover:bg-gray-50 flex items-center justify-center gap-2"
                >
                  <FaBox />
                  Back to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderConfirmation;
