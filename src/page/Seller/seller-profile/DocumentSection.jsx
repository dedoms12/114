import { useState } from 'react';
import { FiUpload, FiX, FiFile, FiEye } from 'react-icons/fi';

const DocumentSection = ({ 
  title, 
  description, 
  validUntil, 
  status, 
  documents, 
  isLast 
}) => {
  const [uploadedDocs, setUploadedDocs] = useState(documents || []);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    setIsUploading(true);

    try {
      // Simulate file upload delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newDocs = files.map(file => ({
        id: Date.now(),
        name: file.name,
        size: file.size,
        type: file.type,
        uploadDate: new Date().toISOString(),
        url: URL.createObjectURL(file)
      }));

      setUploadedDocs(prev => [...prev, ...newDocs]);
    } catch (error) {
      console.error('Error uploading files:', error);
      alert('Failed to upload files');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = (docId) => {
    setUploadedDocs(prev => prev.filter(doc => doc.id !== docId));
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

  return (
    <div className={`pb-8 ${!isLast && 'border-b border-gray-200 mb-8'}`}>
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
        <button 
          className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors
            ${isUploading 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
            }`}
          disabled={isUploading}
        >
          <FiUpload className="mr-2" />
          {isUploading ? 'Uploading...' : 'Upload Document'}
        </button>
        <input
          type="file"
          multiple
          onChange={handleFileUpload}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          disabled={isUploading}
        />
      </div>
    </div>
  );
};

export default DocumentSection; 