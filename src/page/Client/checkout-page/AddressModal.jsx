import React, { useState } from 'react';
import ModalWrapper from '../_components/ModalWrapper';

const AddressModal = ({ isOpen, onClose, onSave, currentAddress }) => {
  const [address, setAddress] = useState(currentAddress);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(address);
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-semibold mb-4">Change Delivery Address</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Recipient Name</label>
          <input
            type="text"
            value={address.name}
            onChange={(e) => setAddress({...address, name: e.target.value})}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="text"
            value={address.phone}
            onChange={(e) => setAddress({...address, phone: e.target.value})}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <textarea
            value={address.address}
            onChange={(e) => setAddress({...address, address: e.target.value})}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            rows="3"
          />
        </div>
        <div className="flex justify-end space-x-4 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-[#4C9BF5] text-white rounded-md hover:bg-blue-600"
          >
            Save Changes
          </button>
        </div>
      </form>
    </ModalWrapper>
  );
};

export default AddressModal; 