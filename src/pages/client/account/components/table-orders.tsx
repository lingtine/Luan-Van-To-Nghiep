import React from "react";
import Table from "components/table/table";
import { IOrder } from "redux/api/types";
import { Button } from "@material-tailwind/react";
interface TableOrderProps {
  data: IOrder[];
}

const TableOrder: React.FC<TableOrderProps> = ({ data }) => {
  const configData = [
    {
      label: "STT",
      render: (data: any) => {
        return data.index;
      },
    },
    {
      label: "Tên khách hàng",
      render: (data: any) => {
        return data.deliveryInfo.fullName;
      },
    },

    {
      label: "Số điện thoại",
      render: (data: any) => {
        return data.deliveryInfo.phoneNumber;
      },
    },
    {
      label: "Trạng Thái",
      render: (data: any) => {
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
              Đang Xử Lý
            </Button>
          );
        } else if (data.Delivered) {
          content = (
            <Button color="green" size="sm" ripple={false}>
              Đã Giao
            </Button>
          );
        } else if (data.Returned) {
          content = (
            <Button color="gray" size="sm" ripple={false}>
              Đã Trả Hàng{" "}
            </Button>
          );
        } else if (data.Canceled) {
          content = (
            <Button color="red" size="sm" ripple={false}>
              Hủy
            </Button>
          );
        }
        return content;
      },
    },
    {
      label: "Ghi chú",
      render: (data: any) => {
        return data.deliveryInfo.note;
      },
    },
  ];
  const updateData = data.map((item, index) => ({
    ...item,
    index: index + 1,
  }));
  return <Table config={configData} data={updateData}></Table>;
};

export default TableOrder;
