import React from "react";

import Table from "components/table/table";
import { useFormatPrice } from "hooks/use-format-price";
import { IProductReport } from "redux/api/types";
interface TableProductReportProps {
  listOrder: IProductReport[];
}

const TableProductReport: React.FC<TableProductReportProps> = ({
  listOrder,
}) => {
  const [formatPrice] = useFormatPrice();

  const updateListOrder = listOrder.map((item, index) => ({
    ...item,
    index: index + 1,
  }));

  const configData = [
    {
      label: "STT",
      render: (data: any) => {
        return data.index;
      },
    },
    {
      label: "Tên sản phẩm",
      render: (data: IProductReport) => {
        return data.productName;
      },
    },
    {
      label: "Doanh thu",
      render: (data: IProductReport) => {
        return (
          <div className="text-right">{formatPrice.format(data.revenue)}</div>
        );
      },
    },
  ];

  return <Table config={configData} data={updateListOrder}></Table>;
};

export default TableProductReport;
