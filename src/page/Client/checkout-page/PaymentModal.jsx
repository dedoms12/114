import React, { useState } from 'react';

const PaymentModal = ({ isOpen, onClose, onSave, currentPayment }) => {
  const [selected, setSelected] = useState(currentPayment);

  const paymentMethods = [
    {
      id: 'cod',
      name: 'Cash On Delivery',
      description: 'Pay when you receive your order',
      icon: '💵'
    },
    {
      id: 'gcash',
      name: 'GCash',
      description: 'Pay via GCash e-wallet',
      icon: '💳'
    }
  ];

  const handleSubmit = () => {
    onSave(selected);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Select Payment Method</h2>
        <div className="space-y-4">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              onClick={() => setSelected(method.name)}
              className={`p-4 border rounded-lg cursor-pointer ${
                selected === method.name ? 'border-[#4C9BF5] bg-blue-50' : 'border-gray-200'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{method.icon}</span>
                <div>
                  <h3 className="font-medium">{method.name}</h3>
                  <p className="text-sm text-gray-500">{method.description}</p>
                </div>
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

export default PaymentModal; 