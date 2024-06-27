import React from "react";
import { useGetDetailCartQuery } from "redux/api/cart/cart";
import OrderSummary from "./components/order-summary";
import TableProducts from "./components/table-products";
import CartEmpty from "./components/cart-empty";
interface CartClientProps {}

const CartClient: React.FC<CartClientProps> = () => {
  const { data, isSuccess } = useGetDetailCartQuery();
  console.log("🚀 ~ Cart data:", data)

  if (isSuccess) {
    const total = data.items.reduce((prevValue, curValue) => {
      return prevValue + curValue.quantity * curValue.unitPrice;
    }, 0);

    if (data.items.length === 0) return <CartEmpty />;

    return (
      <div className="container flex gap-10 my-20">
        <TableProducts listProducts={data.items} />
        <OrderSummary total={total} />
      </div>
    );
  }

  return <></>;
};

export default CartClient;
