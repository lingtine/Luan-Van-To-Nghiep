import React from "react";
import { InputDate } from "components";
import { Button } from "@material-tailwind/react";
import { useState } from "react";
import { useGetOrderReportByStatusMutation } from "redux/api/order/order";
import { useProductRevenueReportingMutation } from "redux/api/catalog/product";
interface StatisticalProps {}

const Statistical: React.FC<StatisticalProps> = () => {
  const [dateEnd, setDateEnd] = useState<Date>();
  const [dateStart, setDateStart] = useState<Date>();

  const [getOrderReport] = useGetOrderReportByStatusMutation();

  const handleClick = () => {
    if (dateStart && dateEnd) {
      getOrderReport({
        start: dateStart.toISOString(),
        end: dateEnd.toISOString(),
      });
    }
  };
  return (
    <div>
      <div className="flex gap-2 h-full justify-center">
        <InputDate date={dateEnd} setDate={setDateEnd} />
        <InputDate date={dateStart} setDate={setDateStart} />
        <Button onClick={handleClick}>In ra báo cáo</Button>
      </div>
    </div>
  );
};

export default Statistical;
