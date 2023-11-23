import React from "react";
import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "redux/api/order/order";
import Pagination from "components/pagination/pagitnation";
import { Button, Spinner } from "@material-tailwind/react";
import Table from "components/table/table";

interface OrdersProps {}

const Orders: React.FC<OrdersProps> = () => {
  const { data, isSuccess, isLoading } = useGetOrdersQuery(null);
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
      label: "Ghi chú",
      render: (data: any) => {
        return data.deliveryInfo.note;
      },
    },

    {
      label: "Tuỳ chọn",
      render: (data: any) => {
        return (
          <div className="flex gap-4 justify-end">
            <Button color="red">Xoá</Button>
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
    const updateData = data.map((item, index) => ({
      ...item,
      index: index + 1,
    }));
    content = <Table config={configData} data={updateData}></Table>;
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
      <div className="flex justify-center my-8">
        <Pagination
          pageIndex={0}
          pageSize={20}
          totalCount={80}
          url="/admin/category"
        />
      </div>
    </div>
  );
};

export default Orders;
