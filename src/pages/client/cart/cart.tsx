import { useAppSelector } from "redux/store";
import OrderSummary from "./components/order-summary";
import TableProducts from "./components/table-products";
import CartEmpty from "./components/cart-empty";

const Cart = () => {
  const { cart } = useAppSelector((state) => state.cartSlice);
  console.log("🚀 ~ Cart ~ cart:", cart)

  if (cart) {
    if (cart.items.length === 0) return <CartEmpty />;

    const total = cart.items.reduce((prevValue, curValue) => {
      return prevValue + curValue.quantity * curValue.unitPrice;
    }, 0);

    return (
      <div className="container flex gap-10 my-20">
        <TableProducts listProducts={cart.items} />
        <OrderSummary total={total} />
      </div>
    );
  }

  return <></>;
};
export default Cart;
