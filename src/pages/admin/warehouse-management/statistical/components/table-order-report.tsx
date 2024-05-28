import React from "react";
import { Button } from "@material-tailwind/react";
import Table from "components/table/table";
import { useFormatPrice } from "hooks/use-format-price";
import { IOrderReport } from "redux/api/types";
interface TableOrderReportProps {
  listOrder: IOrderReport[];
}

interface IIOrderReportTable extends IOrderReport {
  index: number;
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
      render: (data: IIOrderReportTable) => {
        return data.index;
      },
    },
    {
      label: "Doanh thu",
      render: (data: IIOrderReportTable) => {
        return formatPrice.format(data.revenue);
      },
    },

    {
      label: "Giá trị đơn hàng",
      render: (data: IIOrderReportTable) => {
        return formatPrice.format(data.totalAmount);
      },
    },
    {
      label: "Tiền đã giảm giá",
      render: (data: IIOrderReportTable) => {
        return formatPrice.format(data.totalDiscount);
      },
    },
    {
      label: "Số lượng loại sản phẩm",
      render: (data: IIOrderReportTable) => {
        return data.totalOrder;
      },
    },
    {
      label: "Số lượng sản phẩm",
      render: (data: IIOrderReportTable) => {
        return data.totalProduct;
      },
    },
    {
      label: "Trạng thái",
      render: (data: IIOrderReportTable) => {
        let content;
        if (data.status === "Created") {
          content = (
            <Button color="indigo" size="sm" ripple={false}>
              Mới
            </Button>
          );
        } else if (data.status === "Processing") {
          content = (
            <Button color="yellow" size="sm" ripple={false}>
              Đang xử lý
            </Button>
          );
        } else if (data.status === "Delivering") {
          content = (
            <Button color="light-green" size="sm" ripple={false}>
              Đang giao
            </Button>
          );
        } else if (data.status === "Delivered") {
          content = (
            <Button color="green" size="sm" ripple={false}>
              Đã Giao
            </Button>
          );
        } else if (data.status === "Returned") {
          content = (
            <Button color="gray" size="sm" ripple={false}>
              Đã Trả Hàng{" "}
            </Button>
          );
        } else if (data.status === "Canceled") {
          content = (
            <Button color="red" size="sm" ripple={false}>
              Hủy
            </Button>
          );
        }
        return content;
      },
    },
  ];

  return <Table config={configData} data={updateListOrder}></Table>;
};

export default TableOrderReport;
