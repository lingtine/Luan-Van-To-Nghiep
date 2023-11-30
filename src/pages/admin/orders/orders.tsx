import React from "react";
import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "redux/api/order/order";
import Pagination from "components/pagination/pagitnation";
import { Button, Spinner } from "@material-tailwind/react";
import Table from "components/table/table";
import { useParams } from "react-router-dom";
interface OrdersProps {}

const Orders: React.FC<OrdersProps> = () => {
  const { index } = useParams();

  const { data, isSuccess, isLoading } = useGetOrdersQuery({
    pageIndex: index,
  });
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
    const updateData = data.data.map((item, index) => ({
      ...item,
      index: index + 1,
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
