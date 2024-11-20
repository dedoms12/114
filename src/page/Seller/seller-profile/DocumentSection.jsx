import { useState, useEffect } from 'react';
import { FiUpload, FiX, FiFile, FiEye, FiEdit2, FiTrash2, FiCalendar } from 'react-icons/fi';

const DocumentSection = ({ 
  id,
  title, 
  description, 
  validUntil, 
  status, 
  documents, 
  isLast,
  onUpdate,
  onDelete,
  isEditable = false
}) => {
  const [uploadedDocs, setUploadedDocs] = useState(documents || []);
  const [isUploading, setIsUploading] = useState(false);
  const [isEditing, setIsEditing] = useState(!title); // Start in edit mode if no title
  const [formData, setFormData] = useState({
    title: title || '',
    description: description || '',
    status: status || 'Pending',
    validUntil: validUntil || ''
  });

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    setIsUploading(true);

    try {
      // Process each file
      const newDocs = await Promise.all(files.map(async (file) => {
        // Create a preview URL
        const url = URL.createObjectURL(file);
        
        return {
          id: Date.now() + Math.random(), // Ensure unique ID
          name: file.name,
          size: file.size,
          type: file.type,
          uploadDate: new Date().toISOString(),
          url: url,
          status: 'Pending' // Add initial status
        };
      }));

      setUploadedDocs(prev => [...prev, ...newDocs]);
    } catch (error) {
      console.error('Error uploading files:', error);
      alert('Failed to upload files');
    } finally {
      setIsUploading(false);
      // Reset file input
      e.target.value = '';
    }
  };

  const handleDelete = async (docId) => {
    try {
      // Remove the document from state
      setUploadedDocs(prev => {
        const doc = prev.find(d => d.id === docId);
        if (doc?.url) {
          URL.revokeObjectURL(doc.url); // Clean up URL object
        }
        return prev.filter(d => d.id !== docId);
      });
    } catch (error) {
      console.error('Error deleting document:', error);
      alert('Failed to delete document');
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'verified':
        return 'text-green-600 bg-green-50';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50';
      case 'expired':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  // Add cleanup on unmount
  useEffect(() => {
    return () => {
      // Clean up any object URLs when component unmounts
      uploadedDocs.forEach(doc => {
        if (doc.url) {
          URL.revokeObjectURL(doc.url);
        }
      });
    };
  }, [uploadedDocs]);

  const handleSave = () => {
    onUpdate(formData);
    setIsEditing(false);
  };

  const statusOptions = ['Pending', 'Verified', 'Expired'];

  return (
    <div className={`pb-8 ${!isLast && 'border-b border-gray-200 mb-8'}`}>
      {isEditing ? (
        <div className="space-y-4 bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Edit Document Section</h3>
            <button
              onClick={() => title ? setIsEditing(false) : onDelete(id)}
              className="text-gray-400 hover:text-gray-500"
            >
              <FiX size={20} />
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Document Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full p-2.5 border border-gray-300 rounded-lg"
                placeholder="Enter document title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full p-2.5 border border-gray-300 rounded-lg"
                rows={2}
                placeholder="Enter document description"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                  className="w-full p-2.5 border border-gray-300 rounded-lg"
                >
                  {statusOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Valid Until
                </label>
                <input
                  type="date"
                  value={formData.validUntil}
                  onChange={(e) => setFormData(prev => ({ ...prev, validUntil: e.target.value }))}
                  className="w-full p-2.5 border border-gray-300 rounded-lg"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                onClick={() => title ? setIsEditing(false) : onDelete(id)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-start mb-6">
            <div>
              <h4 className="text-lg font-medium text-gray-900">{title}</h4>
              <p className="text-sm text-gray-500 mt-1">{description}</p>
            </div>
            <div className="flex items-center space-x-3">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(status)}`}>
                {status}
              </span>
              {validUntil && (
                <span className="text-sm text-gray-500">
                  Valid until: {new Date(validUntil).toLocaleDateString()}
                </span>
              )}
              {isEditable && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    <FiEdit2 size={18} />
                  </button>
                  <button
                    onClick={() => onDelete(id)}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Document List */}
          <div className="space-y-4 mb-6">
            {uploadedDocs.map(doc => (
              <div 
                key={doc.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <FiFile className="text-blue-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                    <p className="text-xs text-gray-500">
                      Uploaded on {new Date(doc.uploadDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => window.open(doc.url, '_blank')}
                    className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                    title="View"
                  >
                    <FiEye size={18} />
                  </button>
                  <button 
                    onClick={() => handleDelete(doc.id)}
                    className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                    title="Delete"
                  >
                    <FiX size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Upload Button */}
          <div className="relative">
            <input
              type="file"
              multiple
              onChange={handleFileUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              disabled={isUploading}
            />
            <button 
              className={`flex items-center px-4 py-2 rounded-md text-sm font-medium w-full justify-center
                ${isUploading 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                }`}
              disabled={isUploading}
            >
              <FiUpload className="mr-2" />
              {isUploading ? 'Uploading...' : 'Upload Document'}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default DocumentSection; 