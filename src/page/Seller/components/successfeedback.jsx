import { FiCheck, FiX } from 'react-icons/fi';

const SuccessFeedback = ({ isOpen, onClose, action, productDetails }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black opacity-30" />
      
      {/* Modal */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white w-full max-w-md p-6 rounded-lg shadow-xl">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
          >
            <FiX className="h-5 w-5" />
          </button>

          <div className="text-center">
            {/* Success Icon */}
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <FiCheck className="h-6 w-6 text-green-600" />
            </div>

            {/* Title */}
            <h3 className="text-lg font-medium text-gray-900 mt-4">
              Product Successfully {action}!
            </h3>

            {/* Product Summary */}
            <div className="mt-4 bg-gray-50 p-4 rounded-lg text-left">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Product Summary:</h4>
              <dl className="space-y-2 text-sm">
                <div>
                  <dt className="inline text-gray-500">Name: </dt>
                  <dd className="inline ml-1 text-gray-900">{productDetails.name}</dd>
                </div>
                <div>
                  <dt className="inline text-gray-500">Category: </dt>
                  <dd className="inline ml-1 text-gray-900">{productDetails.category}</dd>
                </div>
                <div>
                  <dt className="inline text-gray-500">Price: </dt>
                  <dd className="inline ml-1 text-gray-900">₱{productDetails.price}</dd>
                </div>
                <div>
                  <dt className="inline text-gray-500">Stock: </dt>
                  <dd className="inline ml-1 text-gray-900">
                    {productDetails.quantity} {productDetails.unit}
                  </dd>
                </div>
                <div>
                  <dt className="inline text-gray-500">Status: </dt>
                  <dd className="inline ml-1 text-gray-900 capitalize">
                    {productDetails.status || 'Active'}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Action Button */}
            <div className="mt-6">
              <button
                type="button"
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={onClose}
              >
                Got it, thanks!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessFeedback;
