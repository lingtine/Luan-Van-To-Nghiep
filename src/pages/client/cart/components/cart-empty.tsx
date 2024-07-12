import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-tailwind/react";

import { TbShoppingCartPlus } from "react-icons/tb";
interface CartEmptyProps {}

const CartEmpty: React.FC<CartEmptyProps> = () => {
  return (
    <div className=" min-h-[400px] flex-col flex justify-center items-center">
      <div className="text-6xl">
        <TbShoppingCartPlus />
      </div>

      <h4 className="text-4xl my-8 font-semibold ">
        Giỏ hàng của bạn còn trống
      </h4>
      <Link to={"/"}>
        <Button>Tiếp tục mua hàng</Button>
      </Link>
    </div>
  );
};

export default CartEmpty;
