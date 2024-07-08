import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "redux/api/order/order";
import Pagination from "components/pagination/pagitnation";
import { Button, Spinner } from "@material-tailwind/react";
import Table from "components/table/table";
import { useParams } from "react-router-dom";
import { IOrderTable, OrderStatus } from "share/types/order";
import Select from "@material-tailwind/react/components/Select";
import SelectBox, { ISelected } from "components/select-box/select-box";
const Orders = () => {
  const { index } = useParams();
  const [selected, setSelected] = useState<ISelected>();
  const status = [
    { id: "Created", label: "Mới" },
    { id: "Delivered", label: "Đã giao" },
    { id: "Returned", label: "Đã trả lại" },
    { id: "Canceled", label: "Đã hủy" },
  ];
  const handleSelect = (option: ISelected) => {
    setSelected(option);
  };
  const { data, isSuccess, isLoading } = useGetOrdersQuery({
    PageIndex: index,
    OrderStatus: selected?.id as OrderStatus,
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
            <Button
              className="w-[90px]"
              color="indigo"
              size="sm"
              ripple={false}
            >
              Mới
            </Button>
          );
        } else if (data.status === "Processing") {
          content = (
            <Button className="w-[90px]" color="green" size="sm" ripple={false}>
              Đang xử lý
            </Button>
          );
        } else if (data.status === "Delivered") {
          content = (
            <Button className="w-[90px]" color="green" size="sm" ripple={false}>
              Đã Giao
            </Button>
          );
        } else if (data.status === "Returned") {
          content = (
            <Button className="w-[90px]" color="gray" size="sm" ripple={false}>
              Đã Trả Hàng{" "}
            </Button>
          );
        } else if (data.status === "Canceled") {
          content = (
            <Button className="w-[90px]" color="red" size="sm" ripple={false}>
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
              <Button color="yellow">Chi tiết</Button>
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
    <div className="p-4 flex-col">
      <div className="mb-4 flex justify-end">
        <SelectBox
          onChange={handleSelect}
          options={status}
          selected={selected}
          label="Chọn nhóm danh mục"
        />
      </div>
      {content}
    </div>
  );
};

export default Orders;
