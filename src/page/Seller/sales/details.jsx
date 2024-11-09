import { LineChart } from "@mui/x-charts";

const Details = () => {

  const chart = [
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
              xAxis={[{ data: item.xdata }]}
              series={[{ data: item.ydata }]}
              width={300}
              height={150}
              margin={{top: 20, bottom: 20}}
            />
          </div>
          <div className="flex justify-between text-center items-center">
            <span className="px-3 py-1 rounded-3xl bg-green-50 text-green-700">{item.percent}%</span>
            <span className="text-xs">{item.days}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Details;