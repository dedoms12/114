import { FiAlertTriangle, FiCalendar } from 'react-icons/fi';
import { toast } from 'react-hot-toast';

const BlockStoreModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  blockDetails, 
  setBlockDetails 
}) => {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
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
    onConfirm();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
            <FiAlertTriangle className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Block Store</h3>
            <p className="text-sm text-gray-500">This action will restrict the store's operations</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Reason for Blocking
            </label>
            <select
              value={blockDetails.reason}
              onChange={(e) => setBlockDetails(prev => ({ ...prev, reason: e.target.value }))}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
              required
            >
              <option value="">Select a reason</option>
              <option value="license">License Issues</option>
              <option value="compliance">Compliance Violations</option>
              <option value="safety">Safety Concerns</option>
              <option value="other">Other</option>
            </select>
          </div>

          {blockDetails.reason === 'other' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Custom Reason
              </label>
              <textarea
                value={blockDetails.customReason || ''}
                onChange={(e) => setBlockDetails(prev => ({ ...prev, customReason: e.target.value }))}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
                rows={3}
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Block Type
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="blockType"
                  value="temporary"
                  checked={blockDetails.blockType === 'temporary'}
                  onChange={(e) => setBlockDetails(prev => ({ ...prev, blockType: e.target.value }))}
                  className="mr-2"
                />
                Temporary
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="blockType"
                  value="permanent"
                  checked={blockDetails.blockType === 'permanent'}
                  onChange={(e) => setBlockDetails(prev => ({ ...prev, blockType: e.target.value }))}
                  className="mr-2"
                />
                Permanent
              </label>
            </div>
          </div>

          {blockDetails.blockType === 'temporary' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Review Date
              </label>
              <div className="relative">
                <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="date"
                  value={blockDetails.reviewDate}
                  onChange={(e) => setBlockDetails(prev => ({ ...prev, reviewDate: e.target.value }))}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
            >
              Confirm Block
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlockStoreModal; 