import Table from "components/table/table";
import { useGetOrdersQuery } from "redux/api/order/order";
import { IOrderTable } from "share/types/order";
import { Button, Typography } from "@material-tailwind/react";
import OrderTable from "../orders/components/OrderTable";

interface TableNewOrderProps {}

const TableNewOrder: React.FC<TableNewOrderProps> = () => {
  const { data, isSuccess, isLoading } = useGetOrdersQuery({
    OrderStatus: "Created",
    PageSize: 5,
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
  ];

  let content: React.ReactNode;

  if (isSuccess) {
    const { pageSize, pageIndex } = data;

    // const updateData: IOrderTable[] = data.data.map((item, index) => ({
    //   ...item,
    //   index: index + 1 + pageIndex * pageSize,
    // }));
    content = (
      <>
        <OrderTable isDashboard={true} data={data.data} />
      </>
    );
  } else if (isLoading) {
  }
  return (
    <div className="pt-4 flex flex-col gap-4">
      <Typography variant="h4">Đơn hàng mới</Typography>
      {content}
    </div>
  );
};

export default TableNewOrder;
