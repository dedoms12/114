import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Info = () => {
  // Chart Data
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"], // Months or categories
    datasets: [
      {
        label: "Total Items",
        data: [1345, 1500, 1400, 1550, 1600, 1700, 1800],
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        tension: 0.4, // Smooth line
      },
      {
        label: "Low-Stock Alerts",
        data: [12, 10, 15, 8, 20, 18, 22],
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.4,
      },
      {
        label: "To Be Delivered",
        data: [200, 220, 210, 230, 250, 270, 290],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
      },
      {
        label: "To Be Ordered",
        data: [120, 130, 125, 140, 150, 160, 170],
        borderColor: "rgba(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        tension: 0.4,
      },
    ],
  };

  // Chart Options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Inventory and Sales Activities Over Time",
      },
    },
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mx-40">
      <h1 className="text-xl font-bold text-gray-800 mb-4 text-center">
        Inventory and Sales Activities
      </h1>
      <Line data={data} options={options} />
    </div>
  );
};

export default Info;
