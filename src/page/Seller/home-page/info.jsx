const Info = () => {

  return (
    <div className="border rounded grid grid-cols-2 bg-white shadow-lg my-5">
      {/* Inventory Summary */}
      <div className="m-6">
        <h1 className="text-xl font-bold text-gray-800 m-3">Inventory Summary</h1>
        <div className="grid grid-cols-2 py-6">
          <div className="bg-red-50 rounded-lg shadow-md p-5 flex flex-col justify-between h-full m-3">
            <div>
              <h1 className="font-semibold text-gray-800 mb-2">Total Items</h1>
              <span className="text-orange-500 font-semibold text-2xl">1,345</span>
            </div>
            <div className="mt-auto flex justify-end">
              <span className="text-teal-500 font-semibold hover:underline cursor-pointer">View Detail &gt;</span>
            </div>
          </div>
          <div className="bg-blue-50 rounded-lg shadow-md p-5 flex flex-col justify-between h-full m-3">
            <div>
              <h1 className="font-semibold text-gray-800 mb-2">Low-Stock Alerts</h1>
              <span className="text-orange-500 font-semibold text-2xl">12</span>
            </div>
            <div className="mt-auto flex justify-end">
              <span className="text-teal-500 font-semibold hover:underline cursor-pointer">View Detail &gt;</span>
            </div>
          </div>
        </div>
      </div>
      {/* Sales Activities */}
      <div className="m-6">
        <h1 className="text-xl font-bold text-gray-700 m-3">Sales Activities</h1>
        <div className="grid grid-cols-2 py-6">
          <div className="bg-blue-50 rounded-lg shadow-md p-5 flex flex-col justify-between h-full m-3">
            <div>
              <h1 className="font-semibold text-gray-800 mb-2">To Be Delivered</h1>
              <span className="text-orange-500 font-semibold text-2xl">200</span>
            </div>
            <div className="mt-auto flex justify-end">
              <span className="text-teal-500 font-semibold hover:underline cursor-pointer">View Detail &gt;</span>
            </div>
          </div>
          <div className="bg-blue-50 rounded-lg shadow-md p-5 flex flex-col justify-between h-full m-3">
            <div>
              <h1 className="font-semibold text-gray-800 mb-2">To Be Ordered</h1>
              <span className="text-orange-500 font-semibold text-2xl">120</span>
            </div>
            <div className="mt-auto flex justify-end">
              <span className="text-teal-500 font-semibold hover:underline cursor-pointer">View Detail &gt;</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;