import { BarChart } from "@mui/x-charts";

const Distance = () => {

  const km = [ 600, 800, 1000, 900, 600, 850, 600 ];
  const hours = [ 2, 2.5, 1.5, 1, .5, 1, 2 ];
  const xLabels = [ 15, 16, 17, 18, 19, 20, 21 ];

  return (
    <div>
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
        xAxis={[{ scaleType: 'band', data: xLabels }]}
        series={[
          { data: km, type: 'bar' },
          { data: hours, type: 'bar' }
        ]}
        width={500}
        height={300}
        margin={{ right: 10, bottom: 40 }}
      />
    </div>
  );
};

export default Distance;