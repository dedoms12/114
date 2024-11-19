import { useState } from 'react';
import AdminNavbar from '../components/AdminNavbar';
import AdminSidebar from '../components/AdminSidebar';
import { FiSearch, FiAlertTriangle, FiCheck, FiX, FiUserX } from 'react-icons/fi';

const BlacklistedStores = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showBlacklistModal, setShowBlacklistModal] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [blacklistReason, setBlacklistReason] = useState('');
  const [activeTab, setActiveTab] = useState('stores'); // 'stores' or 'users'

  // Mock data for blacklisted entities (replace with real data later)
  const [blacklistedEntities, setBlacklistedEntities] = useState({
    stores: [
      {
        id: 1,
        name: "MedTech Solutions",
        blacklistDate: null,
        reason: null,
        status: "active",
        location: "Quezon City, Metro Manila",
        reportCount: 0,
        type: 'store'
      },
      {
        id: 2,
        name: "Healthcare Plus Drugstore",
        blacklistDate: null,
        reason: null,
        status: "active",
        location: "456 Park Avenue, Makati City",
        reportCount: 0,
        type: 'store'
      },
      {
        id: 3,
        name: "MedTech Solutions Pharmacy",
        blacklistDate: null,
        reason: null,
        status: "active",
        location: "123 Main Street, Quezon City",
        reportCount: 0,
        type: 'store'
      }
    ],
    users: [
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        blacklistDate: null,
        reason: null,
        status: "active",
        reportCount: 0,
        type: 'user'
      },
      {
        id: 2,
        name: "Juan Dela Cruz",
        email: "juan@example.com",
        blacklistDate: null,
        reason: null,
        status: "active",
        reportCount: 0,
        type: 'user'
      },
      {
        id: 3,
        name: "Maria Santos",
        email: "maria@pharmacy.com",
        blacklistDate: null,
        reason: null,
        status: "active",
        reportCount: 0,
        type: 'user'
      }
    ]
  });

  const handleStatusUpdate = (entity, newStatus) => {
    setSelectedEntity(entity);
    if (newStatus === 'blacklisted' || newStatus === 'banned') {
      setShowBlacklistModal(true);
    } else {
      // Handle unban/unblacklist
      updateEntityStatus(entity, newStatus, 'Status restored');
    }
  };

  const updateEntityStatus = (entity, newStatus, reason) => {
    const entityType = entity.type === 'store' ? 'stores' : 'users';
    const updatedEntities = { ...blacklistedEntities };
    const index = updatedEntities[entityType].findIndex(e => e.id === entity.id);

    if (index >= 0) {
      updatedEntities[entityType][index] = {
        ...entity,
        status: newStatus,
        reason: reason,
        blacklistDate: newStatus === 'active' ? null : new Date().toISOString().split('T')[0]
      };
    }

    setBlacklistedEntities(updatedEntities);
    setShowBlacklistModal(false);
    setBlacklistReason('');
    setSelectedEntity(null);
  };

  const confirmStatusUpdate = () => {
    if (selectedEntity && blacklistReason) {
      updateEntityStatus(
        selectedEntity,
        selectedEntity.type === 'store' ? 'blacklisted' : 'banned',
        blacklistReason
      );
    }
  };

  const renderEntityList = () => {
    const entities = activeTab === 'stores' ? blacklistedEntities.stores : blacklistedEntities.users;
    
    return (
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {activeTab === 'stores' ? 'Store Name' : 'User Name'}
            </th>
            {activeTab === 'stores' && (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
            )}
            {activeTab === 'users' && (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
            )}
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {entities.map((entity) => (
            <tr key={entity.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{entity.name}</div>
              </td>
              {activeTab === 'stores' && (
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{entity.location}</div>
                </td>
              )}
              {activeTab === 'users' && (
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{entity.email}</div>
                </td>
              )}
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  entity.status === 'active' 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {entity.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{entity.reason}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{entity.blacklistDate}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {entity.status === 'active' ? (
                  <button
                    onClick={() => handleStatusUpdate(entity, entity.type === 'store' ? 'blacklisted' : 'banned')}
                    className="text-red-600 hover:text-red-900"
                  >
                    {entity.type === 'store' ? 'Blacklist' : 'Ban'}
                  </button>
                ) : (
                  <button
                    onClick={() => handleStatusUpdate(entity, 'active')}
                    className="text-green-600 hover:text-green-900"
                  >
                    Restore
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminNavbar />
        <div className="flex-1 bg-gray-100 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Restricted Entities</h1>
            <p className="text-sm text-gray-600">Manage blacklisted stores and banned users</p>
          </div>

          {/* Tab Navigation */}
          <div className="mb-6">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab('stores')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'stores'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Stores
                </button>
                <button
                  onClick={() => setActiveTab('users')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'users'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Users
                </button>
              </nav>
            </div>
          </div>

          {/* Search Bar */}
          <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder={`Search ${activeTab}...`}
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Entity List */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="overflow-x-auto">
              {renderEntityList()}
            </div>
          </div>
        </div>
      </div>

      {/* Blacklist/Ban Modal */}
      {showBlacklistModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-medium mb-4">
              {selectedEntity?.type === 'store' ? 'Blacklist Store' : 'Ban User'}
            </h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reason
              </label>
              <textarea
                value={blacklistReason}
                onChange={(e) => setBlacklistReason(e.target.value)}
                className="w-full p-2 border rounded-md"
                rows="4"
                placeholder="Enter detailed reason..."
              />
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowBlacklistModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={confirmStatusUpdate}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlacklistedStores; 