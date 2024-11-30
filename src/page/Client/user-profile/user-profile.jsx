import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import NavBar from '../_components/navbar';
import { useOrders } from '../_components/context/OrderContext';
import { FaEllipsisH } from 'react-icons/fa';
import EditProfileModal from '../_components/modals/EditProfileModal';
import UserProfileReviewModal from './userprofilereviewmodal';
import ReviewCard from '../_components/product-detail/ReviewCard';

import { toast } from 'react-hot-toast';

const UserProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { orders, currentUser, setCurrentUser } = useOrders();
  const [activeTab, setActiveTab] = useState('Complete');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [userReviews, setUserReviews] = useState([]);
  const [justCompletedOrder, setJustCompletedOrder] = useState(null);

  const tabs = ["Orders", "To Received", "Complete", "Cancelled"];

  useEffect(() => {
    // Handle active tab from navigation state
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }

    // Handle completed order
    if (location.state?.justCompleted) {
      setActiveTab('Complete');
      const completedOrder = orders.find(
        order => order.id === location.state.completedOrderId
      );
      if (completedOrder) {
        setJustCompletedOrder(completedOrder);
        setTimeout(() => {
          const orderElement = document.getElementById(`order-${completedOrder.id}`);
          if (orderElement) {
            orderElement.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    }

    // Handle cancelled order
    if (location.state?.cancelledOrderId) {
      const cancelledOrder = orders.find(
        order => order.id === location.state.cancelledOrderId
      );
      if (cancelledOrder) {
        scrollToOrder(cancelledOrder.id);
      }
    }

    // Handle order tracking
    if (location.state?.trackingOrderId) {
      const trackedOrder = orders.find(
        order => order.id === location.state.trackingOrderId
      );
      if (trackedOrder) {
        scrollToOrder(trackedOrder.id);
      }
    }
  }, [location.state, orders]);

  // Helper function for scrolling to orders
  const scrollToOrder = (orderId) => {
    setTimeout(() => {
      const orderElement = document.getElementById(`order-${orderId}`);
      if (orderElement) {
        orderElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const filterOrders = () => {
    let filteredOrders = [];
  
    switch (activeTab) {
      case 'To Received':
        filteredOrders = orders.filter(order => order.status === 'To be Delivered');
        break;
      case 'Complete':
        filteredOrders = orders.filter(order =>
          order.status === 'Completed' ||
          order.id === location.state?.completedOrderId
        );
        break;
      case 'Cancelled':
        filteredOrders = orders.filter(order => order.status === 'Cancelled');
        break;
      default:
        filteredOrders = orders;
    }
  
    return filteredOrders;
  };
  const renderEmptyTabMessage = () => (
    <p className="text-center text-gray-500 py-4">This tab is empty.</p>
  );
  const following = [
    {
      id: 1,
      name: "Urban Outfitters",
      image: "",
    },
    {
      id: 2,
      name: "Fashion Boutique",
      image: ""
    },
    {
      id: 3,
      name: "The Shoe Corner",
      image: ""
    },
    {
      id: 4,
      name: "Classic Threads",
      image: ""
    },
    {
      id: 5,
      name: "Elegant Styles",
      image: ""
    }
  ];

  const tags = [
    { name: "Medical Supplies", type: "blue" },
    { name: "Heal", type: "green" },
    { name: "Medicine", type: "blue" },
    { name: "Health", type: "green" },
    { name: "Family Therapy", type: "blue" },
    { name: "Career", type: "green" },
    { name: "Writing tips", type: "blue" }
  ];

  const handleOrderClick = (order) => {
    if (order.status === 'To be Delivered') {
      const enhancedOrder = {
        ...order,
        trackingHistory: order.trackingHistory || []
      };
      navigate('/order-confirmation', {
        state: {
          orderDetails: enhancedOrder,
          fromUserProfile: true
        }
      });
    }
  };

  const handleProfileUpdate = (updatedData) => {
    setCurrentUser(prev => ({
      ...prev,
      ...updatedData,
      tags: updatedData.tags
    }));
    toast.success('Profile updated successfully');
  };

  const handleReviewClick = (product) => {
    const enhancedProduct = {
      id: product.id,
      name: product.name,
      category: product.category || 'general',
      image: product.image,
      orderId: justCompletedOrder?.id
    };
    setSelectedProduct(enhancedProduct);
    setIsReviewModalOpen(true);
    setJustCompletedOrder(null);
  };

  const handleReviewSubmit = (reviewData) => {
    if (!selectedProduct) return;

    try {
      setUserReviews(prev => [...prev, {
        ...reviewData,
        id: Date.now(),
        productName: selectedProduct.name,
        productImage: selectedProduct.image
      }]);

      setIsReviewModalOpen(false);
    } catch (error) {
      toast.error('Failed to submit review');
      console.error('Review submission error:', error);
    }
  };

  const handleLogout = () => {
    const isConfirmed = window.confirm('Are you sure you want to log out?');
    
    if (isConfirmed) {
      // Clear user data from context/state
      setCurrentUser(null);
      // Clear any stored tokens
      localStorage.removeItem('token');
      // Redirect to login page
      navigate('/signin');
    }
  };
  const renderOrderItems = (order, item) => (
    <div key={item.id} className="flex items-center justify-between mb-4">
      <div className="flex items-center space-x-4">
        <img
          src={item.image}
          alt={item.name}
          className="w-16 h-16 object-contain rounded"
        />
        <div>
          <h3 className="font-medium">{item.name}</h3>
          <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
          <p className="text-sm font-medium text-blue-600">
            ₱{item.price * item.quantity}
          </p>
        </div>
      </div>
      {(order.status === 'Completed' || order.id === location.state?.completedOrderId) && (
        <button
          onClick={() => handleReviewClick(item)}
          className="px-4 py-2 text-sm bg-[#4C9BF5] text-white rounded-md hover:bg-blue-600"
        >
          Write Review
        </button>
      )}
    </div>
  );

  const renderProfileSection = () => (
    <div className="bg-white rounded-lg p-6 shadow-sm border-2">
      {/* Profile Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="w-24 h-24 bg-gray-900 rounded-full flex items-center justify-center text-3xl text-white">
            {currentUser?.firstName?.charAt(0) || 'B'}
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-1">
              {currentUser?.firstName} {currentUser?.lastName}
            </h2>
            <p className="text-gray-500 text-sm">{currentUser?.email}</p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-50 flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            Edit profile
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 border border-red-200 rounded-lg text-sm text-red-500 hover:bg-red-50 flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </div>

      {/* Profile Details Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="space-y-1">
          <p className="text-sm text-gray-500">Gender</p>
          <p className="text-sm font-medium">{currentUser?.gender || 'Male'}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-gray-500">Status</p>
          <p className="text-sm font-medium">{currentUser?.status || 'Single'}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-gray-500">Education</p>
          <p className="text-sm font-medium">{currentUser?.education || 'College'}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-gray-500">Location</p>
          <p className="text-sm font-medium">{currentUser?.location || 'Ampayon, Agusan Del Norte'}</p>
        </div>
      </div>

      {/* Contact Information */}
      <div className="border-t pt-4 space-y-3">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Contact Information</h3>
        <div className="flex items-center text-sm">
          <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <span>{currentUser?.phone || '091234567891'}</span>
        </div>
        <div className="flex items-center text-sm">
          <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{currentUser?.address || 'Ampayon,Butuan City'}</span>
        </div>
      </div>

      {/* About Me Section */}
      <div className="border-t mt-4 pt-4">
        <h3 className="text-sm font-medium text-gray-700 mb-2">About Me</h3>
        <p className="text-sm text-gray-600">
          {currentUser?.bio || 'No bio provided'}
        </p>
      </div>
    </div>
  );

  const renderReviewsSection = () => (
    <div className="bg-white rounded-lg p-6 shadow-sm mt-8 border-2">
      <h2 className="text-xl font-medium mb-6">My Reviews</h2>
      <div className="space-y-6">
        {userReviews.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No reviews yet</p>
        ) : (
          userReviews.map(review => (
            <div key={review.id} className="border-b pb-6">
              {/* Product Info */}
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={review.productImage}
                  alt={review.productName}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div>
                  <h3 className="font-medium">{review.productName}</h3>
                  <p className="text-sm text-gray-500">
                    {new Date(review.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              {/* Review Card */}
              <ReviewCard review={{
                ...review,
                user: currentUser?.firstName + ' ' + currentUser?.lastName
              }} />
            </div>
          ))
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="container mx-auto px-40 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Section: Orders/My Reviews */}
        <div className="space-y-8">
          {renderProfileSection()}

          {/* Following Section */}
          <div className="bg-white rounded-lg p-6 shadow-sm border-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">Following</h3>
              <button className="text-blue-500 text-sm hover:underline">See all →</button>
            </div>
            <div className="space-y-4">
              {following.map((user) => (
                <div key={user.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-20 h-20 bg-gray-200 rounded-full"></div>
                    <span>{user.name}</span>
                  </div>
                  <button className="text-gray-400">
                    <FaEllipsisH />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="md:col-span-2 space-y-8">
          {/* Orders Section */}
          <div>
            <div className="flex space-x-6 border-b mb-6">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  className={`pb-4 ${activeTab === tab
                      ? 'border-b-2 border-[#4C9BF5] text-[#4C9BF5]'
                      : 'text-gray-500'
                    }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="space-y-4">
            {filterOrders().length === 0 ? (
              renderEmptyTabMessage() // Display the message if no orders are available in the current tab
            ) :(
              filterOrders().map((order) => (
                <div
                  key={order.id}
                  id={`order-${order.id}`}
                  className={`bg-white rounded-lg p-6 shadow-sm cursor-pointer transition-all duration-200 ${order.status === 'To be Delivered' ? 'hover:shadow-md' : ''
                    } ${justCompletedOrder?.id === order.id ? 'ring-2 ring-blue-500' : ''}`}
                  onClick={() => handleOrderClick(order)}
                >
                  <div className="border-b pb-4 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Order ID: {order.orderCode}</span>
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${order.status === 'Completed'
                            ? 'bg-green-100 text-green-600'
                            : order.status === 'Cancelled'
                              ? 'bg-red-100 text-red-600'
                              : 'bg-blue-100 text-blue-600'
                          }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>

                  {/* Order Items */}
                  {order.items.map((item) => renderOrderItems(order, item))}

                  {/* Order Timeline */}
                  <div className="mt-4 pt-4 border-t">
                    <div className="space-y-2">
                      {order.trackingHistory.map((track, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="w-2 h-2 mt-2 rounded-full bg-blue-500"></div>
                          <div>
                            <p className="text-sm font-medium">{track.status}</p>
                            <p className="text-xs text-gray-500">{new Date(track.date).toLocaleDateString()}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))
              )}
            </div>
          </div>

          {/* My Reviews Section */}
          {renderReviewsSection()}
        </div>

        {/* Right Section: Profile */}
   
      </div>


      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        currentUser={currentUser}
        onSave={handleProfileUpdate}
      />
      <UserProfileReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => {
          setIsReviewModalOpen(false);
          setSelectedProduct(null);
        }}
        product={selectedProduct}
        onReviewSubmit={handleReviewSubmit}
      />
    </div>
  );
  
};

export default UserProfile;

