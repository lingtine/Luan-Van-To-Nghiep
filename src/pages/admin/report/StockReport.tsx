import Button from "@material-tailwind/react/components/Button";
import { InputDate } from "components";
import { useEffect, useState } from "react";
import { useStockReportMutation } from "redux/api/warehouse/warehouse";
import StockReportTable from "./components/StockReportTable";

const StockReport = () => {
  const [dateEnd, setDateEnd] = useState<Date>();
  const [dateStart, setDateStart] = useState<Date>();
  const [getStockReport, { data }] = useStockReportMutation();
  useEffect(() => {
    console.log("Data :>> ", data);
  }, [data]);

  const handleClick = () => {
    const start = dateStart!;

    const end = dateEnd!;

    start.setDate(start.getDate() + 1);
    end.setDate(end.getDate() + 1);

    getStockReport({
      Start: start,
      End: end,
    });
  };
  return (
    <div>
      <div className="flex gap-2 h-full justify-center">
        <InputDate
          label="Ngày bắt đầu"
          date={dateStart}
          setDate={setDateStart}
        />
        <InputDate label="Ngày kết thúc" date={dateEnd} setDate={setDateEnd} />

        <Button onClick={handleClick}>Thống kê</Button>
      </div>
      <StockReportTable />
    </div>
  );
};

export default StockReport;
