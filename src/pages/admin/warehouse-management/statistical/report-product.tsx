import React, { useEffect } from "react";
import { InputDate } from "components";
import { Button } from "@material-tailwind/react";
import { useState } from "react";
import { useProductRevenueReportingMutation } from "redux/api/catalog/product";

import PieChart from "components/charts/pie-chart";
import { toast } from "react-toastify";
import { Spinner } from "@material-tailwind/react";

interface ReportOrderProps {}

const ReportOrder: React.FC<ReportOrderProps> = () => {
  const now = new Date();
  let firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
  let lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  const [dateEnd, setDateEnd] = useState<Date>(lastDay);
  const [dateStart, setDateStart] = useState<Date>(firstDay);

  const [getOrderReport, { isSuccess, isLoading, data }] =
    useProductRevenueReportingMutation();

  useEffect(() => {
    getOrderReport({
      start: dateStart.toISOString(),
      end: dateEnd.toISOString(),
    });
  }, []);

  const handleClick = () => {
    if (dateStart && dateEnd) {
      if (dateStart > dateEnd) {
        toast.error("Ngày bắt đầu phải sớm hơn");
      } else {
        getOrderReport({
          start: dateStart.toISOString(),
          end: dateEnd.toISOString(),
        });
      }
    } else {
      toast.error("Vui lòng chọn ngày");
    }
  };

  let content;

  if (isLoading) {
    content = (
      <div className="flex justify-center items-center h-[100vh]">
        <Spinner className="h-12 w-12" />
      </div>
    );
  } else if (isSuccess) {
    if (data && data.length !== 0) {
      const options = data.map((item) => {
        return item.productName;
      });
      const series = data.map((item) => {
        return item.revenue;
      });
      content = (
        <PieChart
          title="Biểu đồ doanh thu sản phẩm"
          series={series}
          options={options}
          width={800}
          height={800}
        />
      );
    } else if (data && data.length === 0) {
      content = <p>Không có dữ liệu</p>;
    }
  }

  return (
    <div>
      <div className="flex gap-2 h-full justify-center">
        <InputDate
          label="Ngày bắt đầu"
          date={dateStart}
          setDate={(date) => {
            date && setDateStart(date);
          }}
        />
        <InputDate
          label="Ngày kết thúc"
          date={dateEnd}
          setDate={(date) => {
            date && setDateEnd(date);
          }}
        />

        <Button color={"blue"} onClick={handleClick}>
          In ra báo cáo
        </Button>
      </div>

      <div className="my-4 px-8">{content}</div>
    </div>
  );
};

export default ReportOrder;
