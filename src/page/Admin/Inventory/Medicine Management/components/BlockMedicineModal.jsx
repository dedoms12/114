import { FiX, FiCheck } from 'react-icons/fi';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

const BlockMedicineModal = ({
  isOpen,
  onClose,
  onConfirm,
  blockDetails,
  setBlockDetails,
  onViewBlocklist
}) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleBlock = async () => {
    if (!blockDetails.reason) {
      toast.error('Please select a reason for blocking');
      return;
    }
    if (blockDetails.reason === 'other' && !blockDetails.customReason) {
      toast.error('Please provide a custom reason');
      return;
    }
    if (blockDetails.blockType === 'temporary' && !blockDetails.reviewDate) {
      toast.error('Please select a review date');
      return;
    }

    const success = await onConfirm();
    if (success) {
      setShowConfirmation(true);
    }
  };

  const handleClose = () => {
    setShowConfirmation(false);
    setBlockDetails({
      reason: '',
      blockType: 'temporary',
      reviewDate: ''
    });
    onClose();
  };

  const blockReasons = [
    { value: 'quality', label: 'Failed Quality Check (Condition, Wear, Stains)' },
    { value: 'compliance', label: 'Non-compliance with Thrift Store Standards' },
    { value: 'safety', label: 'Safety Concerns (Allergens, Hazardous Materials, Improper Labeling)' },
    { value: 'documentation', label: 'Missing or Incomplete Product Documentation (Care Labels, Size Information)' },
    { value: 'recall', label: 'Product Recall (Banned or Unsafe Items)' },
    { value: 'other', label: 'Other (Specify Reason)' }
  ];

  if (!isOpen) return null;

  if (showConfirmation) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full">
          <div className="text-center">
            <FiCheck className="mx-auto h-12 w-12 text-green-500 mb-4" />
            <h3 className="text-lg font-medium mb-2">Blocked Successfully</h3>
            <p className="text-gray-600 mb-6">It has been added to the blocklist.</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Stay Here
              </button>
              <button
                onClick={onViewBlocklist}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                View Blocklist
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Block</h3>
          <button onClick={onClose}>
            <FiX className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Block Type</label>
            <select
              value={blockDetails.blockType}
              onChange={(e) => setBlockDetails(prev => ({ ...prev, blockType: e.target.value }))}
              className="w-full p-2 border rounded-md"
            >
              <option value="temporary">Temporary Block</option>
              <option value="permanent">Permanent Block</option>
            </select>
          </div>

          {blockDetails.blockType === 'temporary' && (
            <div>
              <label className="block text-sm font-medium mb-2">Review Date</label>
              <input
                type="date"
                value={blockDetails.reviewDate}
                onChange={(e) => setBlockDetails(prev => ({ ...prev, reviewDate: e.target.value }))}
                className="w-full p-2 border rounded-md"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2">Reason for Blocking</label>
            <select
              value={blockDetails.reason}
              onChange={(e) => setBlockDetails(prev => ({ ...prev, reason: e.target.value }))}
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

          {blockDetails.reason === 'other' && (
            <div>
              <label className="block text-sm font-medium mb-2">Specify Reason</label>
              <textarea
                value={blockDetails.customReason}
                onChange={(e) => setBlockDetails(prev => ({ ...prev, customReason: e.target.value }))}
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
            onClick={handleBlock}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Block
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlockMedicineModal; 