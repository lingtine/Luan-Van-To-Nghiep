import Button from "@material-tailwind/react/components/Button";
import { InputDate } from "components";
import { useEffect, useState } from "react";
import { useStockReportMutation } from "redux/api/warehouse/warehouse";
import { IStockReportItem } from "share/types/warehouse";
import StockReportTable from "./components/StockReportTable";
import StockReportPagination from "./components/StockReportPagination";
import StockReportChart from "./components/StockReportChart";
import { format, addDays } from "date-fns";

const pageSize = 10;

const StockReport = () => {
  const now = new Date();
  let firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
  let lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  const [dateEnd, setDateEnd] = useState<Date>(lastDay);
  const [dateStart, setDateStart] = useState<Date>(firstDay);
  const [getStockReport, { data }] = useStockReportMutation();
  const [pageIndex, setPageIndex] = useState(1);
  const [tableData, setTableData] = useState<IStockReportItem[]>(
    data?.data.slice(0, pageSize) || []
  );
  const [isShowChart, setIsShowChart] = useState(false);

  const handleReportClick = () => {
    if (dateStart && dateEnd) {
      setIsShowChart(false);
      fetchStockReport(dateStart, dateEnd);
    }
  };

  const handleVisualizeClick = async () => {
    if (dateStart && dateEnd) {
      setIsShowChart(true);
      if (!data) {
        await fetchStockReport(dateStart, dateEnd);
      }
    }
  };

  const handleChangeDate = (date: Date | undefined, isStart: boolean) => {
    if (date) {
      isStart ? setDateStart(date) : setDateEnd(date);
    }
  };

  const fetchStockReport = async (start: Date, end: Date) => {
    await getStockReport({
      Start: addDays(start, 1),
      End: addDays(end, 1),
    }).unwrap();
  };

  useEffect(() => {
    if (dateStart && dateEnd) {
      fetchStockReport(dateStart, dateEnd);
    }
  }, []);

  useEffect(() => {
    if (data?.data) {
      const startIndex = (pageIndex - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      setTableData(data.data.slice(startIndex, endIndex));
    }
  }, [data, pageIndex]);

  const content = data ? (
    <div className="m-4 p-4">
      {isShowChart ? (
        <StockReportChart data={tableData} />
      ) : (
        <StockReportTable data={tableData} />
      )}
      <div className="mt-4">
        <StockReportPagination
          pageIndex={pageIndex}
          pageSize={pageSize}
          total={data.data.length}
          onChangePage={setPageIndex}
        />
      </div>
    </div>
  ) : <div>Không có dữ liệu</div>;

  return (
    <div>
      <div className="flex gap-2 h-full justify-center">
        <InputDate
          label="Ngày bắt đầu"
          date={dateStart}
          setDate={(date) => handleChangeDate(date, true)}
        />
        <InputDate label="Ngày kết thúc" date={dateEnd} setDate={(date) => handleChangeDate(date, false)} />

        <Button onClick={handleReportClick}>Thống kê số liệu</Button>
        <Button onClick={handleVisualizeClick}>Biểu đồ</Button>
      </div>
      {data && content}
    </div>
  );
};

export default StockReport;
