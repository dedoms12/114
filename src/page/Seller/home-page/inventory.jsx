import { PieChart } from "@mui/x-charts";

const Inventory = () => {

  const data = [
    { id: 1, value: 1000 },
    { id: 2, value: 345 },
  ];

  return (
    <div className="flex my-12">
      <div className="mr-4 border rounded p-6 bg-white w-2/3 shadow-lg">
        {/* Title of the Product Inventory section */}
        <h1 className="text-xl font-bold text-gray-800 mb-4">Product Inventory</h1>
        {/* Header for the current month's items and a link to view details */}
        <div className="mb-4 flex justify-between items-center font-semibold">
          <span className="text-gray-600">This Month (3)</span>
          <span className="text-teal-500 hover:underline cursor-pointer">View Detail &gt;</span>
        </div>

        {/* Container for the current month's inventory items */}
        <div className="border rounded bg-white shadow-lg mb-6">
          {/* List of inventory items */}
          <div className="p-6 border font-medium flex 
          justify-between">
            <div className="flex flex-col">
              <span>[Urgent] Medical Supplies Inventory</span>
              <span className="text-gray-400">10 Products</span>
            </div>
            <div className="border rounded-3xl p-3 w-44 
            text-center border-blue-500 text-blue-500">
              Todo
            </div>
          </div>
          <div className="p-6 border font-medium flex 
          justify-between">
            <div className="flex flex-col">
              <span>[Monthly] General Health Inventory</span>
              <span className="text-gray-400">50 Products</span>
            </div>
            <div className="border rounded-3xl p-3 w-44 
            text-center border-gray-800 text-gray-800">
              Processing
            </div>
          </div>
          <div className="p-6 border font-medium flex 
          justify-between">
            <div className="flex flex-col">
              <span>[Monthly] Supplements Inventory</span>
              <span className="text-gray-400">50 Products</span>
            </div>
            <div className="border rounded-3xl p-3 w-44 
            text-center border-green-500 text-green-500">
              Completed
            </div>
          </div>
        </div>
        <span className="text-gray-600">December (0)</span>
      </div>

      {/* Container for the inventory detail section */}
      <div className="ml-4 border rounded p-6 bg-white w-1/3 shadow-lg">
        {/* Title for the inventory detail section */}
        <h1 className="text-xl font-bold text-gray-700 mb-4">Inventory Detail</h1>

        {/* Centered layout for the total items display */}
        <div>
          <PieChart
            series={[
              {
                data,
                innerRadius: 70,
                outerRadius: 100,
                paddingAngle: 0,
                cornerRadius: 0,
                startAngle: 0,
                endAngle: 360,
                cx: 150,
                cy: 150,
              },
            ]}
            width={315}
            margin={{left: 25}}
            height={300}
          />
          
          {/* Legend for the inventory items */}
          <div className="mt-4">
            <div className="flex items-center">
              <span className="w-3 h-3 bg-teal-500 rounded-full mr-2"></span>
              <span>Supplements</span>
              <span className="ml-auto">1,000 Items</span>
            </div>
            <div className="flex items-center mt-1">
              <span className="w-3 h-3 bg-blue-300 rounded-full mr-2"></span>
              <span>General Health Inventory</span>
              <span className="ml-auto">345 Items</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;