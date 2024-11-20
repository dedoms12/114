import { FiX, FiClock } from 'react-icons/fi';

const UserHistoryModal = ({ userId, onClose, users }) => {
  const user = users.find(u => u.id === userId);
  
  if (!user) return null;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-900">User Activity History</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <FiX className="w-6 h-6" />
          </button>
        </div>
        
        <div className="mb-6">
          <h4 className="font-medium text-gray-700 mb-2">User Details</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="font-medium">{user.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{user.email}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium text-gray-700">Activity Timeline</h4>
          {user.activityHistory.map((activity, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="p-2 bg-blue-100 rounded-full">
                <FiClock className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">{activity.action.replace(/_/g, ' ').toUpperCase()}</p>
                <p className="text-sm text-gray-500">{formatDate(activity.date)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserHistoryModal; 