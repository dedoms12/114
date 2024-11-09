import { LineChart } from "@mui/x-charts";

const Details = () => {

  const chart = [
    { name: 'Revenue', numeric: '₱152K', percent: 25, days: 'Total revenue compared to 7 days ago' },
    { name: 'Cost', numeric: '₱82K', percent: 25, days: 'Total cost compared to 7 days ago' },
    { name: 'Shipments', numeric: '₱2.140', percent: 25, days: 'Total shipments compared to 7 days ago' },
    { name: 'Avg Delivery Time', numeric: '1.7 Hrs', percent: 25, days: 'Total delivery compared to 7 days ago' },
  ]

  return (
    <div className="grid grid-cols-2 gap-4">
      {chart.map((item) => (
        <div key={item.name} className="border m-2 flex flex-col p-5 w-full">
          <div className="flex items-center">
            <div className="flex flex-col">
              <h1 className="text-lg font-medium">{item.name}</h1>
              <h1 className="text-3xl font-bold">{item.numeric}</h1>
            </div>
            <LineChart
              xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7] }]}
              series={[{ data: [4, 4, 3, 10, 6, 8, 8] }]}
              width={300}
              height={150}
            />
          </div>
          <div className="flex justify-between text-center items-center">
            <span className="px-3 py-1 rounded-3xl bg-green-50 text-green-700">{item.percent}%</span>
            <span className="text-sm">{item.days}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Details;