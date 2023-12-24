import React from "react";
import { Card, CardBody, CardHeader } from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface LineChartProps {
  title: string;
  options: string[];
  series: number[];
}

const LineChart: React.FC<LineChartProps> = ({ title, options, series }) => {
  const chartConfig: {
    options: ApexOptions;
    type: string;
    height: number;
    series: {
      data: number[];
      name: string;
    }[];
  } = {
    type: "bar",
    height: 240,
    series: [
      {
        name: "product",
        data: series,
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },

      dataLabels: {
        enabled: false,
      },
      colors: ["#020617"],
      plotOptions: {
        bar: {
          columnWidth: "40%",
          borderRadius: 2,
        },
      },
      xaxis: {
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
        categories: options,
      },
      yaxis: {
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
      },
      grid: {
        show: true,
        borderColor: "#dddddd",
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 5,
          right: 20,
        },
      },
      fill: {
        opacity: 0.8,
      },
      tooltip: {
        theme: "dark",
      },
    },
  };

  return (
    <Card className="w">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
      >
        {title}
      </CardHeader>
      <CardBody className="px-2 pb-0">
        <Chart
          options={chartConfig.options}
          height={chartConfig.height}
          series={chartConfig.series}
        />
      </CardBody>
    </Card>
  );
};

export default LineChart;
