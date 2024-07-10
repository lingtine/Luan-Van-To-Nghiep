import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { ICustomerSale } from "share/types/order";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
interface ICustomerSaleChartProps {
  data: ICustomerSale[];
}

const valueFormatter = (value: number | null) => `${value}mm`;

const CustomerSaleChart = ({ data }: ICustomerSaleChartProps) => {
  const rows = data.map((x) => {
    return {
      id: x.id,
      name: x.name,
      soldCount: x.soldCount,
      returnedCount: x.returnedCount,
      soldQuantity: x.soldQuantity,
      soldAmount: x.soldAmount,
      returnedQuantity: x.returnedQuantity,
      returnedAmount: x.returnedAmount,
      totalDiscount: x.totalDiscount,
      totalProfit: x.totalProfit,
      totalQuantity: x.totalQuantity,
      averageQuantity: x.averageQuantity,
      lastSale: x.lastSale,
    };
  });

  const chartData = {
    labels: data.map((item) => item.name),
    datasets: [
      {
        label: "Doanh thu",
        data: data.map((item) => item.soldAmount),
        backgroundColor: "#3498db",
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
        text: "Thống kê doanh thu theo khách hàng",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Tên khách hàng",
          font: {
            size: 20, // Adjust this value to change the font size
          },
        },
      },
      y: {
        title: {
          display: true,
          text: "VND",
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

export default CustomerSaleChart;
