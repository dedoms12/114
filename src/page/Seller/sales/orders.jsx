import { BarChart } from "@mui/x-charts";

const Orders = () => {

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

  return (
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
  );
};

export default Orders;