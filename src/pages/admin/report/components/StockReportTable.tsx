import Table from "components/table/table";
import { IStockReportItem, IStockReportTable } from "share/types/warehouse";

interface ITable {
  data: IStockReportItem[];
}

const StockReportTable = ({ data }: ITable) => {
  const tableData: IStockReportTable[] = data.map((item, index) => {
    return { ...item, index: index + 1};
  });
  const configData = [
    {
      label: "STT",
      render: (data: IStockReportTable) => {
        return data.index;
      },
    },
    {
      label: "Tên Sản phẩm",
      render: (data: IStockReportTable) => {
        return data.name;
      },
    },
    {
      label: "SKU",
      render: (data: IStockReportTable) => {
        return data.sku;
      },
    },
    {
      label: "Tồn đầu kỳ",
      render: (data: IStockReportTable) => {
        return data.openingStock;
      },
    },
    {
      label: "Nhập trong kỳ",
      render: (data: IStockReportTable) => {
        return data.inwardStock;
      },
    },
    {
      label: "Xuất trong kỳ",
      render: (data: IStockReportTable) => {
        return data.outwardStock;
      },
    },
    {
      label: "Tồn cuối kỳ",
      render: (data: IStockReportTable) => {
        return data.closingStock;
      },
    },
  ];
  return (
    <div>
      <Table config={configData} data={tableData} />
    </div>
  );
};

export default StockReportTable;
