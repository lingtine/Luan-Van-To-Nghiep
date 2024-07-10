import React from "react";
import { useGetOrdersQuery } from "redux/api/order/order";
import { useFormatPrice } from "hooks/use-format-price";
import Table from "components/table/table";
import { IOrderTable } from "share/types/order";
import OrderTable from "pages/admin/orders/components/OrderTable";
interface TableNewOrdersProps {}

const TableNewOrders: React.FC<TableNewOrdersProps> = () => {
  const { data, isSuccess } = useGetOrdersQuery({
    OrderStatus: "Created",
    PageSize: 10,
  });
  const [formatPrice] = useFormatPrice();

  const configTableProduct = [
    {
      label: "STT",
      render: (data: any) => {
        return data.index;
      },
    },
    {
      label: "Tên sản phẩm",
      render: (data: any) => {
        return data.name;
      },
    },
    {
      label: "Số lượng",
      render: (data: any) => {
        return data.quantity;
      },
    },

    {
      label: "Giá Bán",
      render: (data: any) => {
        return formatPrice.format(data.unitPrice);
      },
    },

    {
      label: "Tổng giá",
      render: (data: any) => {
        return (
          <div className="text-right">
            {formatPrice.format(data.quantity * data.unitPrice)}
          </div>
        );
      },
    },
  ];

  if (isSuccess) {
    const { pageIndex, pageSize } = data;
    // const updateData: IOrderTable[] = data.data.map((item, index) => ({
    //   ...item,
    //   index: index + 1 + pageIndex * pageSize,
    // }));
    return <OrderTable data={data.data} />;
  }

  return <></>;
};

export default TableNewOrders;
