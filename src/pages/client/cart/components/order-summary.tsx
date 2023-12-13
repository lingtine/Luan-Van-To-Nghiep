import React from "react";
import { memo } from "react";
import { useFormatPrice } from "hooks/use-format-price";
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
interface OrderSummaryProps {
  total: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = memo(({ total }) => {
  const [formatPrice] = useFormatPrice();

  return (
    <div className="flex-[0_0_30%] flex flex-col gap-6">
      <div className="p-8 rounded-xl shadow-xl">
        <h3 className="text-xl font-semibold">Tóm tắt đơn hàng</h3>
        <ul className="flex flex-col gap-4 py-4 text-sm font-medium border-b border-primary-1">
          <li className="flex justify-between">
            <span className="opacity-60 ">Tổng Tiền</span>
            <p>{formatPrice.format(total)}</p>
          </li>
          <li className="flex justify-between font-medium">
            <span className="opacity-60 ">Phí ship</span>
            <p>Free</p>
          </li>
        </ul>
        <div className="flex justify-between font-medium mt-4">
          <h5 className="font-semibold">Total</h5>
          <p className="text-red-600 font-semibold">
            {formatPrice.format(total)}
          </p>
        </div>
      </div>
      <Link to={"/cart"}>
        <Button fullWidth color="green" className="shadow-md">
          CheckOut
        </Button>
      </Link>
    </div>
  );
});

export default OrderSummary;
