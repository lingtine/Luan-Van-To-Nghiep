import React from "react";

import { useGetOrdersQuery } from "redux/api/order/order";
import Pagination from "components/pagination/pagitnation";
import { Button } from "@material-tailwind/react";
import Table from "components/table/table";

interface OrdersProps {}

const Orders: React.FC<OrdersProps> = () => {
  const { data, isSuccess } = useGetOrdersQuery(null);
  const configData = [
    {
      label: "STT",
      render: (data: any) => {
        return data.index;
      },
    },
    {
      label: "Tên Danh Mục",
      render: (data: any) => {
        return data.name;
      },
    },

    {
      label: "Miêu tả",
      render: (data: any) => {
        return data.description;
      },
    },

    {
      label: "Tuỳ chọn",
      render: (data: any) => {
        return (
          <div className="flex gap-4 justify-end">
            <Button color="red">Xoá</Button>
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
