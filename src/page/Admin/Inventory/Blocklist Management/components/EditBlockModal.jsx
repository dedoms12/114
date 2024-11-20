import { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';

const EditBlockModal = ({ isOpen, onClose, onSave, item }) => {
  const [editedItem, setEditedItem] = useState(item);
  
  const blockReasons = [
    { value: 'quality', label: 'Failed Quality Check' },
    { value: 'compliance', label: 'Non-compliance with Regulations' },
    { value: 'safety', label: 'Safety Concerns' },
    { value: 'documentation', label: 'Incomplete Documentation' },
    { value: 'expiry', label: 'Expiration Date Issues' },
    { value: 'recall', label: 'Product Recall' },
    { value: 'other', label: 'Other' }
  ];

  useEffect(() => {
    setEditedItem(item);
  }, [item]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Edit Block Details</h3>
          <button onClick={onClose}>
            <FiX className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Block Type</label>
            <select
              value={editedItem?.blockType || 'temporary'}
              onChange={(e) => setEditedItem(prev => ({...prev, blockType: e.target.value}))}
              className="w-full p-2 border rounded-md"
            >
              <option value="temporary">Temporary Block</option>
              <option value="permanent">Permanent Block</option>
            </select>
          </div>

          {editedItem?.blockType === 'temporary' && (
            <div>
              <label className="block text-sm font-medium mb-2">Review Date</label>
              <input
                type="date"
                value={editedItem?.reviewDate || ''}
                onChange={(e) => setEditedItem(prev => ({...prev, reviewDate: e.target.value}))}
                className="w-full p-2 border rounded-md"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2">Reason for Blocking</label>
            <select
              value={editedItem?.reason || ''}
              onChange={(e) => setEditedItem(prev => ({...prev, reason: e.target.value}))}
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select a reason...</option>
              {blockReasons.map(reason => (
                <option key={reason.value} value={reason.value}>
                  {reason.label}
                </option>
              ))}
            </select>
          </div>

          {editedItem?.reason === 'other' && (
            <div>
              <label className="block text-sm font-medium mb-2">Specify Reason</label>
              <textarea
                value={editedItem?.customReason || ''}
                onChange={(e) => setEditedItem(prev => ({...prev, customReason: e.target.value}))}
                className="w-full p-2 border rounded-md"
                rows="3"
                placeholder="Please specify the reason for blocking..."
              />
            </div>
          )}
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(editedItem)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBlockModal; 