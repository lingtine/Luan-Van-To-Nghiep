import BarChart from "components/charts/bar-chart";
import { IStockReportItem } from "share/types/warehouse";
import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface IStockReportChartProps {
  data: IStockReportItem[];
}

const StockReportChart = ({ data }: IStockReportChartProps) => {
  const chartData = {
    labels: data.map((item) => item.name),
    datasets: [
      {
        label: "Tồn đầu kỳ",
        data: data.map((item) => item.openingStock),
        backgroundColor: "#3498db",
      },
      {
        label: "Tồn cuối kỳ",
        data: data.map((item) => item.closingStock),
        backgroundColor: "#2ecc71",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Thống kê hàng tồn kho đầu kỳ và cuối kỳ",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Tên sản phẩm",
          font: {
            size: 20, // Adjust this value to change the font size
          },
        },
      },
      y: {
        title: {
          display: true,
          text: "Số lượng",
          font: {
            size: 20,
          },
        },
      },
    },
  };

  return (
    <div className="bg-white">
      <Bar className="w-full" data={chartData} options={options} />
    </div>
  );
};

export default StockReportChart;
