import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const Inventory = () => {
  // Inventory data
  const data = [
    { id: 1, name: "Menswear", value: 500, color: "#1F2937" },
    { id: 2, name: "Shoes", value: 50, color: "#B91C1C" },
    { id: 3, name: "Kidswear", value: 20, color: "#" },
    { id: 4, name: "Womenswear", value: 30, color: "#FBBF24" },
  ];

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mx-40">

      {/* Product Inventory Section 
      <div className="mr-0 md:mr-4 border rounded p-6 bg-white w-full md:w-1/2 shadow-lg">
        <h1 className="text-xl font-bold text-gray-800 mb-4">Product Inventory</h1>
        <div className="mb-4 flex justify-between items-center font-semibold">
          <span className="text-gray-600">This Month</span>
          <span className="text-teal-500 hover:underline cursor-pointer">View Detail &gt;</span>
        </div>

        <div className="border rounded bg-white shadow-lg mb-6">
          {data.map((item) => (
            <div
              key={item.id}
              className="p-6 border font-medium flex justify-between"
            >
              <div className="flex flex-col">
                <span>{item.name} Inventory</span>
                <span className="text-gray-400">{item.value} Products</span>
              </div>
              <div
                className={`border rounded-3xl p-3 w-44 text-center ${
                  item.value > 100
                    ? "border-blue-500 text-blue-500"
                    : "border-green-500 text-green-500"
                }`}
              >
                {item.value > 100 ? "Todo" : "Completed"}
              </div>
            </div>
          ))}
        </div>
      </div>*/}

      {/* Inventory Detail Section */}
        <h1 className="text-xl font-bold text-gray-700 mb-4">Inventory Detail</h1>
        <div>
          <BarChart
            width={750}
            height={300}
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 0,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>

          {/* Display additional details below the chart */}
          <div className="mt-4">
            {data.map((item) => (
              <div className="flex items-center mt-1" key={item.id}>
                <span
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: item.color }}
                ></span>
                <span>{item.name}</span>
                <span className="ml-auto">{item.value} Items</span>
              </div>
            ))}
          </div>
        </div>

    </div>
  );
};

export default Inventory;
