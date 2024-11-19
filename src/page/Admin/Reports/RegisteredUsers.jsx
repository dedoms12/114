import AdminNavbar from '../components/AdminNavbar';
import AdminSidebar from '../components/AdminSidebar';
import { 
  FiSearch, FiDownload, FiUser, FiFilter, 
  FiAlertCircle, FiUserCheck, FiUserX, FiMoreVertical, 
  FiClock, FiLock, FiUnlock, FiTrash2,
  FiSlash 
} from 'react-icons/fi';
import { useState, useEffect } from 'react';
import { users, userStatistics } from './data/userData';
import UserHistoryModal from './components/UserHistoryModal';

const RegisteredUsers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showBlacklistModal, setShowBlacklistModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: 'joinDate', direction: 'desc' });
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [newRole, setNewRole] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Summary Cards Data
  const summaryCards = [
    {
      title: 'Total Users',
      value: userStatistics.totalUsers,
      icon: FiUser,
      color: 'blue'
    },
    {
      title: 'Active Users',
      value: userStatistics.activeUsers,
      icon: FiUserCheck,
      color: 'green'
    },
    {
      title: 'Blacklisted Users',
      value: userStatistics.blacklistedUsers,
      icon: FiUserX,
      color: 'red'
    }
  ];

  // Filter users based on search, role, and status
  useEffect(() => {
    let result = [...users];
    
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter(user => 
        user.name.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower)
      );
    }

    if (selectedRole !== 'all') {
      result = result.filter(user => user.role === selectedRole);
    }

    if (selectedStatus !== 'all') {
      result = result.filter(user => user.status === selectedStatus);
    }

    setFilteredUsers(result);
  }, [searchTerm, selectedRole, selectedStatus, users]);

  // Blacklist selected users
  const handleBlacklist = () => {
    const updatedUsers = users.map(user => {
      if (selectedUsers.includes(user.id)) {
        return { ...user, status: 'banned' };
      }
      return user;
    });
    // Update localStorage
    const blacklistedEntities = JSON.parse(
      localStorage.getItem('blacklistedEntities') || '{"users":[]}'
    );
    selectedUsers.forEach(userId => {
      const user = users.find(u => u.id === userId);
      blacklistedEntities.users.push({
        email: user.email,
        status: 'banned',
        date: new Date().toISOString()
      });
    });
    localStorage.setItem('blacklistedEntities', JSON.stringify(blacklistedEntities));
    setShowBlacklistModal(false);
    setSelectedUsers([]);
  };

  // Enhanced filter controls component
  const FilterControls = () => (
    <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px] relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or email..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
        >
          <option value="all">All Roles</option>
          <option value="buyer">Buyers</option>
          <option value="seller">Sellers</option>
          <option value="admin">Admin</option>
        </select>
        <select
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="banned">Banned</option>
        </select>
      </div>
    </div>
  );

  // Add pagination logic
  const getCurrentPageUsers = () => {
    const indexOfLastUser = currentPage * itemsPerPage;
    const indexOfFirstUser = indexOfLastUser - itemsPerPage;
    return filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  };

  // Add pagination controls
  const Pagination = () => {
    const pageCount = Math.ceil(filteredUsers.length / itemsPerPage);
    
    return (
      <div className="flex items-center justify-between px-6 py-3 border-t">
        <div className="flex items-center">
          <span className="text-sm text-gray-700">
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredUsers.length)} of{' '}
            {filteredUsers.length} results
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded-lg border disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, pageCount))}
            disabled={currentPage === pageCount}
            className="px-3 py-1 rounded-lg border disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    );
  };

  // Update UserTable component to include pagination
  const UserTable = () => {
    const [showActionMenu, setShowActionMenu] = useState(null);
    const [showUserHistory, setShowUserHistory] = useState(null);

    const handleRoleChange = (userId) => {
      const user = filteredUsers.find(u => u.id === userId);
      setSelectedUserId(userId);
      setNewRole(user.role);
      setShowRoleModal(true);
    };

    const confirmRoleChange = () => {
      setFilteredUsers(prevUsers => 
        prevUsers.map(user => {
          if (user.id === selectedUserId) {
            return { ...user, role: newRole };
          }
          return user;
        })
      );
      
      // Update the original users array as well
      const userIndex = users.findIndex(u => u.id === selectedUserId);
      if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], role: newRole };
      }
      
      setShowRoleModal(false);
    };

    const handleDeleteUser = (userId) => {
      setSelectedUserId(userId);
      setShowDeleteModal(true);
    };

    const confirmDelete = () => {
      const updatedUsers = users.filter(user => user.id !== selectedUserId);
      setFilteredUsers(updatedUsers);
      setShowDeleteModal(false);
    };

    const handleViewHistory = (userId) => {
      setShowUserHistory(userId);
    };

    return (
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="w-8 px-6 py-3">
                  <input type="checkbox" className="rounded border-gray-300" />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Active</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {getCurrentPageUsers().map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300"
                      checked={selectedUsers.includes(user.id)}
                      onChange={(e) => {
                        setSelectedUsers(prev =>
                          e.target.checked
                            ? [...prev, user.id]
                            : prev.filter(id => id !== user.id)
                        );
                      }}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        {user.avatar ? (
                          <img
                            className="h-10 w-10 rounded-full"
                            src={user.avatar}
                            alt={user.name}
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <FiUser className="h-6 w-6 text-gray-500" />
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{user.role}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{user.status}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{user.lastActive}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => handleViewHistory(user.id)}
                        className="p-1.5 hover:bg-gray-100 rounded-full tooltip-trigger"
                        title="View History"
                      >
                        <FiClock className="w-5 h-5 text-gray-600" />
                      </button>
                      
                      <button
                        onClick={() => handleRoleChange(user.id)}
                        className="p-1.5 hover:bg-gray-100 rounded-full tooltip-trigger"
                        title="Change Role"
                      >
                        <FiUserCheck className="w-5 h-5 text-blue-600" />
                      </button>
                      
                      {user.status !== 'banned' ? (
                        <button
                          onClick={() => handleBlockUser(user.id)}
                          className="p-1.5 hover:bg-red-50 rounded-full tooltip-trigger"
                          title="Block User"
                        >
                          <FiSlash className="w-5 h-5 text-red-600" />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleUnblockUser(user.id)}
                          className="p-1.5 hover:bg-green-50 rounded-full tooltip-trigger"
                          title="Unblock User"
                        >
                          <FiUnlock className="w-5 h-5 text-green-600" />
                        </button>
                      )}
                      
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="p-1.5 hover:bg-red-50 rounded-full tooltip-trigger"
                        title="Delete User"
                      >
                        <FiTrash2 className="w-5 h-5 text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination />
        
        {/* User History Modal */}
        {showUserHistory && (
          <UserHistoryModal
            userId={showUserHistory}
            onClose={() => setShowUserHistory(null)}
            users={users}
          />
        )}
      </div>
    );
  };

  const handleRoleChange = (userId) => {
    const user = filteredUsers.find(u => u.id === userId);
    setSelectedUserId(userId);
    setNewRole(user.role);
    setShowRoleModal(true);
  };

  const confirmRoleChange = () => {
    setFilteredUsers(prevUsers => 
      prevUsers.map(user => {
        if (user.id === selectedUserId) {
          return { ...user, role: newRole };
        }
        return user;
      })
    );
    
    // Update the original users array as well
    const userIndex = users.findIndex(u => u.id === selectedUserId);
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], role: newRole };
    }
    
    setShowRoleModal(false);
  };

  const handleBlockUser = (userId) => {
    const updatedUsers = users.map(user => {
      if (user.id === userId) {
        return { ...user, status: 'banned' };
      }
      return user;
    });
    setFilteredUsers(updatedUsers);
  };

  const handleUnblockUser = (userId) => {
    const updatedUsers = users.map(user => {
      if (user.id === userId) {
        return { ...user, status: 'active' };
      }
      return user;
    });
    setFilteredUsers(updatedUsers);
  };

  const handleDeleteUser = (userId) => {
    setSelectedUserId(userId);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    const updatedUsers = users.filter(user => user.id !== selectedUserId);
    setFilteredUsers(updatedUsers);
    setShowDeleteModal(false);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminNavbar />
        <div className="flex-1 p-8">
          {/* Header and Controls */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
                <p className="mt-2 text-gray-600">Monitor and manage user accounts</p>
              </div>
              <div className="flex items-center gap-4">
                {selectedUsers.length > 0 && (
                  <button
                    onClick={() => setShowBlacklistModal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
                  >
                    <FiAlertCircle />
                    Blacklist Selected
                  </button>
                )}
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100">
                  <FiDownload />
                  Export List
                </button>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {summaryCards.map((card, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-lg bg-${card.color}-50`}>
                      <card.icon className={`w-6 h-6 text-${card.color}-600`} />
                    </div>
                    <span className="text-2xl font-bold">{card.value}</span>
                  </div>
                  <h3 className="mt-4 text-gray-600">{card.title}</h3>
                </div>
              ))}
            </div>

            <FilterControls />
            <UserTable />
          </div>
        </div>
      </div>

      {/* Blacklist Confirmation Modal */}
      {showBlacklistModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Confirm Blacklist</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to blacklist the selected users?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={handleBlacklist}
                className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"
              >
                Confirm
              </button>
              <button
                onClick={() => setShowBlacklistModal(false)}
                className="px-4 py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Role Change Modal */}
      {showRoleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Change User Role</h3>
            <select
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 mb-6"
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
            >
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
              <option value="admin">Admin</option>
            </select>
            <div className="flex justify-end gap-4">
              <button
                onClick={confirmRoleChange}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Confirm
              </button>
              <button
                onClick={() => setShowRoleModal(false)}
                className="px-4 py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Delete User</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this user? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisteredUsers;
