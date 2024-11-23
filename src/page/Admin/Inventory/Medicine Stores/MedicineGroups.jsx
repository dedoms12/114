import AdminNavbar from '../../components/AdminNavbar';
import AdminSidebar from '../../components/AdminSidebar';
import { 
  FiSearch, FiMapPin, FiPhone, FiMail, FiFilter, FiDownload, 
  FiEdit2, FiTrash2, FiSlash, FiEye, FiPlus, FiRefreshCw,
  FiGrid, FiList as FiListIcon, FiShield, FiGlobe
} from 'react-icons/fi';
import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BlockStoreModal from './components/BlockStoreModal';
import { useBlocklist } from '../context/BlocklistContext';
import { toast } from 'react-toastify';
import StoreDetailModal from './components/StoreDetailModal';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

const MedicineGroups = () => {
  const { pharmacies, setPharmacies, addBlockedStore } = useBlocklist();
  const [searchTerm, setSearchTerm] = useState('');
  const [view, setView] = useState('grid');
  const [selectedStatus, setSelectedStatus] = useState('all');
  
  // Define getStoresPerPage before using it
  const getStoresPerPage = () => {
    if (view === 'grid') {
      return window.innerWidth >= 768 ? 4 : 2; // 4 for desktop, 2 for mobile
    }
    return 5; // For table view
  };

  // Now we can use getStoresPerPage in our state initialization
  const [storesPerPage, setStoresPerPage] = useState(getStoresPerPage());
  const [currentPage, setCurrentPage] = useState(1);
  
  // Rest of your state declarations
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showActionModal, setShowActionModal] = useState(false);
  const [actionType, setActionType] = useState('');
  const [blockDetails, setBlockDetails] = useState({
    reason: '',
    blockType: 'temporary',
    reviewDate: ''
  });
  const [storeDetails, setStoreDetails] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setStoresPerPage(getStoresPerPage());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [view]);

  // Calculate indexes
  const indexOfLastStore = currentPage * storesPerPage;
  const indexOfFirstStore = indexOfLastStore - storesPerPage;
  const currentStores = pharmacies.slice(indexOfFirstStore, indexOfLastStore);
  const totalPages = Math.ceil(pharmacies.length / storesPerPage);

  useEffect(() => {
    if (!pharmacies || pharmacies.length === 0) {
      const mockPharmacies = [
        {
          id: 1,
          name: "MedTech Solutions Pharmacy",
          address: "123 Main Street, Quezon City",
          phone: "+63 912 345 6789",
          email: "medtech@example.com",
          licenseNumber: "PHA-2024-001",
          status: "active",
          branchCount: 5,
          medicineGroups: ["Medical Supplies", "Personal Care", "Prescription Drugs"],
          branches: [
            { location: "Quezon City", address: "123 Main Street" },
            { location: "Makati", address: "456 Business Ave" }
          ],
          operatingHours: "8:00 AM - 10:00 PM",
          certifications: ["FDA", "ISO 9001"],
          lastInspection: "2024-02-15"
        },
        {
          id: 2,
          name: "HealthCare Plus Pharmacy",
          address: "456 Business Ave, Makati City",
          phone: "+63 917 123 4567",
          email: "healthcare@example.com",
          licenseNumber: "PHA-2024-002",
          status: "blocked",
          branchCount: 3,
          medicineGroups: ["Prescription Drugs", "Medical Supplies", "Wellness Products"],
          branches: [
            { location: "Makati", address: "456 Business Ave" },
            { location: "BGC", address: "789 Corporate Drive" }
          ],
          operatingHours: "9:00 AM - 9:00 PM",
          certifications: ["FDA", "ISO 9001"],
          lastInspection: "2024-03-01"
        },
        {
          id: 3,
          name: "Wellness First Pharmacy",
          address: "789 Health Street, Pasig City",
          phone: "+63 918 765 4321",
          email: "wellness@example.com",
          licenseNumber: "PHA-2024-003",
          status: "inactive",
          branchCount: 2,
          medicineGroups: ["Wellness Products", "Natural Medicine", "Personal Care"],
          branches: [
            { location: "Pasig", address: "789 Health Street" }
          ],
          operatingHours: "8:00 AM - 8:00 PM",
          certifications: ["FDA"],
          lastInspection: "2024-01-20"
        },
        {
          id: 4,
          name: "PharmaCare Express",
          address: "321 Quick Road, Mandaluyong",
          phone: "+63 919 876 5432",
          email: "express@example.com",
          licenseNumber: "PHA-2024-004",
          status: "active",
          branchCount: 7,
          medicineGroups: ["Prescription Drugs", "Emergency Supplies", "First Aid"],
          branches: [
            { location: "Mandaluyong", address: "321 Quick Road" },
            { location: "San Juan", address: "123 Fast Street" }
          ],
          operatingHours: "24/7",
          certifications: ["FDA", "ISO 9001", "ISO 14001"],
          lastInspection: "2024-02-28"
        },
        {
          id: 5,
          name: "Family Care Pharmacy",
          address: "567 Community Ave, Pasay City",
          phone: "+63 915 432 1098",
          email: "family@example.com",
          licenseNumber: "PHA-2024-005",
          status: "active",
          branchCount: 4,
          medicineGroups: ["Family Medicine", "Pediatric Care", "Elderly Care"],
          branches: [
            { location: "Pasay", address: "567 Community Ave" },
            { location: "Parañaque", address: "890 Family Street" }
          ],
          operatingHours: "7:00 AM - 11:00 PM",
          certifications: ["FDA", "ISO 9001"],
          lastInspection: "2024-03-10"
        }
      ];
      setPharmacies(mockPharmacies);
    }
  }, [pharmacies, setPharmacies]);

  const handleAction = (store, action) => {
    setSelectedStore(store);
    setStoreDetails(store);
    switch(action) {
      case 'view':
        setShowDetailModal(true);
        setIsEditing(false);
        break;
      case 'edit':
        setShowDetailModal(true);
        setIsEditing(true);
        break;
      case 'block':
        setShowActionModal(true);
        setActionType('block');
        break;
      case 'delete':
        if (window.confirm(`Are you sure you want to delete ${store.name}?`)) {
          handleDelete(store.id);
        }
        break;
    }
  };

  const handleBlockStore = () => {
    if (!selectedStore) return;
    
    const success = addBlockedStore({
      id: selectedStore.id,
      name: selectedStore.name,
      reason: blockDetails.reason,
      blockType: blockDetails.blockType,
      customReason: blockDetails.customReason,
      reviewDate: blockDetails.reviewDate,
      blacklistDate: new Date().toISOString()
    });

    if (success) {
      setShowActionModal(false);
    }
  };

  const handleDelete = async (storeId) => {
    try {
      // Show confirmation dialog
      const confirmed = window.confirm('Are you sure you want to delete this pharmacy? This action cannot be undone.');
      if (!confirmed) return;

      // Here you would typically make an API call to delete the store
      // await api.deleteStore(storeId);

      // Update local state
      const updatedPharmacies = pharmacies.filter(store => store.id !== storeId);
      setPharmacies(updatedPharmacies);
      
      // Show success message
      toast.success('Pharmacy deleted successfully');
    } catch (error) {
      console.error('Error deleting pharmacy:', error);
      toast.error('Failed to delete pharmacy');
    }
  };

  const handleSave = async () => {
    try {
      if (!storeDetails) return;

      // Validate required fields
      if (!storeDetails.name || !storeDetails.licenseNumber) {
        toast.error('Please fill in all required fields');
        return;
      }

      // Here you would typically make an API call to update the store
      // await api.updateStore(storeDetails.id, storeDetails);
      
      // Update local state
      const updatedPharmacies = pharmacies.map(store =>
        store.id === storeDetails.id ? storeDetails : store
      );
      setPharmacies(updatedPharmacies);
      
      // Close modal and reset editing state
      setShowDetailModal(false);
      setIsEditing(false);
      toast.success('Pharmacy updated successfully');
    } catch (error) {
      console.error('Error updating pharmacy:', error);
      toast.error('Failed to update pharmacy');
    }
  };

  // Add this status badge renderer
  const renderStatusBadge = (status) => {
    const statusClasses = {
      active: 'bg-green-100 text-green-800',
      blocked: 'bg-red-100 text-red-800',
      warning: 'bg-yellow-100 text-yellow-800'
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusClasses[status] || statusClasses.active}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  // Add this function to filter pharmacies
  const getFilteredPharmacies = () => {
    return pharmacies.filter(pharmacy => {
      const matchesSearch = pharmacy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           pharmacy.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           pharmacy.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = selectedStatus === 'all' || pharmacy.status === selectedStatus;

      return matchesSearch && matchesStatus;
    });
  };

  const renderContent = () => {
    const filteredPharmacies = getFilteredPharmacies();
    const paginatedPharmacies = filteredPharmacies.slice(indexOfFirstStore, indexOfLastStore);

    return view === 'grid' ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {paginatedPharmacies.map((pharmacy) => (
          <div key={pharmacy.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="p-4">
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold truncate">{pharmacy.name}</h3>
                {renderStatusBadge(pharmacy.status)}
              </div>
              
              {/* Info */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-gray-600">
                  <FiMapPin className="w-4 h-4 mr-2 shrink-0" />
                  <span className="truncate">{pharmacy.address}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FiPhone className="w-4 h-4 mr-2 shrink-0" />
                  <span>{pharmacy.phone}</span>
                </div>
              </div>

              {/* Tags */}
              <div className="mt-3 flex flex-wrap gap-1">
                {pharmacy.medicineGroups.slice(0, 2).map((group, index) => (
                  <span key={index} className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-xs">
                    {group}
                  </span>
                ))}
                {pharmacy.medicineGroups.length > 2 && (
                  <span className="px-2 py-1 bg-gray-50 text-gray-600 rounded-full text-xs">
                    +{pharmacy.medicineGroups.length - 2}
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="mt-4 pt-3 border-t flex justify-end gap-2">
                <button
                  onClick={() => handleAction(pharmacy, 'view')}
                  className="p-1.5 text-gray-600 hover:text-blue-600"
                >
                  <FiEye className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleAction(pharmacy, 'edit')}
                  className="p-1.5 text-gray-600 hover:text-blue-600"
                >
                  <FiEdit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleAction(pharmacy, 'block')}
                  className="p-1.5 text-gray-600 hover:text-red-600"
                >
                  <FiSlash className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pharmacy Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Address
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Medicine Groups
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedPharmacies.map((pharmacy) => (
              <tr key={pharmacy.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{pharmacy.name}</div>
                  <div className="text-sm text-gray-500">{pharmacy.licenseNumber}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{pharmacy.address}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{pharmacy.phone}</div>
                  <div className="text-sm text-gray-500">{pharmacy.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {renderStatusBadge(pharmacy.status)}
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {pharmacy.medicineGroups.map((group, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium"
                      >
                        {group}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end gap-2">
                    <button
                      data-tooltip-id={`view-store-${pharmacy.id}`}
                      data-tooltip-content="View pharmacy details"
                      onClick={() => handleAction(pharmacy, 'view')}
                      className="text-gray-600 hover:text-blue-600"
                    >
                      <FiEye className="w-4 h-4" />
                    </button>
                    <button
                      data-tooltip-id={`edit-store-${pharmacy.id}`}
                      data-tooltip-content="Edit pharmacy information"
                      onClick={() => handleAction(pharmacy, 'edit')}
                      className="text-gray-600 hover:text-blue-600"
                    >
                      <FiEdit2 className="w-4 h-4" />
                    </button>
                    <button
                      data-tooltip-id={`block-store-${pharmacy.id}`}
                      data-tooltip-content={pharmacy.status === 'blocked' ? 'Unblock pharmacy' : 'Block pharmacy'}
                      onClick={() => handleAction(pharmacy, 'block')}
                      className="text-gray-600 hover:text-red-600"
                    >
                      <FiSlash className="w-4 h-4" />
                    </button>
                    <button
                      data-tooltip-id={`delete-store-${pharmacy.id}`}
                      data-tooltip-content="Delete pharmacy"
                      onClick={() => handleAction(pharmacy, 'delete')}
                      className="text-gray-600 hover:text-red-600"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>

                    <Tooltip id={`view-store-${pharmacy.id}`} place="top" />
                    <Tooltip id={`edit-store-${pharmacy.id}`} place="top" />
                    <Tooltip id={`block-store-${pharmacy.id}`} place="top" />
                    <Tooltip id={`delete-store-${pharmacy.id}`} place="top" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const Pagination = () => {
    return (
      <div className="mt-6 flex justify-center gap-2">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-2 rounded-md bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50"
        >
          Previous
        </button>
        
        {[...Array(totalPages)].map((_, index) => {
          const pageNumber = index + 1;
          if (
            pageNumber === 1 ||
            pageNumber === totalPages ||
            (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
          ) {
            return (
              <button
                key={pageNumber}
                onClick={() => setCurrentPage(pageNumber)}
                className={`px-3 py-2 rounded-md ${
                  currentPage === pageNumber
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                {pageNumber}
              </button>
            );
          } else if (
            pageNumber === currentPage - 2 ||
            pageNumber === currentPage + 2
          ) {
            return <span key={pageNumber} className="px-2 py-2">...</span>;
          }
          return null;
        })}

        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-2 rounded-md bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    );
  };

  if (!pharmacies || pharmacies.length === 0) {
    return (
      <div className="flex h-screen">
        <AdminSidebar />
        <div className="flex-1 flex flex-col">
          <AdminNavbar />
          <div className="flex-1 bg-gray-100 p-6">
            <p>No pharmacies found.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminNavbar />
        <div className="flex-1 bg-gray-100 p-6 flex flex-col h-[calc(100vh-64px)]">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold">Pharmacy Management</h1>
              <p className="text-sm text-gray-600">Monitor and manage registered pharmacies</p>
            </div>
            {/* Action buttons */}
          </div>

          {/* Filters Section */}
          <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Bar */}
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search pharmacies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
              </div>

              {/* Filter Buttons */}
              <div className="flex gap-2">
                <div className="relative">
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="appearance-none pl-10 pr-8 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="blocked">Blocked</option>
                  </select>
                  <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                </div>

                {/* View Toggle */}
                <button
                  onClick={() => setView(view === 'grid' ? 'table' : 'grid')}
                  className="p-2 border rounded-lg hover:bg-gray-50"
                  title={view === 'grid' ? 'Switch to table view' : 'Switch to grid view'}
                >
                  {view === 'grid' ? <FiListIcon className="w-5 h-5" /> : <FiGrid className="w-5 h-5" />}
                </button>

                {/* Export Button */}
                <button
                  className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
                  title="Export data"
                >
                  <FiDownload className="w-4 h-4" />
                  <span>Export</span>
                </button>
              </div>
            </div>
          </div>

          {/* Content Section - Fixed Height */}
          <div className="flex-1 min-h-0">
            {renderContent()}
          </div>

          {/* Pagination - Always at bottom */}
          <div className="mt-auto pt-4">
            <Pagination />
          </div>
        </div>
      </div>
    </div>
  );
};

export { MedicineGroups as default };
