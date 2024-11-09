import { Stack } from "@mui/material";
import { Gauge } from "@mui/x-charts";

const Warehouse = () => {

  return (
    <div>
      <h2 className="font-bold text-xl">Warehouse Activities</h2>
      <div className="flex flex-col">
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 1, md: 3 }}>
          <Gauge width={300} height={200} value={75} startAngle={-90} endAngle={90} />
        </Stack>
        <div className="flex justify-between m-3">
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
  );
};

export default Warehouse;