import { LineChart } from "@mui/x-charts";

const Profit = () => {

  const chart = [
    {
      xdata: [15, 16, 17, 18, 19, 20, 21],
      y1data: [Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100)],
      y2data: [Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100)],
      y3data: [Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100)],
    },
  ];

  return (
    <div>
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
      xAxis={[{ data: chart[0].xdata }]}
      series={[
        { curve: "natural", data: chart[0].y1data },
        { curve: "natural", data: chart[0].y2data },
        { curve: "natural", data: chart[0].y3data },
      ]}
      width={500}
      height={300}
      margin={{right: 10, bottom: 40}}
    />
    </div>
  );
};

export default Profit;