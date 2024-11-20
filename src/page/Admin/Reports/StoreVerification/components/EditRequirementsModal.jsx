import { useState } from 'react';
import { FiX, FiPlus, FiTrash2 } from 'react-icons/fi';

const EditRequirementsModal = ({ store, onClose, onSave }) => {
  const [documents, setDocuments] = useState(store.documents);
  const [newDocument, setNewDocument] = useState({ name: '', status: 'pending' });

  const handleAddDocument = () => {
    if (!newDocument.name.trim()) return;
    
    setDocuments([
      ...documents,
      {
        id: Date.now(),
        name: newDocument.name,
        status: 'pending',
        url: '',
        dateSubmitted: new Date().toISOString(),
        comments: []
      }
    ]);
    setNewDocument({ name: '', status: 'pending' });
  };

  const handleRemoveDocument = (docId) => {
    setDocuments(documents.filter(doc => doc.id !== docId));
  };

  const handleSave = () => {
    onSave(documents);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-900">
            Edit Document Requirements - {store.name}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <FiX className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          {documents.map((doc) => (
            <div key={doc.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <div className="font-medium">{doc.name}</div>
                <div className="text-sm text-gray-500">Status: {doc.status}</div>
              </div>
              <button
                onClick={() => handleRemoveDocument(doc.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-full"
              >
                <FiTrash2 />
              </button>
            </div>
          ))}

          <div className="flex gap-2">
            <input
              type="text"
              value={newDocument.name}
              onChange={(e) => setNewDocument({ ...newDocument, name: e.target.value })}
              placeholder="New document name..."
              className="flex-1 px-4 py-2 border rounded-lg"
            />
            <button
              onClick={handleAddDocument}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <FiPlus className="w-5 h-5" />
            </button>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditRequirementsModal; 