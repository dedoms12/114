import { useState, useEffect } from 'react';
import { 
  FiSearch, FiFilter, FiCheckCircle, 
  FiXCircle, FiClock, FiEye, FiDownload,
  FiSlash, FiUnlock
} from 'react-icons/fi';
import AdminSidebar from '../../components/AdminSidebar';
import AdminNavbar from '../../components/AdminNavbar';
import { storeVerifications } from './data/storeVerificationData';
import DocumentManagementModal from './components/DocumentManagementModal';
import EditBlockModal from '../../Inventory/Blocklist Management/components/EditBlockModal';

const StoreVerificationList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [filteredStores, setFilteredStores] = useState(storeVerifications);
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [storeToBlock, setStoreToBlock] = useState(null);

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
    setStoreToBlock(store);
    setShowBlockModal(true);
  };

  const handleUnblock = (store) => {
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
  };

  const handleSaveBlock = (blockDetails) => {
    setFilteredStores(prevStores =>
      prevStores.map(store => {
        if (store.id === storeToBlock.id) {
          return {
            ...store,
            verificationStatus: 'blocked',
            blockDetails
          };
        }
        return store;
      })
    );
    setShowBlockModal(false);
    setStoreToBlock(null);
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
    <div className="flex items-center space-x-3">
      <button
        onClick={() => {
          setSelectedStore(store);
          setShowDocumentModal(true);
        }}
        className="p-1.5 hover:bg-gray-100 rounded-full"
        title="Manage Documents"
      >
        <FiEye className="w-5 h-5 text-gray-600" />
      </button>
      {store.verificationStatus === 'blocked' ? (
        <button
          onClick={() => handleUnblock(store)}
          className="p-1.5 hover:bg-green-100 rounded-full"
          title="Unblock Store"
        >
          <FiUnlock className="w-5 h-5 text-green-600" />
        </button>
      ) : (
        <button
          onClick={() => handleBlock(store)}
          className="p-1.5 hover:bg-red-100 rounded-full"
          title="Block Store"
        >
          <FiSlash className="w-5 h-5 text-red-600" />
        </button>
      )}
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
            <EditBlockModal
              onClose={() => setShowBlockModal(false)}
              onSave={handleSaveBlock}
              item={storeToBlock}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default StoreVerificationList; 