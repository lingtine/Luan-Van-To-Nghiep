import Button from "@material-tailwind/react/components/Button";
import { InputDate } from "components";
import { useState } from "react";
import { useStockReportMutation } from "redux/api/warehouse/warehouse";
import { IStockReportItem } from "share/types/warehouse";
import StockReportTable from "./components/StockReportTable";

const StockReport = () => {
  const [dateEnd, setDateEnd] = useState<Date>();
  const [dateStart, setDateStart] = useState<Date>();
  const [getStockReport, { data }] = useStockReportMutation();
  const [pageIndex, setPageIndex] = useState(0);
  const [tableData, setTableData] = useState<IStockReportItem[]>(
    data?.data.slice(0, 20) || []
  );
  const pageSize = 20;

  const handleClick = () => {
    if (!dateStart || !dateEnd) {
      return;
    }
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
      {data && (
        <div className="m-4 p-4">
          <StockReportTable data={data?.data ?? []} />
        </div>
      )}
    </div>
  );
};

export default StockReport;
