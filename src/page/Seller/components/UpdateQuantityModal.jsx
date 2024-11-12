import { useState } from 'react';
import { FiX } from 'react-icons/fi';

const UpdateQuantityModal = ({ isOpen, onClose, product }) => {
  const [quantity, setQuantity] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle quantity update logic here
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[400px] p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Update Quantity</h2>
          <button onClick={onClose}>
            <FiX size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm text-gray-600 mb-2">
              New Quantity
            </label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full p-2 border rounded-md"
              min="0"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateQuantityModal; 