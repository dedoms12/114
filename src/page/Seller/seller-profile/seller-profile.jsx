import { useState } from 'react';
import NavbarSeller from '../components/navbarSeller';
import { FiEdit2, FiUpload, FiLogOut, FiMessageSquare, FiStar, FiClock, FiAward, FiX, FiPackage, FiFileText } from 'react-icons/fi';
import EditStoreModal from './EditStoreModal';
import EditProfileModal from './EditProfileModal';

const SellerProfile = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showStoreModal, setShowStoreModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  
  const mockData = {
    store: {
      photo: null,
      name: 'PillPoint Store 1',
      type: 'Pharmacy Store',
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
      description: 'Ex consectetur veniam eiusmod in laboris aliquip exercitation eu culpa elit laborum.',
      certificates: ['Business Registration', 'FDA License', 'Pharmacy License'],
      responseTime: '< 24 hours'
    },
    seller: {
      name: 'Ashley Gonzalez',
      role: 'Team 1 Manager',
      email: 'ashley.g@pillpoint.com',
      phone: '+63 912 345 6789',
      about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    }
  };

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

  const ProfileCard = () => {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="text-center mb-6">
          <div className="w-24 h-24 mx-auto mb-4 relative group">
            {mockData.store.photo ? (
              <img 
                src={mockData.store.photo}
                alt="Store Profile"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <img 
                src="/images/Client/product-page/client-account.svg"
                alt="Default Store Profile"
                className="w-full h-full rounded-full object-cover"
              />
            )}
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              <label htmlFor="store-photo" className="cursor-pointer">
                <FiUpload className="w-6 h-6 text-white" />
              </label>
              <input
                type="file"
                id="store-photo"
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      mockData.store.photo = reader.result;
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </div>
          </div>
          <h2 className="text-xl font-semibold">{mockData.store.name}</h2>
          <p className="text-gray-600">{mockData.store.type}</p>
          <p className="text-sm text-gray-500">{mockData.store.location}</p>
        </div>
      </div>
    );
  };

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

  const renderTabContent = () => {
    switch(activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-4 gap-4">
              {Object.entries(mockData.store.stats).map(([key, value]) => (
                <StatsCard key={key} label={key} value={value} trend={mockData.store.stats[key].trend} />
              ))}
            </div>

            {/* Store Info */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">About Store</h3>
                <button 
                  onClick={() => setShowStoreModal(true)}
                  className="flex items-center text-sm text-blue-600 hover:text-blue-700"
                >
                  <FiEdit2 className="mr-1" /> Edit Store
                </button>
              </div>
              <p className="text-gray-600">{mockData.store.description}</p>
            </div>

            {/* Seller Info */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Seller Information</h3>
                <button 
                  onClick={() => setShowProfileModal(true)}
                  className="flex items-center text-sm text-blue-600 hover:text-blue-700"
                >
                  <FiEdit2 className="mr-1" /> Edit Profile
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-medium">{mockData.seller.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Role</p>
                  <p className="font-medium">{mockData.seller.role}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{mockData.seller.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{mockData.seller.phone}</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'documents':
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-6">Legislative Documents</h3>
              
              {/* Business Name Registration Certificate */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h4 className="text-lg font-medium">Business Name Registration Certificate</h4>
                    <p className="text-sm text-gray-500 mt-1">Mar 2021</p>
                  </div>
                  <div className="relative">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center">
                      <FiUpload className="mr-2" />
                      Upload
                    </button>
                    <input
                      type="file"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      accept=".pdf,.doc,.docx"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative group">
                    <img
                      src="/path-to-document-preview-1.jpg"
                      alt="Document Preview"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 bg-blue-500 text-white rounded-full hover:bg-blue-600">
                        <FiX className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="relative group">
                    <img
                      src="/path-to-document-preview-2.jpg"
                      alt="Document Preview"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 bg-blue-500 text-white rounded-full hover:bg-blue-600">
                        <FiX className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Business Permit */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h4 className="text-lg font-medium">Business Permit</h4>
                    <p className="text-sm text-gray-500 mt-1">Mar 2021</p>
                  </div>
                  <div className="relative">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center">
                      <FiUpload className="mr-2" />
                      Upload
                    </button>
                    <input
                      type="file"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      accept=".pdf,.doc,.docx"
                    />
                  </div>
                </div>
                {/* Similar grid for document previews */}
              </div>

              {/* Tax Identification Number */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h4 className="text-lg font-medium">Tax Identification Number</h4>
                    <p className="text-sm text-gray-500 mt-1">Mar 2021</p>
                  </div>
                  <div className="relative">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center">
                      <FiUpload className="mr-2" />
                      Upload
                    </button>
                    <input
                      type="file"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      accept=".pdf,.doc,.docx"
                    />
                  </div>
                </div>
                {/* Similar grid for document previews */}
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
    return (
      <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
        <h3 className="font-medium mb-3">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-2">
          <button className="p-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md flex items-center">
            <FiPackage className="mr-2" /> Add Product
          </button>
          <button className="p-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md flex items-center">
            <FiFileText className="mr-2" /> View Orders
          </button>
        </div>
      </div>
    );
  };

  const BusinessHours = () => {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm mb-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">Business Hours</h3>
          <button className="text-sm text-blue-600 hover:text-blue-700">
            <FiEdit2 className="inline mr-1" /> Edit
          </button>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Monday - Friday</span>
            <span>9:00 AM - 6:00 PM</span>
          </div>
          <div className="flex justify-between">
            <span>Saturday</span>
            <span>9:00 AM - 1:00 PM</span>
          </div>
          <div className="flex justify-between">
            <span>Sunday</span>
            <span className="text-red-500">Closed</span>
          </div>
        </div>
      </div>
    );
  };

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
      <BusinessHours />
      <PerformanceMetrics />
    </div>
  );

  const RightColumn = () => (
    <div className="space-y-6">
      <TabNavigation />
      {renderTabContent()}
    </div>
  );

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
        storeData={mockData.store} 
      />
      <EditProfileModal 
        isOpen={showProfileModal} 
        onClose={() => setShowProfileModal(false)} 
        profileData={mockData.seller} 
      />
    </div>
  );
};

export default SellerProfile;
