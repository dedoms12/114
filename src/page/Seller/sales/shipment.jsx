import { PieChart } from "@mui/x-charts";

const Shipment = () => {

  const data = [
    { id: 1, value: 500 },
    { id: 2, value: 300 },
    { id: 3, value: 200 },
  ];

  return (
    <div>
      <h2 className="font-bold">Shipment Overview</h2>
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
        margin={{ left: 30 }}
        height={300}
      />
      {/* Legend for the inventory items */}
      <div className="mt-4 flex justify-between">
        <div className="flex items-center">
          <span className="w-3 h-3 bg-teal-500 rounded-full mr-2"></span>
          <span>To be Delivered</span>
        </div>
        <div className="flex items-center mt-1">
          <span className="w-3 h-3 bg-blue-300 rounded-full mr-2"></span>
          <span>Completed</span>
        </div>
        <div className="flex items-center mt-1">
          <span className="w-3 h-3 bg-purple-500 rounded-full mr-2"></span>
          <span>Delayed</span>
        </div>
      </div>
      <div className="flex flex-col mt-10">
        <span className="font-semibold">Recent Shipments</span>
        <div className="border p-5 rounded bg-gray-50 flex flex-col my-2">
          <div className="flex justify-between">
            <span className="text-blue-500 font-medium py-2">Shipment #12345</span>
            <span className="rounded-full border-green-300 text-green-700 bg-green-200 font-medium text-xs px-2 py-3 w-24 text-center">Completed</span>
          </div>
          <span className="mt-2">-&gt; Delivered on 2023-08-15</span>
        </div>
        <div className="border p-5 rounded bg-gray-50 flex flex-col my-2">
          <div className="flex justify-between">
            <span className="text-blue-500 font-medium py-2">Shipment #12346</span>
            <span className="rounded-full border-blue-300 text-blue-700 bg-blue-200 font-medium text-xs px-2 py-3 w-24 text-center">Ongoing</span>
          </div>
          <span className="mt-2">-&gt; Estimated delivery on 2023-08-15</span>
        </div>
        <div className="border p-5 rounded bg-gray-50 flex flex-col my-2">
          <div className="flex justify-between">
            <span className="text-blue-500 font-medium py-2">Shipment #12347</span>
            <span className="rounded-full border-purple-300 text-purple-700 bg-purple-200 font-medium text-xs px-2 py-3 w-24 text-center">Delayed</span>
          </div>
          <span className="mt-2">-&gt; Expected delivery on 2023-08-22</span>
        </div>
      </div>
    </div>
  );
};

export default Shipment;