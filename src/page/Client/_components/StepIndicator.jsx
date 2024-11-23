import React from 'react';

const StepIndicator = ({ currentStep }) => {
  const steps = [
    { number: 1, label: 'Cart' },
    { number: 2, label: 'Checkout' },
    { number: 3, label: 'Order Details' },
    { number: 4, label: 'Track Order' },
    { number: 5, label: 'Confirm Receipt' }
  ];

  return (
    <div className="mb-8 px-4">
      <div className="flex items-center justify-center">
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step.number <= currentStep 
                  ? 'bg-[#4C9BF5] text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {step.number}
              </div>
              <span className="text-sm mt-2 text-center w-24">{step.label}</span>
            </div>
            {index < steps.length - 1 && (
              <div className={`w-16 h-1 mx-2 ${
                step.number < currentStep ? 'bg-[#4C9BF5]' : 'bg-gray-200'
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default StepIndicator; 