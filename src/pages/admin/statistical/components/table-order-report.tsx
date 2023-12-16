import React from "react";

import Table from "components/table/table";
import { useFormatPrice } from "hooks/use-format-price";
import { IOrderReport } from "redux/api/types";
interface TableOrderReportProps {
  listOrder: IOrderReport[];
}

const TableOrderReport: React.FC<TableOrderReportProps> = ({ listOrder }) => {
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
      label: "Doanh thu",
      render: (data: IOrderReport) => {
        return formatPrice.format(data.revenue);
      },
    },

    {
      label: "Giá trị đơn hàng",
      render: (data: IOrderReport) => {
        return formatPrice.format(data.totalAmount);
      },
    },
    {
      label: "Tiền đã giảm giá",
      render: (data: IOrderReport) => {
        return formatPrice.format(data.totalDiscount);
      },
    },
    {
      label: "Số lượng loại sản phẩm",
      render: (data: IOrderReport) => {
        return data.totalOrder;
      },
    },
    {
      label: "Số lượng sản phẩm",
      render: (data: IOrderReport) => {
        return data.totalProduct;
      },
    },
    {
      label: "Trạng thái",
      render: (data: IOrderReport) => {
        return data.status;
      },
    },
  ];

  return <Table config={configData} data={updateListOrder}></Table>;
};

export default TableOrderReport;
