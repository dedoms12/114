import { useState } from 'react';
import AdminNavbar from '../../components/AdminNavbar';
import AdminSidebar from '../../components/AdminSidebar';
import { 
  FiSearch, FiAlertTriangle, FiCheck, FiX, FiPackage, 
  FiShoppingBag, FiTrash2, FiRefreshCw, FiFilter, FiDownload, FiEdit2 
} from 'react-icons/fi';
import { useBlocklist } from '../context/BlocklistContext';
import { toast } from 'react-toastify';
import EditBlockModal from './components/EditBlockModal';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

const BlacklistManagement = () => {
  const { blockedItems, removeBlockedStore, updateBlockedMedicine, deleteBlockedMedicine, removeBlockedMedicine } = useBlocklist();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('medicines');
  const [selectedFilters, setSelectedFilters] = useState({
    blockType: 'all',
    dateRange: 'all'
  });
  const [showFilters, setShowFilters] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleUnblock = async (item) => {
    if (window.confirm(`Are you sure you want to unblock ${item.name}?`)) {
      const success = activeTab === 'medicines' 
        ? await removeBlockedMedicine(item.id)
        : await removeBlockedStore(item.id);
        
      if (success) {
        toast.success(`${item.name} has been unblocked`);
      }
    }
  };

  const handleExport = () => {
    const items = activeTab === 'medicines' ? blockedItems.medicines : blockedItems.stores;
    const csv = [
      activeTab === 'medicines' 
        ? ['Name', 'Category', 'Block Type', 'Reason', 'Date Blocked', 'Review Date']
        : ['Name', 'Block Type', 'Reason', 'Date Blocked', 'Review Date'],
      ...items.map(item => 
        activeTab === 'medicines' 
          ? [
              item.name,
              item.category,
              item.blockType,
              item.reason,
              new Date(item.blacklistDate).toLocaleDateString(),
              item.reviewDate ? new Date(item.reviewDate).toLocaleDateString() : 'N/A'
            ]
          : [
              item.name,
              item.blockType,
              item.reason,
              new Date(item.blacklistDate).toLocaleDateString(),
              item.reviewDate ? new Date(item.reviewDate).toLocaleDateString() : 'N/A'
            ]
      )
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `blocked-${activeTab}-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const filterItems = (items) => {
    return items.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesBlockType = selectedFilters.blockType === 'all' || 
                              item.blockType === selectedFilters.blockType;
      
      if (selectedFilters.dateRange === 'all') return matchesSearch && matchesBlockType;
      
      const itemDate = new Date(item.blacklistDate);
      const now = new Date();
      switch (selectedFilters.dateRange) {
        case 'today':
          return matchesSearch && matchesBlockType && 
                 itemDate.toDateString() === now.toDateString();
        case 'week':
          const weekAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);
          return matchesSearch && matchesBlockType && itemDate >= weekAgo;
        case 'month':
          const monthAgo = new Date(now.setMonth(now.getMonth() - 1));
          return matchesSearch && matchesBlockType && itemDate >= monthAgo;
        default:
          return matchesSearch && matchesBlockType;
      }
    });
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setShowEditModal(true);
  };

  const handleDelete = async (item) => {
    if (window.confirm(`Are you sure you want to delete ${item.name} from the blocklist?`)) {
      const success = await deleteBlockedMedicine(item.id);
      if (success) {
        toast.success(`${item.name} has been removed from blocklist`);
      }
    }
  };

  const handleSaveEdit = async (editedItem) => {
    const success = await updateBlockedMedicine(editedItem.id, editedItem);
    if (success) {
      setShowEditModal(false);
      setSelectedItem(null);
    }
  };

  const renderContent = () => {
    const filteredItems = filterItems(
      activeTab === 'medicines' ? blockedItems.medicines : blockedItems.stores
    );

    return (
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 flex items-center gap-4">
              <div className="relative flex-1">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search blocked items..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-2 border rounded-lg flex items-center gap-2 hover:bg-gray-50"
              >
                <FiFilter className="w-4 h-4" />
                Filters
              </button>
              <button
                onClick={handleExport}
                className="px-4 py-2 border rounded-lg flex items-center gap-2 hover:bg-gray-50"
              >
                <FiDownload className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>

          {showFilters && (
            <div className="mt-4 flex gap-4">
              <select
                value={selectedFilters.blockType}
                onChange={(e) => setSelectedFilters(prev => ({
                  ...prev,
                  blockType: e.target.value
                }))}
                className="border rounded-lg px-3 py-2"
              >
                <option value="all">All Block Types</option>
                <option value="temporary">Temporary</option>
                <option value="permanent">Permanent</option>
              </select>

              <select
                value={selectedFilters.dateRange}
                onChange={(e) => setSelectedFilters(prev => ({
                  ...prev,
                  dateRange: e.target.value
                }))}
                className="border rounded-lg px-3 py-2"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
            </div>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                {activeTab === 'medicines' && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                )}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Block Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reason
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date Blocked
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Review Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredItems.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.name}
                  </td>
                  {activeTab === 'medicines' && (
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.category}
                    </td>
                  )}
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.blockType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.reason}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(item.blacklistDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.reviewDate ? new Date(item.reviewDate).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {renderActionButtons(item)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredItems.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No blocked items found
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderActionButtons = (item) => (
    <div className="flex items-center space-x-2">
      <button
        data-tooltip-id={`edit-tooltip-${item.id}`}
        data-tooltip-content="Edit block details"
        onClick={() => handleEdit(item)}
        className="text-blue-600 hover:text-blue-800"
      >
        <FiEdit2 className="w-5 h-5" />
      </button>
      <button
        data-tooltip-id={`delete-tooltip-${item.id}`}
        data-tooltip-content="Remove from blocklist"
        onClick={() => handleDelete(item)}
        className="text-red-600 hover:text-red-800"
      >
        <FiTrash2 className="w-5 h-5" />
      </button>
      <button
        data-tooltip-id={`unblock-tooltip-${item.id}`}
        data-tooltip-content="Unblock item"
        onClick={() => handleUnblock(item)}
        className="text-green-600 hover:text-green-800"
      >
        <FiCheck className="w-5 h-5" />
      </button>

      <Tooltip id={`edit-tooltip-${item.id}`} place="top" />
      <Tooltip id={`delete-tooltip-${item.id}`} place="top" />
      <Tooltip id={`unblock-tooltip-${item.id}`} place="top" />
    </div>
  );

  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminNavbar />
        <div className="flex-1 bg-gray-100 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Blacklist Management</h1>
            <p className="text-sm text-gray-600">Monitor and manage blocked medicines and stores</p>
          </div>

          {/* Tab Navigation */}
          <div className="mb-6">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab('medicines')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm inline-flex items-center ${
                    activeTab === 'medicines'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <FiPackage className="w-4 h-4 mr-2" />
                  Blocked Medicines
                </button>
                <button
                  onClick={() => setActiveTab('stores')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm inline-flex items-center ${
                    activeTab === 'stores'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <FiShoppingBag className="w-4 h-4 mr-2" />
                  Blocked Stores
                </button>
              </nav>
            </div>
          </div>

          {/* Content based on active tab */}
          {renderContent()}

          {showEditModal && (
            <EditBlockModal
              isOpen={showEditModal}
              onClose={() => {
                setShowEditModal(false);
                setSelectedItem(null);
              }}
              onSave={handleSaveEdit}
              item={selectedItem}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BlacklistManagement; 