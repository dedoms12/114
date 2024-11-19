import { useState } from 'react';
import { 
  FiX, FiCheckCircle, FiXCircle, FiPlus, 
  FiTrash2, FiAlertCircle, FiFile, FiEye 
} from 'react-icons/fi';

const DocumentManagementModal = ({ store, onClose, onUpdateStatus, onUpdateRequirements }) => {
  const [selectedDoc, setSelectedDoc] = useState(store.documents[0]);
  const [documents, setDocuments] = useState(store.documents);
  const [comment, setComment] = useState('');
  const [showFeedbackAlert, setShowFeedbackAlert] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [newDocument, setNewDocument] = useState({ name: '', status: 'pending' });

  const totalDocs = documents.length;
  const verifiedDocs = documents.filter(doc => doc.status === 'verified').length;
  const progress = Math.round((verifiedDocs / totalDocs) * 100);

  const showFeedback = (type, message) => {
    setFeedbackType(type);
    setFeedbackMessage(message);
    setShowFeedbackAlert(true);
    setTimeout(() => setShowFeedbackAlert(false), 3000);
  };

  const handleStatusUpdate = (status) => {
    if (!comment.trim()) {
      showFeedback('error', 'Please add a comment before updating the status');
      return;
    }

    const updatedDocs = documents.map(doc => 
      doc.id === selectedDoc.id 
        ? {
            ...doc,
            status,
            comments: [...(doc.comments || []), { text: comment, date: new Date().toISOString() }]
          }
        : doc
    );

    setDocuments(updatedDocs);
    onUpdateStatus(store.id, selectedDoc.id, status, comment);
    setComment('');
    showFeedback('success', `Document ${status === 'verified' ? 'verified' : 'rejected'} successfully`);
  };

  const handleAddDocument = () => {
    if (!newDocument.name.trim()) {
      showFeedback('error', 'Please enter a document name');
      return;
    }
    
    const newDoc = {
      id: Date.now(),
      name: newDocument.name,
      status: 'pending',
      url: '',
      dateSubmitted: new Date().toISOString(),
      comments: []
    };

    setDocuments([...documents, newDoc]);
    setNewDocument({ name: '', status: 'pending' });
    showFeedback('success', 'New document requirement added');
  };

  const handleRemoveDocument = (docId) => {
    if (documents.length <= 1) {
      showFeedback('error', 'Cannot remove the last document requirement');
      return;
    }
    setDocuments(documents.filter(doc => doc.id !== docId));
    if (selectedDoc?.id === docId) {
      setSelectedDoc(documents.find(doc => doc.id !== docId));
    }
    showFeedback('success', 'Document requirement removed');
  };

  const handleSave = () => {
    onUpdateRequirements(documents);
    showFeedback('success', 'All changes saved successfully');
    setTimeout(onClose, 1000);
  };

  const FeedbackAlert = () => (
    <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg ${
      feedbackType === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
    }`}>
      <div className="flex items-center gap-2">
        {feedbackType === 'success' ? (
          <FiCheckCircle className="w-5 h-5" />
        ) : (
          <FiAlertCircle className="w-5 h-5" />
        )}
        <span>{feedbackMessage}</span>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {showFeedbackAlert && <FeedbackAlert />}
      <div className="bg-white rounded-xl p-6 max-w-6xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Modal header section */}
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900">
              Document Management - {store.name}
            </h3>
            <div className="mt-2 flex items-center gap-2">
              <div className="w-48 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-sm text-gray-600">{progress}% Complete</span>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <FiX className="w-6 h-6" />
          </button>
        </div>

        <div className="grid grid-cols-4 gap-6">
          {/* Document list section */}
          <div className="col-span-1 space-y-4 border-r pr-4">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-medium text-gray-900">Documents</h4>
              <span className="text-sm text-gray-500">{documents.length} total</span>
            </div>
            
            {documents.map((doc) => (
              <div
                key={doc.id}
                onClick={() => setSelectedDoc(doc)}
                className={`p-4 rounded-lg cursor-pointer transition-all ${
                  selectedDoc?.id === doc.id 
                    ? 'bg-blue-50 border border-blue-500 shadow-sm' 
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-3">
                    <FiFile className={`w-5 h-5 mt-1 ${
                      doc.status === 'verified' 
                        ? 'text-green-500' 
                        : doc.status === 'rejected' 
                          ? 'text-red-500' 
                          : 'text-gray-400'
                    }`} />
                    <div>
                      <div className="font-medium text-gray-900">{doc.name}</div>
                      <div className="text-sm text-gray-500">
                        Status: {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveDocument(doc.id);
                    }}
                    className="p-1 text-red-600 hover:bg-red-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            <div className="flex gap-2 mt-4">
              <input
                type="text"
                value={newDocument.name}
                onChange={(e) => setNewDocument({ ...newDocument, name: e.target.value })}
                placeholder="New document name..."
                className="flex-1 px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                onClick={handleAddDocument}
                className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                title="Add new document"
              >
                <FiPlus className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Document review section */}
          <div className="col-span-3 pl-4">
            {selectedDoc ? (
              <>
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-medium text-gray-900">Document Review</h4>
                    <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
                      <FiEye className="w-5 h-5" />
                      <span>Preview Document</span>
                    </button>
                  </div>
                  <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-gray-500">Document Preview</span>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Review Comment <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        !comment.trim() && showFeedbackAlert ? 'border-red-500 ring-red-500' : ''
                      }`}
                      rows="4"
                      placeholder="Add your review comments here..."
                    />
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t">
                    <div className="flex gap-4">
                      <button
                        onClick={() => handleStatusUpdate('verified')}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <FiCheckCircle />
                        Verify
                      </button>
                      <button
                        onClick={() => handleStatusUpdate('rejected')}
                        className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        <FiXCircle />
                        Reject
                      </button>
                    </div>
                    <button
                      onClick={handleSave}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Save All Changes
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">Select a document to review</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentManagementModal; 