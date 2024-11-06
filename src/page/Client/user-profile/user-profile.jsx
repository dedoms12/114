import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../_components/navbar';
import { useOrders } from '../_components/context/OrderContext';
import { FaEllipsisH } from 'react-icons/fa';
import EditProfileModal from '../_components/modals/EditProfileModal';

const UserProfile = () => {
  const navigate = useNavigate();
  const { orders, currentUser, setCurrentUser } = useOrders();
  const [activeTab, setActiveTab] = useState('All Orders');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  const tabs = ["All Orders", "To Received", "Complete", "Cancelled"];

  const filterOrders = () => {
    switch (activeTab) {
      case 'To Received':
        return orders.filter(order => order.status === 'To be Delivered');
      case 'Complete':
        return orders.filter(order => order.status === 'Completed');
      case 'Cancelled':
        return orders.filter(order => order.status === 'Cancelled');
      default:
        return orders;
    }
  };

  const following = [
    {
      id: 1,
      name: "Anthony Taylor",
      image: "/images/Client/profile/anthony.jpg"
    },
    {
      id: 2,
      name: "Matthew Martinez",
      image: "/images/Client/profile/matthew.jpg"
    },
    {
      id: 3,
      name: "Ashley Robinson",
      image: "/images/Client/profile/ashley.jpg"
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
      navigate('/order-confirmation', { 
        state: { orderDetails: order }
      });
    }
  };

  const handleProfileUpdate = (updatedData) => {
    setCurrentUser(updatedData);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-3 gap-8">
          {/* Left Column - Orders */}
          <div className="col-span-2">
            <div className="flex space-x-6 border-b mb-6">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  className={`pb-4 ${
                    activeTab === tab
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
              {filterOrders().map((order) => (
                <div 
                  key={order.id} 
                  className={`bg-white rounded-lg p-6 shadow-sm cursor-pointer transition-all duration-200 ${
                    order.status === 'To be Delivered' ? 'hover:shadow-md' : ''
                  }`}
                  onClick={() => handleOrderClick(order)}
                >
                  <div className="border-b pb-4 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">
                        Order ID: {order.orderCode}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        order.status === 'Completed' ? 'bg-green-100 text-green-600' :
                        order.status === 'Cancelled' ? 'bg-red-100 text-red-600' :
                        'bg-blue-100 text-blue-600'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>

                  {/* Order Items */}
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 mb-4">
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
                  ))}

                  {/* Order Timeline */}
                  <div className="mt-4 pt-4 border-t">
                    <div className="space-y-2">
                      {order.trackingHistory.map((track, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="w-2 h-2 mt-2 rounded-full bg-blue-500"></div>
                          <div>
                            <p className="text-sm font-medium">{track.status}</p>
                            <p className="text-xs text-gray-500">
                              {new Date(track.date).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Profile Info */}
          <div className="space-y-8">
            {/* Profile Section */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 bg-gray-900 rounded-full flex items-center justify-center text-3xl text-white mb-4">
                  A
                </div>
                <h2 className="text-xl font-semibold">Ashley Gonzalez</h2>
                <p className="text-gray-500">Ampayon, Agusan Del Norte</p>
                <button 
                  onClick={() => setIsEditModalOpen(true)} 
                  className="mt-4 px-4 py-2 border rounded-lg text-sm hover:bg-gray-50"
                >
                  Edit profile
                </button>
              </div>
              <div className="mt-6">
                <h3 className="font-medium mb-2">About Me</h3>
                <p className="text-gray-600 text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                  Maecenas dignissim scelerisque ex ac vehicula. Nullam id eros vel 
                  dolor porttitor lacinia tincidunt quis felis. Aliquam ut.
                </p>
              </div>
            </div>

            {/* Following Section */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-medium mb-4">Following</h3>
              <div className="space-y-4">
                {following.map((user) => (
                  <div key={user.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                      <span>{user.name}</span>
                    </div>
                    <button className="text-gray-400">
                      <FaEllipsisH />
                    </button>
                  </div>
                ))}
                <button className="text-blue-500 text-sm hover:underline w-full text-left">
                  See all →
                </button>
              </div>
            </div>

            {/* Tags Section */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-medium mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className={`px-3 py-1 rounded-full text-sm ${
                      tag.type === 'blue'
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-teal-100 text-teal-600'
                    }`}
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
              <button className="text-blue-500 text-sm hover:underline mt-4">
                See all →
              </button>
            </div>
          </div>
        </div>
      </div>
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        currentUser={currentUser}
        onSave={handleProfileUpdate}
      />
    </div>
  );
};

export default UserProfile;

