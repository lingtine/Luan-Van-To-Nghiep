import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useFormatPrice } from "hooks/use-format-price";
function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

interface PieChartProps {
  series: number[];
  options: string[];
  title: string;
  height: number;
  width: number;
}

const PieChart: React.FC<PieChartProps> = ({
  series,
  options,
  title,
  height,
  width,
}) => {
  const [formatPrice] = useFormatPrice();
  const arrayColor = series.map((item) => {
    return getRandomColor();
  });

  const chartConfig: {
    options: ApexOptions;
    type: string;
    width: number;
    height: number;
    series: number[];
  } = {
    type: "pie",
    width: width,
    height: height,
    series: series,
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return formatPrice.format(val); // Format the tooltip value as a price
          },
        },
      },

      labels: options,
      dataLabels: {
        formatter: (val: number, { seriesIndex, dataPointIndex, w }) => {
          return w.config.labels[seriesIndex];
        },
        enabled: false,
      },
      colors: arrayColor,
      legend: {
        show: true,
        position: "right",
      },
    },
  };
  return (
    <Card>
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
      >
        <div>
          <Typography
            variant="small"
            color="black"
            className="max-w-sm font-semibold"
          >
            {title}
          </Typography>
        </div>
      </CardHeader>
      <CardBody className="mt-4 grid place-items-center px-2 ">
        <Chart
          height={chartConfig.height}
          options={chartConfig.options}
          series={chartConfig.series}
          width={chartConfig.width}
          type={"pie"}
        />
      </CardBody>
    </Card>
  );
};

export default PieChart;
