import { pieArcLabelClasses, PieChart } from '@mui/x-charts/PieChart';

const PieInventory = () => {

  const data = [
    { label: 'Supplements', value: 1000 },
    { label: 'General Health Inventory', value: 345 },
  ];

  const sizing = {
    margin: { right: 5 },
    height: 300,
    legend: { hidden: true },
  };
  const TOTAL = data.map((item) => item.value).reduce((a, b) => a + b, 0);

  const getArcLabel = (params) => {
    const percent = params.value / TOTAL;
    return `${(percent * 100).toFixed(0)}%`;
  };

  return (
    <PieChart
      series={[
        {
          data,
          arcLabel: getArcLabel,
          innerRadius: 85,
          outerRadius: 100,
          paddingAngle: 0,
          cornerRadius: 10,
          startAngle: 0,
          endAngle: 360,
          cx: 150,
          cy: 150,
        },
      ]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: 'white',
          fontSize: 14,
        },
      }}
      {...sizing}
    />
  );
}

export default PieInventory;