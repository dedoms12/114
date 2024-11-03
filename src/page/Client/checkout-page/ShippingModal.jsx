import React, { useState } from 'react';

const ShippingModal = ({ isOpen, onClose, onSave, currentShipping }) => {
  const [selected, setSelected] = useState(currentShipping.type);

  const shippingOptions = [
    {
      type: 'Standard Delivery',
      eta: '15-18 Mar',
      price: 100,
      description: 'Delivery within 3-5 business days'
    },
    {
      type: 'Express Delivery',
      eta: '13-14 Mar',
      price: 150,
      description: 'Delivery within 1-2 business days'
    }
  ];

  const handleSubmit = () => {
    const newShipping = shippingOptions.find(option => option.type === selected);
    onSave(newShipping);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Select Shipping Method</h2>
        <div className="space-y-4">
          {shippingOptions.map((option) => (
            <div
              key={option.type}
              onClick={() => setSelected(option.type)}
              className={`p-4 border rounded-lg cursor-pointer ${
                selected === option.type ? 'border-[#4C9BF5] bg-blue-50' : 'border-gray-200'
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">{option.type}</h3>
                  <p className="text-sm text-gray-500">{option.description}</p>
                  <p className="text-sm text-gray-500">Get By {option.eta}</p>
                </div>
                <span className="font-medium">₱{option.price}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-[#4C9BF5] text-white rounded-md hover:bg-blue-600"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShippingModal; 