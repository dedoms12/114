import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarSeller from '../components/navbarSeller';
import { FiEdit2, FiUpload, FiLogOut, FiMessageSquare, FiStar, FiClock, FiAward, FiX, FiPackage, FiFileText, FiThumbsUp, FiMessageCircle, FiFilter, FiSettings, FiBell, FiLock, FiShield, FiCreditCard, FiToggleRight, FiChevronRight, FiTrash2, FiDownload, FiMapPin, FiPhone, FiMail, FiShoppingBag } from 'react-icons/fi';
import EditStoreModal from './EditStoreModal';
import EditProfileModal from './EditProfileModal';
import CreateProductModal from '../components/CreateProductModal';
import DocumentSection from './DocumentSection';
import { toast } from 'react-hot-toast';

const SellerProfile = () => {
  const [documentSections, setDocumentSections] = useState([
    {
      id: 1,
      title: 'Business Name Registration Certificate',
      description: 'Official registration document from DTI',
      status: 'Verified',
      validUntil: '2025-12-31',
      documents: []
    },
    {
      id: 2,
      title: 'Tax Identification Number',
      description: 'BIR registration and TIN certificate',
      status: 'Verified',
      validUntil: '2025-12-31',
      documents: []
    }
  ]);

  const mockData = {
    store: {
      photo: null,
      name: 'Second Chance Apparel',
      type: 'Menswear Store',
      location: 'Ampayon, Agusan Del Norte',
      rating: 4.8,
      reviews: 1000,
      stats: {
        products: { value: 50, trend: '+5%' },
        inventory: { value: '1K', trend: '+2%' },
        orders: { value: 0, trend: '0%' },
        transactions: { value: 0, trend: '0%' }
      },
      businessHours: {
        weekdays: '9:00 AM - 6:00 PM',
        saturday: '9:00 AM - 1:00 PM',
        sunday: 'Closed'
      },
      performance: {
        responseRate: 98,
        fulfillmentRate: 95,
        completionScore: 80
      },
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      certificates: ['Business Registration'],
      responseTime: '< 24 hours'
    },
    seller: {
      name: 'Mugiwara',
      role: 'Owner',
      email: 'luffy@gmail.com',
      phone: '+63 912 345 6789',
      about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    }
  };

  const mockReviews = [
    {
      id: 1,
      customerName: 'John Doe',
      rating: 5,
      date: '2024-03-15',
      comment: 'Great service and fast delivery!',
      productName: 'Wedtrend Womens Vintage Tea Dress, Short Sleeve Cocktail Party Dress Work Church Casual Dress',
      helpful: 12,
      reply: null
    },
    {
      id: 2,
      customerName: 'Maria Garcia',
      rating: 4,
      date: '2024-03-14',
      comment: 'Good product quality but delivery took a bit longer than expected.',
      productName: 'adidas campus 00s',
      helpful: 8,
      reply: {
        date: '2024-03-14',
        text: 'Thank you for your feedback. We apologize for the delay and are working to improve our delivery times.'
      }
    },
    // Add more mock reviews as needed
  ];

  const [activeTab, setActiveTab] = useState('overview');
  const [showStoreModal, setShowStoreModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [activeModalTab, setActiveModalTab] = useState('basic');
  const [storeData, setStoreData] = useState({
    ...mockData.store,
    email: 'luffy@gmail.com',
    phone: '+63 912 345 6789',
  });
  const [sellerData, setSellerData] = useState(mockData.seller);
  const [notificationSettings, setNotificationSettings] = useState({
    orderUpdates: true,
    reviewAlerts: true,
    stockAlerts: false
  });
  const [storePreferences, setStorePreferences] = useState({
    storeVisibility: true,
    automaticOrders: false,
    holidayMode: false,
    maintenanceMode: false
  });

  const StatsCard = ({ label, value, trend }) => (
    <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <p className="text-2xl font-semibold text-blue-600">{value.value}</p>
        {trend && (
          <span className={`text-sm ${
            value.trend.startsWith('+') ? 'text-green-500' : value.trend === '0%' ? 'text-gray-500' : 'text-red-500'
          }`}>
            {value.trend}
          </span>
        )}
      </div>
      <p className="text-sm text-gray-600 capitalize">{label}</p>
    </div>
  );

  const ProfileCard = () => (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
            {storeData.photo ? (
              <img 
                src={storeData.photo} 
                alt={storeData.name} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-blue-50 text-blue-500">
                <FiShoppingBag size={24} />
              </div>
            )}
          </div>
          <div>
            <h2 className="text-xl font-semibold">{storeData.name}</h2>
            <p className="text-gray-500">{storeData.type}</p>
            <div className="mt-2 space-y-1">
              <div className="flex items-center text-sm text-gray-500">
                <FiMapPin className="mr-2" />
                {storeData.location}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <FiPhone className="mr-2" />
                {storeData.phone || 'No phone provided'}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <FiMail className="mr-2" />
                {storeData.email || 'No email provided'}
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            setActiveModalTab('basic');
            setShowStoreModal(true);
          }}
          className="text-gray-400 hover:text-gray-500"
        >
          <FiEdit2 size={20} />
        </button>
      </div>
    </div>
  );

  const TabNavigation = () => {
    return (
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {['overview', 'documents', 'reviews', 'settings'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>
    );
  };

  const ToggleSwitch = ({ isOn, onToggle, disabled = false }) => (
    <button
      onClick={onToggle}
      disabled={disabled}
      className={`relative w-11 h-6 transition-colors duration-300 rounded-full ${
        disabled 
          ? 'bg-gray-200 cursor-not-allowed' 
          : isOn 
            ? 'bg-blue-600' 
            : 'bg-gray-200'
      }`}
    >
      <span 
        className={`absolute w-4 h-4 transition-transform duration-300 transform bg-white rounded-full top-1 ${
          isOn ? 'translate-x-6' : 'translate-x-1'
        }`} 
      />
    </button>
  );

  const handleAddDocumentSection = () => {
    const newSection = {
      id: Date.now(),
      title: '',
      description: '',
      status: 'Pending',
      validUntil: '',
      documents: []
    };
    setDocumentSections(prev => [...prev, newSection]);
  };

  const handleUpdateDocumentSection = (sectionId, updatedData) => {
    setDocumentSections(prev =>
      prev.map(section =>
        section.id === sectionId 
          ? { 
              ...section, 
              ...updatedData,
              documents: updatedData.documents || section.documents 
            }
          : section
      )
    );
    toast.success('Document section updated successfully');
  };

  const handleDeleteDocumentSection = (sectionId) => {
    setDocumentSections(prev =>
      prev.filter(section => section.id !== sectionId)
    );
  };

  const renderTabContent = () => {
    switch(activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-4 gap-4">
              {Object.entries(storeData.stats).map(([key, value]) => (
                <StatsCard 
                  key={key} 
                  label={key} 
                  value={value} 
                  trend={value.trend} 
                />
              ))}
            </div>

            {/* Store Performance Cards */}
            <div className="grid grid-cols-3 gap-4">
              {/* Response Rate */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <FiMessageSquare className="text-blue-500" />
                    <h3 className="font-medium text-gray-700">Response Rate</h3>
                  </div>
                  <span className="text-lg font-semibold text-green-600">
                    {storeData.performance.responseRate}%
                  </span>
                </div>
                <p className="text-sm text-gray-500">Average response time: {storeData.responseTime}</p>
              </div>

              {/* Fulfillment Rate */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <FiPackage className="text-blue-500" />
                    <h3 className="font-medium text-gray-700">Fulfillment Rate</h3>
                  </div>
                  <span className="text-lg font-semibold text-green-600">
                    {storeData.performance.fulfillmentRate}%
                  </span>
                </div>
                <p className="text-sm text-gray-500">Orders completed successfully</p>
              </div>

              {/* Store Rating */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <FiStar className="text-blue-500" />
                    <h3 className="font-medium text-gray-700">Store Rating</h3>
                  </div>
                  <span className="text-lg font-semibold text-blue-600">
                    {storeData.rating}
                  </span>
                </div>
                <p className="text-sm text-gray-500">{storeData.reviews} reviews</p>
              </div>
            </div>

            {/* Store Info */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">About Store</h3>
                <button 
                  onClick={() => setShowStoreModal(true)}
                  className="flex items-center text-sm text-blue-600 hover:text-blue-700"
                >
                  <FiEdit2 className="mr-1" /> Edit Store
                </button>
              </div>
              <div className="space-y-4">
                <p className="text-gray-600">{storeData.description}</p>
                
                {/* Store Details */}
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Location</h4>
                    <p className="mt-1">{storeData.location}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Store Type</h4>
                    <p className="mt-1">{storeData.type}</p>
                  </div>
                </div>

                {/* Certificates Section */}
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Store Certificates</h4>
                  <div className="flex flex-wrap gap-2">
                    {storeData.certificates.map((cert, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Seller Info */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Seller Information</h3>
                <button 
                  onClick={() => setShowProfileModal(true)}
                  className="flex items-center text-sm text-blue-600 hover:text-blue-700"
                >
                  <FiEdit2 className="mr-1" /> Edit Profile
                </button>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Name</h4>
                  <p className="mt-1 font-medium text-gray-900">{sellerData.name}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Role</h4>
                  <p className="mt-1 font-medium text-gray-900">{sellerData.role}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Email</h4>
                  <p className="mt-1 font-medium text-gray-900">{sellerData.email}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Phone</h4>
                  <p className="mt-1 font-medium text-gray-900">{sellerData.phone}</p>
                </div>
                <div className="col-span-2">
                  <h4 className="text-sm font-medium text-gray-500">About</h4>
                  <p className="mt-1 text-gray-600">{sellerData.about}</p>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Recent Activity</h3>
                <button className="text-sm text-blue-600 hover:text-blue-700">
                  View All
                </button>
              </div>
              <div className="space-y-4">
                {/* Add your recent activity items here */}
                <p className="text-gray-500 text-center py-4">No recent activity</p>
              </div>
            </div>
          </div>
        );
      case 'documents':
        return (
          <div className="space-y-8">
            {documentSections.map((section, index) => (
              <DocumentSection
                key={section.id}
                {...section}
                isLast={index === documentSections.length - 1}
                onUpdate={(updatedData) => handleUpdateDocumentSection(section.id, updatedData)}
                onDelete={() => handleDeleteDocumentSection(section.id)}
                isEditable={true}
              />
            ))}
            
            {/* Add New Document Section Button */}
            <button
              onClick={handleAddDocumentSection}
              className="w-full py-4 px-6 border-2 border-dashed border-gray-300 rounded-lg
                text-gray-600 hover:text-blue-600 hover:border-blue-300 transition-colors
                flex items-center justify-center space-x-2"
            >
              <FiUpload className="w-5 h-5" />
              <span>Add New Document Section</span>
            </button>
          </div>
        );
      case 'reviews':
        return (
          <div className="space-y-6">
            {/* Reviews Header */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Customer Reviews</h3>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <FiStar className="text-yellow-400 w-5 h-5" />
                    <span className="text-2xl font-semibold">{storeData.rating}</span>
                    <span className="text-gray-500">({storeData.reviews} reviews)</span>
                  </div>
                  <button className="flex items-center px-3 py-2 text-sm text-gray-600 bg-gray-50 rounded-md hover:bg-gray-100">
                    <FiFilter className="mr-2" /> Filter
                  </button>
                </div>
              </div>

              {/* Rating Statistics */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map(stars => (
                    <div key={stars} className="flex items-center space-x-4">
                      <div className="flex items-center w-24">
                        {Array(stars).fill(null).map((_, i) => (
                          <FiStar key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-yellow-400 rounded-full"
                          style={{ width: `${Math.random() * 100}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-500 w-16">
                        {Math.floor(Math.random() * 100)}%
                      </span>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-2xl font-semibold text-blue-600">98%</div>
                    <div className="text-sm text-gray-600">Response Rate</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-2xl font-semibold text-green-600">95%</div>
                    <div className="text-sm text-gray-600">Satisfaction Rate</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-4">
              {mockReviews.map(review => (
                <div key={review.id} className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex justify-between mb-4">
                    <div>
                      <h4 className="font-medium">{review.customerName}</h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="flex">
                          {Array(5).fill(null).map((_, i) => (
                            <FiStar 
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(review.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      Product: {review.productName}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{review.comment}</p>
                  
                  <div className="flex items-center justify-between">
                    <button className="flex items-center text-sm text-gray-500 hover:text-blue-600">
                      <FiThumbsUp className="mr-1" /> Helpful ({review.helpful})
                    </button>
                    <button className="flex items-center text-sm text-blue-600 hover:text-blue-700">
                      <FiMessageCircle className="mr-1" /> Reply
                    </button>
                  </div>

                  {review.reply && (
                    <div className="mt-4 pl-4 border-l-2 border-gray-200">
                      <div className="text-sm text-gray-500 mb-1">
                        Your response • {new Date(review.reply.date).toLocaleDateString()}
                      </div>
                      <p className="text-gray-600">{review.reply.text}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="space-y-6">
            {/* General Settings */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-6">Store Settings</h3>
              
              <div className="space-y-6">
                {/* Notification Settings */}
                <div className="border-b pb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <FiBell className="text-gray-400" />
                      <h4 className="font-medium">Notifications</h4>
                    </div>
                    <button 
                      className="text-blue-600 hover:text-blue-700 text-sm"
                      onClick={() => {
                        // Toggle all notifications
                        const allOn = Object.values(notificationSettings).every(v => v);
                        setNotificationSettings({
                          orderUpdates: !allOn,
                          reviewAlerts: !allOn,
                          stockAlerts: !allOn
                        });
                      }}
                    >
                      {Object.values(notificationSettings).every(v => v) ? 'Disable All' : 'Enable All'}
                    </button>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-700">Order Updates</p>
                        <p className="text-sm text-gray-500">Get notified about new orders and updates</p>
                      </div>
                      <ToggleSwitch
                        isOn={notificationSettings.orderUpdates}
                        onToggle={() => setNotificationSettings(prev => ({
                          ...prev,
                          orderUpdates: !prev.orderUpdates
                        }))}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-700">Review Alerts</p>
                        <p className="text-sm text-gray-500">Receive notifications for new reviews</p>
                      </div>
                      <ToggleSwitch
                        isOn={notificationSettings.reviewAlerts}
                        onToggle={() => setNotificationSettings(prev => ({
                          ...prev,
                          reviewAlerts: !prev.reviewAlerts
                        }))}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-700">Stock Alerts</p>
                        <p className="text-sm text-gray-500">Get alerts for low stock items</p>
                      </div>
                      <ToggleSwitch
                        isOn={notificationSettings.stockAlerts}
                        onToggle={() => setNotificationSettings(prev => ({
                          ...prev,
                          stockAlerts: !prev.stockAlerts
                        }))}
                      />
                    </div>
                  </div>
                </div>

                {/* Security Settings */}
                <div className="border-b pb-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <FiShield className="text-gray-400" />
                    <h4 className="font-medium">Security</h4>
                  </div>
                  <div className="space-y-4">
                    {[
                      { 
                        icon: FiLock, 
                        text: 'Change Password',
                        description: 'Update your account password',
                        action: () => {/* Implement password change logic */}
                      },
                      { 
                        icon: FiCreditCard, 
                        text: 'Payment Security',
                        description: 'Manage payment security settings',
                        action: () => {/* Implement payment security settings */}
                      },
                      { 
                        icon: FiSettings, 
                        text: 'Two-Factor Authentication',
                        description: 'Add an extra layer of security',
                        action: () => {/* Implement 2FA settings */}
                      }
                    ].map((item) => (
                      <button 
                        key={item.text}
                        onClick={item.action}
                        className="w-full flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <item.icon className="text-gray-400" />
                          <div className="text-left">
                            <p className="text-gray-700">{item.text}</p>
                            <p className="text-sm text-gray-500">{item.description}</p>
                          </div>
                        </div>
                        <FiChevronRight className="text-gray-400" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Store Preferences */}
                <div>
                  <div className="flex items-center space-x-3 mb-4">
                    <FiToggleRight className="text-gray-400" />
                    <h4 className="font-medium">Store Preferences</h4>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-700">Store Visibility</p>
                        <p className="text-sm text-gray-500">Make your store visible to customers</p>
                      </div>
                      <ToggleSwitch
                        isOn={storePreferences.storeVisibility}
                        onToggle={() => setStorePreferences(prev => ({
                          ...prev,
                          storeVisibility: !prev.storeVisibility
                        }))}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-700">Automatic Order Acceptance</p>
                        <p className="text-sm text-gray-500">Automatically accept new orders</p>
                      </div>
                      <ToggleSwitch
                        isOn={storePreferences.automaticOrders}
                        onToggle={() => setStorePreferences(prev => ({
                          ...prev,
                          automaticOrders: !prev.automaticOrders
                        }))}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-700">Holiday Mode</p>
                        <p className="text-sm text-gray-500">Temporarily close your store</p>
                      </div>
                      <ToggleSwitch
                        isOn={storePreferences.holidayMode}
                        onToggle={() => setStorePreferences(prev => ({
                          ...prev,
                          holidayMode: !prev.holidayMode
                        }))}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-700">Maintenance Mode</p>
                        <p className="text-sm text-gray-500">Put your store in maintenance mode</p>
                      </div>
                      <ToggleSwitch
                        isOn={storePreferences.maintenanceMode}
                        onToggle={() => setStorePreferences(prev => ({
                          ...prev,
                          maintenanceMode: !prev.maintenanceMode
                        }))}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const ProfileCompletion = () => {
    return (
      <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium">Profile Completion</span>
          <span className="text-sm text-blue-600">80%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-blue-600 h-2 rounded-full" style={{ width: '80%' }}></div>
        </div>
      </div>
    );
  };

  const QuickActions = () => {
    const navigate = useNavigate();
    const [showCreateModal, setShowCreateModal] = useState(false);

    // Define categories and units for CreateProductModal
    const categories = [
      { name: 'Medical Supplies', value: 'medical-supplies' },
      { name: 'Medicines', value: 'medicines' },
      { name: 'General Products', value: 'general-products' }
    ];

    const units = ['Item', 'Box', 'Pack', 'Bottle', 'Tablet'];

    const handleSaveProduct = async (productData) => {
      try {
        // Here you would typically make an API call to save the product
        console.log('Saving product:', productData);
        // After successful save, you might want to show a success message
        alert('Product added successfully!');
      } catch (error) {
        console.error('Error saving product:', error);
        alert('Failed to add product');
      }
    };

    return (
      <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
        <h3 className="font-medium mb-3">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-2">
          <button 
            onClick={() => setShowCreateModal(true)}
            className="p-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md flex items-center"
          >
            <FiPackage className="mr-2" /> Add Product
          </button>
          <button 
            onClick={() => navigate('/seller/product-management')}
            className="p-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md flex items-center"
          >
            <FiFileText className="mr-2" /> View Orders
          </button>
        </div>

        {/* Create Product Modal */}
        <CreateProductModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onSave={handleSaveProduct}
          categories={categories}
          units={units}
        />
      </div>
    );
  };

  const BusinessHours = ({ businessHours, onEdit }) => (
    <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">Business Hours</h3>
        <button 
          onClick={onEdit}
          className="text-sm text-blue-600 hover:text-blue-700 flex items-center"
        >
          <FiEdit2 className="inline mr-1" /> Edit
        </button>
      </div>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">Monday - Friday</span>
          <span className="font-medium">{businessHours?.weekdays}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Saturday</span>
          <span className="font-medium">{businessHours?.saturday}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Sunday</span>
          <span className="font-medium">{businessHours?.sunday}</span>
        </div>
      </div>
    </div>
  );

  const PerformanceMetrics = () => {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="font-semibold mb-4">Performance Metrics</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Response Rate</p>
            <p className="text-lg font-medium text-green-600">98%</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Order Fulfillment</p>
            <p className="text-lg font-medium text-green-600">95%</p>
          </div>
        </div>
      </div>
    );
  };

  const LeftColumn = () => (
    <div className="space-y-6">
      <ProfileCard />
      <ProfileCompletion />
      <QuickActions />
      <BusinessHours 
        businessHours={storeData.businessHours}
        onEdit={() => {
          setActiveModalTab('hours');  // Set the active tab to hours
          setShowStoreModal(true);
        }}
      />
      <PerformanceMetrics />
    </div>
  );

  const RightColumn = () => (
    <div className="space-y-6">
      <TabNavigation />
      {renderTabContent()}
    </div>
  );

  const handleStoreUpdate = (updatedStore) => {
    setStoreData(prevStore => ({
      ...prevStore,
      ...updatedStore,
      photo: updatedStore.photo,
      businessHours: {
        ...prevStore.businessHours,
        ...updatedStore.businessHours
      },
      location: updatedStore.location,
      phone: updatedStore.phone,
      email: updatedStore.email
    }));
    setShowStoreModal(false);
  };

  const handleProfileUpdate = (updatedProfile) => {
    setSellerData(prevProfile => ({
      ...prevProfile,
      ...updatedProfile
    }));
    setShowProfileModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarSeller />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-4">
            <LeftColumn />
          </div>
          <div className="col-span-8">
            <RightColumn />
          </div>
        </div>
      </div>
      <EditStoreModal 
        isOpen={showStoreModal} 
        onClose={() => setShowStoreModal(false)} 
        storeData={storeData} 
        onUpdate={handleStoreUpdate}
        initialTab={activeModalTab}
      />
      <EditProfileModal 
        isOpen={showProfileModal} 
        onClose={() => setShowProfileModal(false)} 
        profileData={sellerData} 
        onUpdate={handleProfileUpdate} 
      />
    </div>
  );
};

export default SellerProfile;
