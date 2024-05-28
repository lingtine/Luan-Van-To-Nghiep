import React from "react";
import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "redux/api/order/order";
import Pagination from "components/pagination/pagitnation";
import { Button, Spinner } from "@material-tailwind/react";
import Table from "components/table/table";
import { useParams } from "react-router-dom";

import { IOrderAdmin } from "redux/api/types";

interface IOrderTable extends IOrderAdmin {
  index: number;
}

const Orders = () => {
  const { index } = useParams();

  const { data, isSuccess, isLoading } = useGetOrdersQuery({
    pageIndex: index,
  });
  const configData = [
    {
      label: "STT",
      render: (data: IOrderTable) => {
        return data.index;
      },
    },
    {
      label: "Tên khách hàng",
      render: (data: IOrderTable) => {
        return data.deliveryInfo.fullName;
      },
    },

    {
      label: "Số điện thoại",
      render: (data: IOrderTable) => {
        return data.deliveryInfo.phoneNumber;
      },
    },
    {
      label: "Trạng Thái",
      render: (data: IOrderTable) => {
        let content;
        if (data.status === "Created") {
          content = (
            <Button color="indigo" size="sm" ripple={false}>
              Mới
            </Button>
          );
        } else if (data.status === "Processing") {
          content = (
            <Button color="green" size="sm" ripple={false}>
              Đã Giao
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
    {
      label: "Ghi chú",
      render: (data: IOrderTable) => {
        return data.deliveryInfo.note;
      },
    },

    {
      label: "Tuỳ chọn",
      render: (data: IOrderTable) => {
        return (
          <div className="flex gap-4 justify-end">
            <Link to={`order-detail/${data.id}`}>
              <Button color="yellow">Detail</Button>
            </Link>
          </div>
        );
      },
    },
  ];
  let content: React.ReactNode;

  if (isSuccess) {
    const { pageSize, pageIndex } = data;

    const updateData: IOrderTable[] = data.data.map((item, index) => ({
      ...item,
      index: index + 1 + pageIndex * pageSize,
    }));
    content = (
      <>
        <Table config={configData} data={updateData}></Table>
        <div className="flex justify-center my-8">
          <Pagination
            pageIndex={data.pageIndex}
            pageSize={data.pageSize}
            totalCount={data.totalCount}
            url="/admin/orders"
          />
        </div>
      </>
    );
  } else if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[100vh]">
        <Spinner className="h-12 w-12" />
      </div>
    );
  }
  return (
    <div className="px-4 ">
      <div className="flex justify-end my-4"></div>
      {content}
    </div>
  );
};

export default Orders;
