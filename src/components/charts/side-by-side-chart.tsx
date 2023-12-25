import React from "react";
import { Card, CardBody, CardHeader } from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface SideBySideChartProps {
  title: string;
  options: string[];
  series: { name: string; data: number[] }[];
}
// var options = {
//   chart: {
//     type: "bar",
//     height: 350,
//   },

//   dataLabels: {
//     enabled: false,
//   },
//   stroke: {
//     show: true,
//     width: 2,
//     colors: ["transparent"],
//   },
//   xaxis: {
//     categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
//   },
//   yaxis: {
//     title: {
//       text: "$ (thousands)",
//     },
//   },
//   fill: {
//     opacity: 1,
//   },
//   tooltip: {
//     y: {
//       formatter: function (val) {
//         return "$ " + val + " thousands";
//       },
//     },
//   },
// };
const SideBySideChart: React.FC<SideBySideChartProps> = ({
  title,
  options,
  series,
}) => {
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
    height: 350,
    series: series,
    options: {
      chart: {
        id: "multi-series-column-chart",
      },
      colors: ["#008FFB", "#00E396"],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: options,
      },

      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + "";
          },
        },
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
          type="bar"
          options={chartConfig.options}
          height={chartConfig.height}
          series={chartConfig.series}
        />
      </CardBody>
    </Card>
  );
};

export default SideBySideChart;
