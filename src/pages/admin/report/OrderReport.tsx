import Button from "@material-tailwind/react/components/Button";
import { ApexOptions } from "apexcharts";
import { InputDate } from "components";
import SelectBox, { ISelected } from "components/select-box/select-box";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useGetOrderReportInRangeMutation } from "redux/api/order/order";
import { IOrderReportData, OrderReportType } from "share/types/report";
import { formatVND } from "utils/formatVND";

interface BarChartProps {
  data: { target: string; total: number }[];
}
const OrderReportTypes: ISelected[] = [
  {
    id: "Day",
    label: "Theo ngày",
  },
  {
    id: "Week",
    label: "Theo tuần",
  },
  {
    id: "Month",
    label: "Theo tháng",
  },
  {
    id: "Year",
    label: "Theo năm",
  },
];
const OrderReport = () => {
  const [reportData, setReportData] = useState<IOrderReportData[]>([]);
  const [date, setDate] = useState<Date>();
  const [selected, setSelected] = useState<ISelected>(OrderReportTypes[0]);

  const [getOrderReportInRange, { data }] = useGetOrderReportInRangeMutation();

  useEffect(() => {
    const selectedDate = new Date();
    selectedDate.setDate(selectedDate.getDate() + 1);
    getOrderReportInRange({
      date: selectedDate,
      type: "Day",
    });
  }, []);

  const handleClick = () => {
    const selectedDate = date ?? new Date();
    selectedDate.setDate(selectedDate.getDate() + 1);
    getOrderReportInRange({
      date: selectedDate,
      type: selected.id as OrderReportType,
    });
  };

  useEffect(() => {
    if (data?.data) {
      setReportData(data?.data);
    }
  }, [data]);

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
    height: 500,
    series: [
      {
        name: `Thống kê doanh thu ${selected.label.toLowerCase()}`,
        data: reportData.map((x) => x.total),
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
      colors: ["#008FFB"],
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
            colors: "black",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
        title: {
          text: "Thời gian", // Set the y-axis title here
          style: {
            color: "black",
            fontSize: "14px",
            fontFamily: "inherit",
            fontWeight: 500,
          },
        },
        categories: reportData.map((x) => x.target),
      },
      yaxis: {
        labels: {
          formatter: (value: number) => {
            return formatVND(value);
          },
          style: {
            colors: "black",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
        title: {
          text: "Doanh thu (VND)", // Set the y-axis title here
          style: {
            color: "black",
            fontSize: "14px",
            fontFamily: "Times New Roman",
            fontWeight: 500,
          },
        },
      },
      title: {
        text: `Thống kê doanh thu ${selected.label}`,
        style: {
          fontSize: "30px",
          fontFamily: "Times New Roman",
        },
        align: "center",
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
    <div>
      <div className="flex gap-2 h-full justify-center">
        <InputDate label="Ngày" date={date} setDate={setDate} />

        <SelectBox
          onChange={(option: ISelected) => setSelected(option)}
          options={OrderReportTypes}
          selected={selected}
          label="Loại thông kê"
        />

        <Button color="green" onClick={handleClick}>
          Thống kê
        </Button>
      </div>

      <div className="w-full mx-auto my-10">
        <Chart
          options={chartConfig.options}
          height={chartConfig.height}
          series={chartConfig.series}
          type="bar"
        />
      </div>
    </div>
  );
};

export default OrderReport;
