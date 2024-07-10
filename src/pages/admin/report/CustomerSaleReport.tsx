import Button from "@material-tailwind/react/components/Button";
import { InputDate } from "components";
import { format } from "date-fns";
import { useState } from "react";
import { useGetCustomerSaleReportQuery } from "redux/api/order/order";
import CustomerSaleTable from "./components/CustomerSaleTable";
import CustomerSaleChart from "./components/CustomerSaleChart";
import BasicTable from "components/mui-table/BasicTable";

const CustomerSaleReport = () => {
  const now = new Date();
  let firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
  let lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  const [dateEnd, setDateEnd] = useState<Date>(lastDay);
  const [dateStart, setDateStart] = useState<Date>(firstDay);

  const { data, refetch  } = useGetCustomerSaleReportQuery({
    start: format(dateStart, "dd/MM/yyyy"),
    end: format(dateEnd, "dd/MM/yyyy"),
  });


  const [isShowChart, setIsShowChart] = useState(false);

  const handleReportClick = () => {
    refetch()
    if (dateStart && dateEnd) {
      setIsShowChart(false);
    }
  };

  const handleVisualizeClick = async () => {
    refetch()
    if (dateStart && dateEnd) {
      setIsShowChart(true);
    }
  };

  const handleChangeDate = (date: Date | undefined, isStart: boolean) => {
    if (date) {
      isStart ? setDateStart(date) : setDateEnd(date);
    }
  };
console.log('object :>> ', isShowChart, data);
  const content = data ? (
    <div className="m-4 p-4">
      {isShowChart ? (
        <CustomerSaleChart data={data} />
      ) : (
        <CustomerSaleTable data={data} />
      )}
      <BasicTable/>
    </div>
  ) : (
    <div>Không có dữ liệu</div>
  );
  return (
    <div>
      <div className="flex gap-2 h-full justify-center">
        <InputDate
          label="Ngày bắt đầu"
          date={dateStart}
          setDate={(date) => handleChangeDate(date, true)}
        />
        <InputDate
          label="Ngày kết thúc"
          date={dateEnd}
          setDate={(date) => handleChangeDate(date, false)}
        />

        <Button onClick={handleReportClick}>Thống kê số liệu</Button>
        <Button onClick={handleVisualizeClick}>Biểu đồ</Button>
      </div>
      {data && content}
    </div>
  );
};

export default CustomerSaleReport;
