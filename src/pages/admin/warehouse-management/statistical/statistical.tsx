import React from "react";
import { InputDate } from "components";
import { Button } from "@material-tailwind/react";
import { useState } from "react";
import { useGetOrderReportByStatusMutation } from "redux/api/order/order";

import { toast } from "react-toastify";
import { Spinner } from "@material-tailwind/react";
import TableOrderReport from "./components/table-order-report";
interface StatisticalProps {}

const Statistical: React.FC<StatisticalProps> = () => {
  const [dateEnd, setDateEnd] = useState<Date>();
  const [dateStart, setDateStart] = useState<Date>();
  console.log(
    "🚀 ~ OrderReport ~ dateStart ~ dateEnd :",
    dateStart?.toString(),
    dateEnd?.toLocaleString()
  );
  const [getOrderReport, { isSuccess, isLoading, data }] =
    useGetOrderReportByStatusMutation();

  const handleClick = () => {
    if (dateStart && dateEnd) {
      if (dateStart > dateEnd) {
        toast.error("Ngày bắt đầu phải sớm hơn");
      } else {
        getOrderReport({
          start: dateStart,
          end: dateEnd,
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
      content = <TableOrderReport listOrder={data} />;
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
          setDate={setDateStart}
        />
        <InputDate label="Ngày kết thúc" date={dateEnd} setDate={setDateEnd} />

        <Button onClick={handleClick}>In ra báo cáo</Button>
      </div>
      
      <div className="my-4 px-8">{content}</div>
    </div>
  );
};

export default Statistical;
