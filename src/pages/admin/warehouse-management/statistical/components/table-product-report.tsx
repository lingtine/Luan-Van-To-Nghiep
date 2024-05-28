import React from "react";

import Table from "components/table/table";
import { useFormatPrice } from "hooks/use-format-price";
import { IProductReport } from "redux/api/types";
interface TableProductReportProps {
  listOrder: IProductReport[];
}
interface IProductReportTable extends IProductReport {
  index: number;
}

const TableProductReport: React.FC<TableProductReportProps> = ({
  listOrder,
}) => {
  const [formatPrice] = useFormatPrice();

  const updateListOrder: IProductReportTable[] = listOrder.map(
    (item, index) => ({
      ...item,
      index: index + 1,
    })
  );

  const configData = [
    {
      label: "STT",
      render: (data: IProductReportTable) => {
        return data.index;
      },
    },
    {
      label: "Tên sản phẩm",
      render: (data: IProductReportTable) => {
        return data.productName;
      },
    },
    {
      label: "Doanh thu",
      render: (data: IProductReportTable) => {
        return (
          <div className="text-right">{formatPrice.format(data.revenue)}</div>
        );
      },
    },
  ];

  return <Table config={configData} data={updateListOrder}></Table>;
};

export default TableProductReport;
