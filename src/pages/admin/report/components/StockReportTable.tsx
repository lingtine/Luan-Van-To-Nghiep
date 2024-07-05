import Table from "components/table/table";
import { IStockReportItem, IStockReportTable } from "share/types/warehouse";

interface ITable{
  data: IStockReportItem[]
}

const StockReportTable = ({data}: ITable) => {
  console.log('Data table :>> ', data);
  const configData = [
    // {
    //   label: "STT",
    //   render: (data: IStockReportTable) => {
    //     return data.index;
    //   },
    // },
    {
      label: "Tên Sản phẩm",
      render: (data: IStockReportItem) => {
        return data.name;
      },
    },
    {
      label: "SKU",
      render: (data: IStockReportItem) => {
        return data.sku;
      },
    },
    {
      label: "Tồn đầu kỳ",
      render: (data: IStockReportItem) => {
        return data.openingStock;
      },
    },
    {
      label: "Nhập trong kỳ",
      render: (data: IStockReportItem) => {
        return data.inwardStock;
      },
    },
    {
      label: "Xuất trong kỳ",
      render: (data: IStockReportItem) => {
        return data.outwardStock;
      },
    },
    {
      label: "Tồn cuối kỳ",
      render: (data: IStockReportItem) => {
        return data.closingStock;
      },
    },
  ];
  return <div>
    <Table config={configData} data={data} />
  </div>;
};

export default StockReportTable;
