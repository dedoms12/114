import AdminNavbar from '../../components/AdminNavbar';
import AdminSidebar from '../../components/AdminSidebar';
import { 
  FiSearch, FiFilter, FiDownload, FiEdit2, FiTrash2, 
  FiSlash, FiEye, FiPlus, FiRefreshCw, FiX, FiCamera, FiDollarSign, FiBox, FiCalendar, FiClock, FiTag, FiUpload 
} from 'react-icons/fi';
import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BlockMedicineModal from './components/BlockMedicineModal';
import { useBlocklist } from '../context/BlocklistContext';
import { toast } from 'react-toastify';

const MedicineList = () => {
  const { medicines, setMedicines, addBlockedMedicine } = useBlocklist();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPharmacy, setSelectedPharmacy] = useState('all');
  const [showActionModal, setShowActionModal] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [actionType, setActionType] = useState('');
  const [blockReason, setBlockReason] = useState('');
  const [view, setView] = useState('grid'); // 'grid' or 'table'
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [blockDetails, setBlockDetails] = useState({
    reason: '',
    blockType: 'temporary',
    reviewDate: ''
  });
  const navigate = useNavigate();

  // Add new state for detail modal content
  const [detailModalContent, setDetailModalContent] = useState({
    name: '',
    category: '',
    price: 0,
    stock: 0,
    status: 'active',
    description: '',
    image: null,
    lastUpdated: new Date().toISOString(),
    pharmacyLicense: '',
    tags: []
  });

  const [tags, setTags] = useState([
    'Prescription', 'Over-the-Counter', 'Generic', 'Branded',
    'Controlled', 'Refrigerated', 'Fragile'
  ]);
  const [newTag, setNewTag] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!medicines || medicines.length === 0) {
      const mockMedicines = [
        {
          id: 1,
          name: "Warmhouse 800D Electric Centrifuge Machine",
          seller: "MedTech Solutions",
          pharmacy: "MedTech Pharmacy",
          category: "Medical Supplies",
          price: 2349,
          stock: 30,
          status: "active",
          restrictions: [],
          lastUpdated: "2024-03-15",
          pharmacyLicense: "PHA-2024-001",
          image: "medicine-image-url.jpg",
          description: "High-quality centrifuge machine for medical laboratories"
        },
        {
          id: 2,
          name: "Digital Blood Pressure Monitor",
          seller: "HealthCare Plus",
          pharmacy: "HealthCare Pharmacy",
          category: "Medical Devices",
          price: 1299,
          stock: 50,
          status: "active",
          restrictions: [],
          lastUpdated: "2024-03-14",
          pharmacyLicense: "PHA-2024-002",
          image: "bp-monitor-url.jpg",
          description: "Accurate digital blood pressure monitoring device"
        },
        {
          id: 3,
          name: "Premium Stethoscope Professional Grade",
          seller: "MediEquip Pro",
          pharmacy: "MediEquip Pharmacy",
          category: "Medical Devices",
          price: 899,
          stock: 75,
          status: "active",
          restrictions: [],
          lastUpdated: "2024-03-13",
          pharmacyLicense: "PHA-2024-003",
          image: "stethoscope-url.jpg",
          description: "Professional-grade stethoscope for medical practitioners"
        },
        {
          id: 4,
          name: "Surgical Mask N95 (Box of 50)",
          seller: "SafetyFirst Medical",
          pharmacy: "SafetyFirst Pharmacy",
          category: "Medical Supplies",
          price: 499,
          stock: 200,
          status: "active",
          restrictions: [],
          lastUpdated: "2024-03-12",
          pharmacyLicense: "PHA-2024-004",
          image: "mask-url.jpg",
          description: "High-quality N95 surgical masks for medical use"
        },
        {
          id: 5,
          name: "Advanced Pulse Oximeter",
          seller: "HealthTech Solutions",
          pharmacy: "HealthTech Pharmacy",
          category: "Medical Devices",
          price: 799,
          stock: 45,
          status: "blocked",
          restrictions: ["Quality Check Required"],
          lastUpdated: "2024-03-11",
          pharmacyLicense: "PHA-2024-005",
          image: "oximeter-url.jpg",
          description: "Digital pulse oximeter with advanced features"
        },
        {
          id: 6,
          name: "Infrared Thermometer Professional",
          seller: "MedTech Solutions",
          pharmacy: "MedTech Pharmacy",
          category: "Medical Devices",
          price: 599,
          stock: 60,
          status: "active",
          restrictions: [],
          lastUpdated: "2024-03-10",
          pharmacyLicense: "PHA-2024-001",
          image: "thermometer-url.jpg",
          description: "Professional-grade infrared thermometer for accurate temperature readings"
        }
      ];
      setMedicines(mockMedicines);
    }
  }, []);

  // Add this effect to sync with blocklist changes
  useEffect(() => {
    if (medicines) {
      setDetailModalContent(prev => {
        if (prev.id) {
          const updatedMedicine = medicines.find(med => med.id === prev.id);
          return updatedMedicine ? { ...updatedMedicine } : prev;
        }
        return prev;
      });
    }
  }, [medicines]);

  const handleAction = (medicine, action) => {
    setSelectedMedicine(medicine);
    switch(action) {
      case 'view':
        setDetailModalContent({ ...medicine });
        setShowDetailModal(true);
        setIsEditing(false);
        break;
      case 'edit':
        setDetailModalContent({ ...medicine });
        setShowDetailModal(true);
        setIsEditing(true);
        break;
      case 'block':
        setShowActionModal(true);
        setActionType('block');
        break;
      case 'delete':
        if (window.confirm(`Are you sure you want to delete ${medicine.name}?`)) {
          handleDelete(medicine.id);
        }
        break;
    }
  };

  const handleChange = (field, value) => {
    setSelectedMedicine(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!selectedMedicine.name) newErrors.name = 'Name is required';
    if (!selectedMedicine.category) newErrors.category = 'Category is required';
    if (selectedMedicine.price <= 0) newErrors.price = 'Price must be greater than 0';
    if (selectedMedicine.stock < 0) newErrors.stock = 'Stock cannot be negative';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleDelete = async (medicineId) => {
    try {
      // API call would go here
      // await api.deleteMedicine(medicineId);
      
      // Update local state
      setMedicines(prevMedicines => 
        prevMedicines.filter(med => med.id !== medicineId)
      );
      toast.success('Medicine deleted successfully');
    } catch (error) {
      console.error('Error deleting medicine:', error);
      toast.error('Failed to delete medicine');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    try {
      // API call would go here
      // const updatedMedicine = await api.updateMedicine(selectedMedicine.id, detailModalContent);
      
      // Update local state
      setMedicines(prevMedicines =>
        prevMedicines.map(med =>
          med.id === selectedMedicine.id ? { ...med, ...detailModalContent } : med
        )
      );
      
      setShowDetailModal(false);
      setIsEditing(false);
      toast.success('Medicine updated successfully');
    } catch (error) {
      console.error('Error updating medicine:', error);
      toast.error('Failed to update medicine');
    }
  };

  const confirmAction = async () => {
    try {
      if (actionType === 'block') {
        const blockedMedicine = {
          id: selectedMedicine.id || Date.now(),
          name: selectedMedicine.name,
          pharmacy: selectedMedicine.pharmacy,
          category: selectedMedicine.category,
          blacklistDate: new Date().toISOString(),
          reason: blockDetails.reason === 'other' ? blockDetails.customReason : blockDetails.reason,
          blockType: blockDetails.blockType,
          reviewDate: blockDetails.blockType === 'temporary' ? blockDetails.reviewDate : null,
          status: 'blocked'
        };
        
        const success = await addBlockedMedicine(blockedMedicine);
        
        if (success) {
          // Update local medicines state
          setMedicines(prevMedicines => 
            prevMedicines.map(med => 
              med.id === selectedMedicine.id 
                ? { ...med, status: 'blocked' }
                : med
            )
          );
          toast.success(`${selectedMedicine.name} has been blocked`);
        }
      }
      
      setShowActionModal(false);
      setBlockDetails({
        reason: '',
        blockType: 'temporary',
        reviewDate: ''
      });
      setActionType('');
      setSelectedMedicine(null);
    } catch (error) {
      console.error('Error performing action:', error);
      toast.error('Failed to perform action');
    }
  };

  const handleViewBlocklist = () => {
    navigate('/admin/inventory/blocklist');
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setDetailModalContent(prev => ({
          ...prev,
          image: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTagAdd = () => {
    if (newTag && !detailModalContent.tags?.includes(newTag)) {
      setDetailModalContent(prev => ({
        ...prev,
        tags: [...(prev.tags || []), newTag]
      }));
      setNewTag('');
    }
  };

  const handleTagRemove = (tagToRemove) => {
    setDetailModalContent(prev => ({
      ...prev,
      tags: prev.tags?.filter(tag => tag !== tagToRemove) || []
    }));
  };

  // Add this near other status-related code
  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'blocked', label: 'Blocked' }
  ];

  // Update the categories array
  const categories = [
    { id: 1, name: 'General Health', value: 'general-health' },
    { id: 2, name: 'Medical Supplies', value: 'medical-supplies' },
    { id: 3, name: 'Supplements', value: 'supplements' },
    { id: 4, name: 'Personal Care', value: 'personal-care' }
  ];

  const handleBlockMedicine = async () => {
    if (!selectedMedicine) return;
    
    const success = await addBlockedMedicine({
      id: selectedMedicine.id,
      name: selectedMedicine.name,
      category: selectedMedicine.category,
      reason: blockDetails.reason,
      blockType: blockDetails.blockType,
      customReason: blockDetails.customReason,
      reviewDate: blockDetails.reviewDate,
      blacklistDate: new Date().toISOString()
    });

    if (success) {
      setShowActionModal(false);
      toast.success(`${selectedMedicine.name} has been blocked`);
    }
  };

  const renderContent = () => {
    const filteredMedicines = medicines.filter(medicine => {
      const searchMatch = medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         medicine.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         medicine.pharmacy.toLowerCase().includes(searchTerm.toLowerCase());
                       
      const statusMatch = selectedStatus === 'all' || medicine.status === selectedStatus;
      const categoryMatch = selectedCategory === 'all' || medicine.category === selectedCategory;
      const pharmacyMatch = selectedPharmacy === 'all' || medicine.pharmacy === selectedPharmacy;

      return searchMatch && statusMatch && categoryMatch && pharmacyMatch;
    });

    return view === 'grid' ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredMedicines.map(medicine => (
          <div key={medicine.id} className="bg-white rounded-lg shadow-sm p-6 flex flex-col h-full">
            {/* Header with Status */}
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-semibold leading-tight line-clamp-2 flex-1 mr-2">
                {medicine.name}
              </h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                medicine.status === 'active' ? 'bg-green-100 text-green-800' : 
                medicine.status === 'blocked' ? 'bg-red-100 text-red-800' : 
                'bg-yellow-100 text-yellow-800'
              }`}>
                {medicine.status.charAt(0).toUpperCase() + medicine.status.slice(1)}
              </span>
            </div>

            {/* Content */}
            <div className="flex-1 space-y-3">
              <div className="flex items-center text-gray-600">
                <FiTag className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="text-sm truncate">{medicine.category}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <FiDollarSign className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="text-sm">${medicine.price.toLocaleString()}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <FiBox className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="text-sm">{medicine.stock} in stock</span>
              </div>
              <div className="flex items-center text-gray-600">
                <span className="text-sm font-medium mr-2">Seller:</span>
                <span className="text-sm truncate">{medicine.pharmacy}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-4 pt-4 border-t flex justify-end gap-2">
              <button
                onClick={() => handleAction(medicine, 'view')}
                className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                title="View Details"
              >
                <FiEye className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleAction(medicine, 'edit')}
                className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                title="Edit"
              >
                <FiEdit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleAction(medicine, 'block')}
                className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                title="Block"
              >
                <FiSlash className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleAction(medicine, 'delete')}
                className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                title="Delete"
              >
                <FiTrash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Seller
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredMedicines.map((medicine) => (
              <tr key={medicine.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{medicine.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{medicine.category}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">${medicine.price.toLocaleString()}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{medicine.stock}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    medicine.status === 'active' ? 'bg-green-100 text-green-800' : 
                    medicine.status === 'blocked' ? 'bg-red-100 text-red-800' : 
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {medicine.status.charAt(0).toUpperCase() + medicine.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{medicine.pharmacy}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => handleAction(medicine, 'view')}
                      className="text-gray-600 hover:text-blue-600"
                    >
                      <FiEye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleAction(medicine, 'edit')}
                      className="text-gray-600 hover:text-blue-600"
                    >
                      <FiEdit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleAction(medicine, 'block')}
                      className="text-gray-600 hover:text-red-600"
                    >
                      <FiSlash className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleAction(medicine, 'delete')}
                      className="text-gray-600 hover:text-red-600"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  // Add filter controls section
  const FilterControls = () => (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search medicines..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="blocked">Blocked</option>
          <option value="inactive">Inactive</option>
        </select>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Categories</option>
          <option value="Medical Supplies">Medical Supplies</option>
          <option value="Medical Devices">Medical Devices</option>
          <option value="Prescription Drugs">Prescription Drugs</option>
        </select>

        <select
          value={selectedPharmacy}
          onChange={(e) => setSelectedPharmacy(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Pharmacies</option>
          {[...new Set(medicines.map(m => m.pharmacy))].map(pharmacy => (
            <option key={pharmacy} value={pharmacy}>{pharmacy}</option>
          ))}
        </select>
      </div>
    </div>
  );

  // Update the status display in the detail modal
  const renderStatusBadge = (status) => {
    const statusClasses = {
      active: 'bg-green-100 text-green-800',
      blocked: 'bg-red-100 text-red-800',
      inactive: 'bg-yellow-100 text-yellow-800'
    };

    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
        statusClasses[status] || statusClasses.active
      }`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminNavbar />
        <div className="flex-1 bg-gray-100 p-6">
          {/* Enhanced Header with Actions */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold">Medicine Inventory</h1>
              <p className="text-sm text-gray-600">Manage and monitor medicine inventory across pharmacies</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-600 hover:text-gray-800">
                <FiRefreshCw className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Enhanced Filters Section */}
          <FilterControls />

          {/* Grid/Table View Toggle */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setView('grid')}
                className={`p-2 rounded ${view === 'grid' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'}`}
              >
                Grid View
              </button>
              <button 
                onClick={() => setView('table')}
                className={`p-2 rounded ${view === 'table' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'}`}
              >
                Table View
              </button>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800">
              <FiDownload className="w-4 h-4" />
              Export List
            </button>
          </div>

          {/* Medicines Display */}
          {renderContent()}

          {/* Action Modal */}
          {showActionModal && (
            <BlockMedicineModal
              isOpen={showActionModal && actionType === 'block'}
              onClose={() => setShowActionModal(false)}
              onConfirm={confirmAction}
              blockDetails={blockDetails}
              setBlockDetails={setBlockDetails}
              onViewBlocklist={handleViewBlocklist}
            />
          )}

          {/* Detail Modal */}
          {showDetailModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl p-0 max-w-4xl w-full max-h-[90vh] overflow-hidden">
                {/* Modal Header */}
                <div className="border-b px-6 py-4 flex justify-between items-center bg-gray-50">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {isEditing ? 'Edit Medicine Details' : 'Medicine Information'}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {isEditing ? 'Make changes to medicine information below' : 'View complete medicine details'}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {!isEditing ? (
                      <>
                        <button
                          onClick={() => setIsEditing(true)}
                          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                        >
                          <FiEdit2 className="w-4 h-4 mr-2" />
                          Edit
                        </button>
                        <button 
                          onClick={() => setShowDetailModal(false)}
                          className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                          <FiX className="w-4 h-4 mr-2" />
                          Close
                        </button>
                        </>
                    ) : (
                      <>
                        <button
                          onClick={handleSubmit}
                          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                        >
                          <FiUpload className="w-4 h-4 mr-2" />
                          Save Changes
                        </button>
                        <button 
                          onClick={() => {
                            setIsEditing(false);
                            // Reset form to original values
                            setDetailModalContent({ ...selectedMedicine });
                          }}
                          className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                          <FiX className="w-4 h-4 mr-2" />
                          Cancel
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Modal Content */}
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Image and Basic Info Section */}
                    <div className="flex gap-6">
                      {/* Left: Image Section */}
                      <div className="w-1/3">
                        <div className="aspect-square rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center bg-gray-50 relative overflow-hidden">
                          {detailModalContent.image ? (
                            <div className="relative w-full h-full group">
                              <img
                                src={detailModalContent.image}
                                alt={detailModalContent.name}
                                className="object-cover w-full h-full rounded-lg"
                              />
                              {isEditing && (
                                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                  <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="px-4 py-2 bg-white rounded-lg text-sm font-medium text-gray-700 flex items-center gap-2 hover:bg-gray-50"
                                  >
                                    <FiUpload className="w-4 h-4" />
                                    Change Image
                                  </button>
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="text-center p-4">
                              <FiCamera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                              <p className="text-sm text-gray-500">No image available</p>
                              {isEditing && (
                                <button
                                  type="button"
                                  onClick={() => fileInputRef.current?.click()}
                                  className="mt-2 text-sm text-blue-600 hover:text-blue-700"
                                >
                                  Upload Image
                                </button>
                              )}
                            </div>
                          )}
                          <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImageUpload}
                            accept="image/*"
                            className="hidden"
                          />
                        </div>
                      </div>

                      {/* Right: Basic Info */}
                      <div className="w-2/3 space-y-4">
                        {/* Medicine Name */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Medicine Name
                          </label>
                          <input
                            type="text"
                            value={detailModalContent.name}
                            onChange={(e) => setDetailModalContent(prev => ({
                              ...prev,
                              name: e.target.value
                            }))}
                            disabled={!isEditing}
                            className={`w-full rounded-lg border ${
                              isEditing 
                                ? 'border-gray-300 focus:ring-2 focus:ring-blue-500' 
                                : 'border-transparent bg-gray-50'
                            } px-4 py-2.5`}
                          />
                        </div>

                        {/* Category and Status */}
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Category
                            </label>
                            <select
                              value={detailModalContent.category}
                              onChange={(e) => setDetailModalContent(prev => ({
                                ...prev,
                                category: e.target.value
                              }))}
                              disabled={!isEditing}
                              className={`w-full rounded-lg border ${
                                isEditing 
                                  ? 'border-gray-300 focus:ring-2 focus:ring-blue-500' 
                                  : 'border-transparent bg-gray-50'
                              } px-4 py-2.5`}
                            >
                              <option value="Medical Supplies">Medical Supplies</option>
                              <option value="Antibiotics">Antibiotics</option>
                              <option value="Painkillers">Painkillers</option>
                              <option value="Supplements">Supplements</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Status
                            </label>
                            <select
                              value={detailModalContent.status}
                              onChange={(e) => setDetailModalContent(prev => ({
                                ...prev,
                                status: e.target.value
                              }))}
                              disabled={!isEditing}
                              className={`w-full rounded-lg border ${
                                isEditing 
                                  ? 'border-gray-300 focus:ring-2 focus:ring-blue-500' 
                                  : 'border-transparent bg-gray-50'
                              } px-4 py-2.5`}
                            >
                              {statusOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Price, Stock, and Last Updated */}
                    <div className="grid grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          <div className="flex items-center gap-2">
                            <FiDollarSign className="w-4 h-4" />
                            Price
                          </div>
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₱</span>
                          <input
                            type="number"
                            value={detailModalContent.price}
                            onChange={(e) => setDetailModalContent(prev => ({
                              ...prev,
                              price: parseFloat(e.target.value)
                            }))}
                            disabled={!isEditing}
                            className={`w-full pl-8 pr-4 py-2.5 rounded-lg border ${
                              isEditing 
                                ? 'border-gray-300 focus:ring-2 focus:ring-blue-500' 
                                : 'border-transparent bg-gray-50'
                            }`}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          <div className="flex items-center gap-2">
                            <FiBox className="w-4 h-4" />
                            Stock
                          </div>
                        </label>
                        <input
                          type="number"
                          value={detailModalContent.stock}
                          onChange={(e) => setDetailModalContent(prev => ({
                            ...prev,
                            stock: parseInt(e.target.value)
                          }))}
                          disabled={!isEditing}
                          className={`w-full px-4 py-2.5 rounded-lg border ${
                            isEditing 
                              ? 'border-gray-300 focus:ring-2 focus:ring-blue-500' 
                              : 'border-transparent bg-gray-50'
                          }`}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          <div className="flex items-center gap-2">
                            <FiCalendar className="w-4 h-4" />
                            Last Updated
                          </div>
                        </label>
                        <div className="px-4 py-2.5 bg-gray-50 rounded-lg text-gray-700">
                          {new Date(detailModalContent.lastUpdated).toLocaleDateString()}
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        value={detailModalContent.description}
                        onChange={(e) => setDetailModalContent(prev => ({
                          ...prev,
                          description: e.target.value
                        }))}
                        disabled={!isEditing}
                        rows={4}
                        className={`w-full px-4 py-2.5 rounded-lg border ${
                          isEditing 
                            ? 'border-gray-300 focus:ring-2 focus:ring-blue-500' 
                            : 'border-transparent bg-gray-50'
                        }`}
                      />
                    </div>
                  </form>
                </div>

                {/* Modal Footer */}
                <div className="border-t px-6 py-4 bg-gray-50 flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    {isEditing ? 'All changes will be saved immediately' : 'View-only mode'}
                  </div>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setShowDetailModal(false);
                        setIsEditing(false);
                      }}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      {isEditing ? 'Cancel' : 'Close'}
                    </button>
                    {isEditing && (
                      <button
                        type="submit"
                        onClick={handleSubmit}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                      >
                        Save Changes
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicineList;
