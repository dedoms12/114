import { BarChart, Gauge, gaugeClasses, LineChart, PieChart } from "@mui/x-charts";
import NavbarSeller from "../components/navbarSeller";
import { Stack } from "@mui/material";

const Sales = () => {

  const dataShipment = [
    { id: 1, value: 500 },
    { id: 2, value: 300 },
    { id: 3, value: 200 },
  ];

  const chartDetail = [
    {
      name: 'Revenue',
      numeric: '₱152K',
      percent: 25,
      days: 'Total revenue compared to 7 days ago',
      xdata: [1, 2, 3, 4, 5, 6, 7],
      ydata: [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)],
    },
    {
      name: 'Cost',
      numeric: '₱82K',
      percent: 25,
      days: 'Total cost compared to 7 days ago',
      xdata: [1, 2, 3, 4, 5, 6, 7],
      ydata: [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)],
    },
    {
      name: 'Shipments',
      numeric: '₱2.140',
      percent: 25,
      days: 'Total shipments compared to 7 days ago',
      xdata: [1, 2, 3, 4, 5, 6, 7],
      ydata: [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)],
    },
    {
      name: 'Avg Delivery Time',
      numeric: '1.7 Hrs',
      percent: 25,
      days: 'Total delivery compared to 7 days ago',
      xdata: [1, 2, 3, 4, 5, 6, 7],
      ydata: [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)],
    },
  ]

  const uData =
    [
      190,
      210,
      300
    ];
  const xLabels =
    [
      'Pending',
      'To be delivered',
      'Completed'
    ];

  const chartProfit = [
    {
      xdata: [15, 16, 17, 18, 19, 20, 21],
      y1data: [Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100)],
      y2data: [Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100)],
      y3data: [Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100)],
    },
  ];

  const km = [600, 800, 1000, 900, 600, 850, 600];
  const hours = [2, 2.5, 1.5, 1, .5, 1, 2];
  const xLabelsDistance = [15, 16, 17, 18, 19, 20, 21];

  return (
    <div className="bg-gray-100">
      <NavbarSeller />
      <div className="p-6 max-w-7xl mx-auto sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold mx-6 mb-6">Sales Logistics</h1>

        {/* Sales Logistics Overview */}
        <div className="flex">

          {/* Left Side */}
          <div className="bg-white p-4 rounded shadow w-1/3 mr-5">
            {/* Shipment Overview */}
            <div>
              <h2 className="font-bold text-xl">Shipment Overview</h2>
              <PieChart
                series={[
                  {
                    data: dataShipment.map(item => ({
                      value: item.value,
                      name: `Shipment ${item.id}`
                    })),
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
                    <span className="text-blue-500 font-medium py-2">Shipment #12344</span>
                    <span className="rounded-full border-green-300 text-green-700 bg-green-200 font-medium text-xs px-2 py-3 w-24 text-center">Completed</span>
                  </div>
                  <span className="mt-2">-&gt; Delivered on 2023-08-15</span>
                </div>
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
          </div>

          {/* Right Side */}
          <div className="w-2/3">
            {/* Revenue - Cost - Shipments - Avg Delivery Time */}
            <div className="bg-white border rounded shadow py-4 pl-3 pr-6 mb-5">
              <div className="grid grid-cols-2 gap-4">
                {chartDetail.map((item) => (
                  <div key={item.name} className="border m-2 flex flex-col p-5 w-full">
                    <div className="flex items-center">
                      <div className="flex flex-col">
                        <h1 className="text-lg font-medium">{item.name}</h1>
                        <h1 className="text-3xl font-bold">{item.numeric}</h1>
                      </div>
                      <LineChart
                        xAxis={[{ data: item.xdata }]}
                        series={[{ data: item.ydata }]}
                        width={300}
                        height={150}
                        margin={{ top: 20, bottom: 20 }}
                      />
                    </div>
                    <div className="flex justify-between text-center items-center">
                      <span className="px-3 py-1 rounded-3xl bg-green-50 text-green-700">{item.percent}%</span>
                      <span className="text-xs">{item.days}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-5 flex">
              {/* Orders */}
              <div className="bg-white p-4 rounded shadow w-1/2 mr-5">
                <div>
                  <h2 className="font-bold text-xl">Orders</h2>
                  <BarChart
                    xAxis={[{ scaleType: 'band', data: xLabels }]}
                    series={[{ data: uData, type: 'bar' }]}
                    width={350}
                    height={250}
                    margin={{ right: 10 }}
                  />
                  <span className="font-medium">Upcoming task</span>
                  <div className="border p-5 rounded bg-gray-50 flex flex-col my-2">
                    <div className="flex justify-between">
                      <span className="text-blue-500 font-medium py-2">Order #12348</span>
                    </div>
                    <span className="mt-2">-&gt; Delivery due on 2023-08-20</span>
                  </div>
                </div>
              </div>
              {/* Warehouse Activities */}
              <div className="bg-white p-4 rounded shadow w-1/2">
                <h2 className="font-bold text-xl">Warehouse Activities</h2>
                <div className="flex flex-col">
                  <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 1, md: 3 }}>
                    <Gauge
                      width={300}
                      height={185}
                      value={75}
                      startAngle={-90}
                      endAngle={90}
                      sx={{
                        [`& .${gaugeClasses.valueText}`]: {
                          fontSize: 45,
                          transform: 'translate(0px, 0px)',
                        },
                      }}
                    />
                  </Stack>
                  <span className="font-medium flex justify-center m-1">Space used</span>
                  <div className="flex justify-between m-1">
                    <span>Incoming: 15</span>
                    <span>Outgoing: 28</span>
                  </div>
                </div>
                <span className="font-medium">Inventory Snapshot</span>
                <div className="border p-5 rounded bg-gray-50 flex flex-col my-2">
                  <div className="flex justify-between">
                    <span className="font-medium py-2">Inventory</span>
                    <span>1,200 Items</span>
                  </div>
                  <div className="flex justify-between text-red-500 font-medium py-2 text-sm">
                    <span>Low stock alert</span>
                    <span>items ABC + 20 units</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex my-5">
          {/* Profit by Branch */}
          <div className="border bg-white rounded shadow p-5 w-1/2 mr-2.5">
            <h1 className="font-bold text-base">Profit by Branch</h1>
            <div className="mt-4 flex justify-between px-20">
              <div className="flex items-center">
                <span className="w-3 h-3 bg-teal-500 rounded-full mr-2"></span>
                <span>Branch 1</span>
              </div>
              <div className="flex items-center mt-1">
                <span className="w-3 h-3 bg-blue-300 rounded-full mr-2"></span>
                <span>Branch 2</span>
              </div>
              <div className="flex items-center mt-1">
                <span className="w-3 h-3 bg-purple-500 rounded-full mr-2"></span>
                <span>Branch 3</span>
              </div>
            </div>
            <LineChart
              xAxis={[{ data: chartProfit[0].xdata }]}
              series={[
                { curve: "natural", data: chartProfit[0].y1data },
                { curve: "natural", data: chartProfit[0].y2data },
                { curve: "natural", data: chartProfit[0].y3data },
              ]}
              width={500}
              height={300}
              margin={{ right: 10, bottom: 40 }}
            />
          </div>

          {/* Route (km) & Avg Delivery Time (Hours) */}
          <div className="border bg-white rounded shadow p-5 w-1/2 ml-2.5">
            <h1 className="font-bold text-base">Route (km) & Avg Delivery Time (Hours)</h1>
            <div className="mt-4 flex justify-between px-20">
              <div className="flex items-center">
                <span className="w-3 h-3 bg-teal-500 rounded-full mr-2"></span>
                <span>Route</span>
              </div>
              <div className="flex items-center mt-1">
                <span className="w-3 h-3 bg-blue-300 rounded-full mr-2"></span>
                <span>Avg Delivery Time</span>
              </div>
            </div>
            <BarChart
              xAxis={[{ scaleType: 'band', data: xLabelsDistance }]}
              series={[
                { data: km, type: 'bar' },
                { data: hours, type: 'bar' }
              ]}
              width={500}
              height={300}
              margin={{ right: 10, bottom: 40 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sales