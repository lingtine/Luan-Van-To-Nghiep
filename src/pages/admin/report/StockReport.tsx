import Button from "@material-tailwind/react/components/Button";
import { InputDate } from "components";
import { useEffect, useState } from "react";
import { useStockReportMutation } from "redux/api/warehouse/warehouse";
import { IStockReportItem } from "share/types/warehouse";
import StockReportTable from "./components/StockReportTable";
import StockReportPagination from "./components/StockReportPagination";

const StockReport = () => {
  const [dateEnd, setDateEnd] = useState<Date>();
  const [dateStart, setDateStart] = useState<Date>();
  const [getStockReport, { data }] = useStockReportMutation();
  const [pageIndex, setPageIndex] = useState(1);
  const [tableData, setTableData] = useState<IStockReportItem[]>(
    data?.data.slice(0, 20) || []
  );
  const pageSize = 20;

  useEffect(() => {
    const startIndex = (pageIndex - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = data?.data.slice(startIndex, endIndex);
    setTableData(paginatedData || []);
  }, [data, pageIndex]);

  const handleClick = () => {
    if (!dateStart || !dateEnd) {
      return;
    }
    let start = dateStart!;
    start = new Date(start);
    let end = { ...dateEnd! };
    end = new Date(dateEnd);
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
          <div>
            <StockReportTable data={tableData ?? []} />
          </div>
          <div className="mt-4">
            <StockReportPagination
              pageIndex={pageIndex}
              pageSize={pageSize}
              total={data?.data.length}
              onChangePage={setPageIndex}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default StockReport;
