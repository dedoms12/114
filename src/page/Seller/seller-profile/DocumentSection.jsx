import { useState, useEffect } from 'react';
import { FiUpload, FiX, FiFile, FiEye, FiEdit2, FiTrash2, FiCalendar, FiCheckCircle } from 'react-icons/fi';
import toast from 'react-hot-toast';

// Add status color helper function
const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case 'verified':
      return 'bg-green-100 text-green-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'rejected':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

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
  const [isEditing, setIsEditing] = useState(!title);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [formData, setFormData] = useState({
    title: title || '',
    description: description || '',
    status: 'Pending',
    validUntil: validUntil || ''
  });

  const handleDelete = (docId) => {
    setUploadedDocs(prev => prev.filter(doc => doc.id !== docId));
    toast.success('Document deleted successfully');
  };

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    setIsUploading(true);

    try {
      const newDocs = await Promise.all(files.map(async (file) => {
        const url = URL.createObjectURL(file);
        return {
          id: Date.now() + Math.random(),
          name: file.name,
          size: file.size,
          type: file.type,
          uploadDate: new Date().toISOString(),
          url: url,
          status: 'Pending'
        };
      }));

      setUploadedDocs(prev => [...prev, ...newDocs]);
      toast.success('Document uploaded successfully!');
    } catch (error) {
      console.error('Error uploading files:', error);
      toast.error('Failed to upload document');
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  const handlePreview = (url, type) => {
    setPreviewUrl(url);
  };

  const closePreview = () => {
    setPreviewUrl(null);
  };

  return (
    <div className={`pb-8 ${!isLast && 'border-b border-gray-200 mb-8'}`}>
      {isEditing ? (
        <div className="space-y-4 bg-white p-6 rounded-lg shadow-sm">
          {/* Edit Form - Remove status field since sellers can't modify it */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Edit Document Section</h3>
            <button onClick={() => title ? setIsEditing(false) : onDelete(id)}>
              <FiX size={20} className="text-gray-400 hover:text-gray-500" />
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

            <div className="flex justify-end space-x-3 pt-4">
              <button
                onClick={() => title ? setIsEditing(false) : onDelete(id)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onUpdate(formData);
                  setIsEditing(false);
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Document Preview Modal */}
          {previewUrl && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-4 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
                <div className="flex justify-between mb-4">
                  <h3 className="text-lg font-medium">Document Preview</h3>
                  <button onClick={closePreview}>
                    <FiX size={24} className="text-gray-500 hover:text-gray-700" />
                  </button>
                </div>
                <div className="aspect-video">
                  {previewUrl.endsWith('.pdf') ? (
                    <iframe src={previewUrl} className="w-full h-full" />
                  ) : (
                    <img src={previewUrl} alt="Preview" className="w-full h-full object-contain" />
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Rest of the component remains the same */}
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

          {/* Document List with improved feedback */}
          <div className="space-y-4 mb-6">
            {uploadedDocs.map(doc => (
              <div key={doc.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <FiFile className="text-blue-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <span>{new Date(doc.uploadDate).toLocaleDateString()}</span>
                      <span>•</span>
                      <span className="flex items-center">
                        <FiCheckCircle className="text-green-500 mr-1" />
                        Uploaded successfully
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => handlePreview(doc.url, doc.type)}
                    className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <FiEye size={18} />
                  </button>
                  <button 
                    onClick={() => handleDelete(doc.id)}
                    className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Upload Section with better visual feedback */}
          <div className="relative">
            <input
              type="file"
              multiple
              onChange={handleFileUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              disabled={isUploading}
            />
            <div className={`border-2 border-dashed rounded-lg p-6 text-center
              ${isUploading ? 'border-gray-300 bg-gray-50' : 'border-blue-300 hover:border-blue-400 bg-blue-50'}`}>
              <FiUpload className="mx-auto h-12 w-12 text-blue-500" />
              <p className="mt-2 text-sm text-gray-600">
                {isUploading ? 'Uploading...' : 'Drag and drop files here, or click to select files'}
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Supported formats: PDF, DOC, DOCX, JPG, PNG
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DocumentSection; 