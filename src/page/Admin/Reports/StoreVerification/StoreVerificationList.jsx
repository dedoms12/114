import { useState, useEffect } from 'react';
import { 
  FiSearch, FiFilter, FiCheckCircle, 
  FiXCircle, FiClock, FiEye, FiDownload,
  FiSlash, FiUnlock, FiUserCheck
} from 'react-icons/fi';
import AdminSidebar from '../../components/AdminSidebar';
import AdminNavbar from '../../components/AdminNavbar';
import { storeVerifications } from './data/storeVerificationData';
import DocumentManagementModal from './components/DocumentManagementModal';
import EditBlockModal from '../../Inventory/Blocklist Management/components/EditBlockModal';
import { toast } from 'react-hot-toast';
import BlockStoreModal from '../../Inventory/Medicine Stores/components/BlockStoreModal';
import { useBlocklist } from '../../Inventory/context/BlocklistContext';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

const StoreVerificationList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [filteredStores, setFilteredStores] = useState(storeVerifications);
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [storeToBlock, setStoreToBlock] = useState(null);
  const { addBlockedStore } = useBlocklist();
  const [blockDetails, setBlockDetails] = useState({
    reason: '',
    blockType: 'temporary',
    reviewDate: '',
    customReason: ''
  });

  const handleDocumentUpdate = (storeId, docId, status, comment) => {
    setFilteredStores(prevStores =>
      prevStores.map(store => {
        if (store.id === storeId) {
          const updatedDocs = store.documents.map(doc => {
            if (doc.id === docId) {
              return {
                ...doc,
                status,
                comments: [...doc.comments, { text: comment, date: new Date().toISOString() }]
              };
            }
            return doc;
          });
          
          const verifiedDocs = updatedDocs.filter(doc => doc.status === 'verified').length;
          const verificationProgress = Math.round((verifiedDocs / updatedDocs.length) * 100);
          
          return {
            ...store,
            documents: updatedDocs,
            verificationProgress,
            verificationStatus: verificationProgress === 100 ? 'verified' : 'pending'
          };
        }
        return store;
      })
    );
  };

  const handleUpdateRequirements = (documents) => {
    setFilteredStores(prevStores =>
      prevStores.map(store => {
        if (store.id === selectedStore.id) {
          const verifiedDocs = documents.filter(doc => doc.status === 'verified').length;
          const verificationProgress = Math.round((verifiedDocs / documents.length) * 100);
          
          return {
            ...store,
            documents,
            verificationProgress,
            verificationStatus: verificationProgress === 100 ? 'verified' : 'pending'
          };
        }
        return store;
      })
    );
  };

  const handleBlock = (store) => {
    setStoreToBlock({
      id: store.id,
      name: store.name,
      email: store.email,
      status: 'blocked'
    });
    setShowBlockModal(true);
  };

  const handleBlockStore = async () => {
    try {
      const blockedStore = {
        id: storeToBlock.id,
        name: storeToBlock.name,
        email: storeToBlock.email,
        blockType: blockDetails.blockType,
        reason: blockDetails.reason === 'other' ? blockDetails.customReason : blockDetails.reason,
        reviewDate: blockDetails.blockType === 'temporary' ? blockDetails.reviewDate : null,
        blacklistDate: new Date().toISOString(),
        status: 'blocked'
      };

      const success = await addBlockedStore(blockedStore);
      
      if (success) {
        setFilteredStores(prevStores =>
          prevStores.map(store =>
            store.id === storeToBlock.id
              ? { ...store, verificationStatus: 'blocked', blockDetails }
              : store
          )
        );
        setShowBlockModal(false);
        setStoreToBlock(null);
        setBlockDetails({
          reason: '',
          blockType: 'temporary',
          reviewDate: '',
          customReason: ''
        });
        toast.success(`${storeToBlock.name} has been blocked`);
      }
    } catch (error) {
      console.error('Error blocking store:', error);
      toast.error('Failed to block store');
    }
  };

  const handleUnblock = (store) => {
    if (window.confirm(`Are you sure you want to unblock ${store.name}?`)) {
      setFilteredStores(prevStores =>
        prevStores.map(s => {
          if (s.id === store.id) {
            return {
              ...s,
              verificationStatus: 'pending',
              blockDetails: null
            };
          }
          return s;
        })
      );
      toast.success(`${store.name} has been unblocked`);
    }
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      pending: 'bg-yellow-100 text-yellow-800',
      verified: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      blocked: 'bg-gray-100 text-gray-800'
    };

    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusStyles[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const renderActions = (store) => (
    <div className="flex items-center gap-2">
      <button
        data-tooltip-id={`docs-tooltip-${store.id}`}
        data-tooltip-content="View verification documents"
        onClick={() => handleViewDocuments(store)}
        className="text-blue-600 hover:text-blue-800"
      >
        <FiEye className="w-5 h-5" />
      </button>
      <button
        data-tooltip-id={`block-tooltip-${store.id}`}
        data-tooltip-content="Block store"
        onClick={() => handleBlock(store)}
        className="text-red-600 hover:text-red-800"
      >
        <FiSlash className="w-5 h-5" />
      </button>

      <Tooltip id={`docs-tooltip-${store.id}`} place="top" />
      <Tooltip id={`block-tooltip-${store.id}`} place="top" />
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 overflow-auto">
        <AdminNavbar />
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Store Verifications</h1>
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b flex justify-between items-center">
              <div className="flex gap-4 items-center">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search stores..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border rounded-lg w-64"
                  />
                  <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>

                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-4 py-2 border rounded-lg"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="verified">Verified</option>
                  <option value="rejected">Rejected</option>
                  <option value="blocked">Blocked</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Store</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Progress</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Documents</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredStores.map((store) => (
                    <tr key={store.id}>
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-medium text-gray-900">{store.name}</div>
                          <div className="text-sm text-gray-500">{store.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(store.verificationStatus)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${store.verificationProgress}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-600">
                            {store.verificationProgress}%
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600">
                          {store.documents.length} documents
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {renderActions(store)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {showDocumentModal && selectedStore && (
            <DocumentManagementModal
              store={selectedStore}
              onClose={() => setShowDocumentModal(false)}
              onUpdateStatus={handleDocumentUpdate}
              onUpdateRequirements={handleUpdateRequirements}
            />
          )}

          {showBlockModal && storeToBlock && (
            <BlockStoreModal
              isOpen={showBlockModal}
              onClose={() => {
                setShowBlockModal(false);
                setStoreToBlock(null);
                setBlockDetails({
                  reason: '',
                  blockType: 'temporary',
                  reviewDate: '',
                  customReason: ''
                });
              }}
              onConfirm={handleBlockStore}
              blockDetails={blockDetails}
              setBlockDetails={setBlockDetails}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default StoreVerificationList; 