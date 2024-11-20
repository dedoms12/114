import { useState } from 'react';
import { FiX, FiCheckCircle, FiXCircle, FiMessageCircle, FiAlertCircle } from 'react-icons/fi';

const DocumentReviewModal = ({ store, onClose, onUpdateStatus }) => {
  const [selectedDoc, setSelectedDoc] = useState(store.documents[0]);
  const [comment, setComment] = useState('');
  const [showFeedbackAlert, setShowFeedbackAlert] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackType, setFeedbackType] = useState('');

  // Calculate document verification progress
  const totalDocs = store.documents.length;
  const verifiedDocs = store.documents.filter(doc => doc.status === 'verified').length;
  const progress = Math.round((verifiedDocs / totalDocs) * 100);

  const handleStatusUpdate = (status) => {
    if (!comment.trim()) {
      setFeedbackType('error');
      setFeedbackMessage('Please add a comment before updating the status');
      setShowFeedbackAlert(true);
      return;
    }

    onUpdateStatus(store.id, selectedDoc.id, status, comment);
    setFeedbackType('success');
    setFeedbackMessage(`Document ${status === 'verified' ? 'verified' : 'rejected'} successfully`);
    setShowFeedbackAlert(true);
    setComment('');
    
    setTimeout(() => {
      setShowFeedbackAlert(false);
    }, 3000);
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
      <div className="bg-white rounded-xl p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900">
              Document Review - {store.name}
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

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-1 space-y-4">
            {store.documents.map((doc) => (
              <div
                key={doc.id}
                onClick={() => setSelectedDoc(doc)}
                className={`p-4 rounded-lg cursor-pointer ${
                  selectedDoc.id === doc.id ? 'bg-blue-50 border-blue-500' : 'bg-gray-50'
                }`}
              >
                <div className="font-medium text-gray-900">{doc.name}</div>
                <div className="text-sm text-gray-500">
                  Status: {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                </div>
              </div>
            ))}
          </div>

          <div className="col-span-2">
            <div className="mb-6">
              <h4 className="font-medium text-gray-900 mb-2">Document Preview</h4>
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                {/* Document preview implementation */}
                <span className="text-gray-500">Document Preview</span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Review Comment <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg ${
                    !comment.trim() && showFeedbackAlert ? 'border-red-500' : ''
                  }`}
                  rows="3"
                  placeholder="Add a comment about this document (required)..."
                />
                {!comment.trim() && showFeedbackAlert && (
                  <p className="text-sm text-red-500 mt-1">Comment is required</p>
                )}
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => handleStatusUpdate('verified')}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  <FiCheckCircle />
                  Verify
                </button>
                <button
                  onClick={() => handleStatusUpdate('rejected')}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  <FiXCircle />
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentReviewModal; 