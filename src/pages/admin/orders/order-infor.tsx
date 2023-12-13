import React from "react";
import { format } from "date-fns";
import { useFormatPrice } from "hooks/use-format-price";
interface OrderInfoProps {
  timeCreate: string;
  amount: number;
}

const OrderInfo: React.FC<OrderInfoProps> = ({ timeCreate, amount }) => {
  const date = new Date(timeCreate);

  const [formatPrice] = useFormatPrice();
  return (
    <div className="px-8 py-6 border bg-blue-50 rounded-xl shadow-xl">
      <h3 className="text-xl font-semibold pb-4">Thông tin đơn hàng</h3>
      <div className="flex justify-between my-2">
        <h5 className="font-semibold">Ngày đặt đặt</h5>
        <p>{format(date, "P")}</p>
      </div>
      <div className="flex justify-between my-2">
        <h5 className="font-semibold">Thời gian đặt</h5>
        <p>{format(date, "p")}</p>
      </div>
      <div className="flex justify-between my-2">
        <h5 className="font-semibold">Tổng đơn hàng</h5>
        <p>{formatPrice.format(amount)}</p>
      </div>
    </div>
  );
};

export default OrderInfo;
