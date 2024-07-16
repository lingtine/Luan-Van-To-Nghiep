import React, { useState, useEffect } from "react";
import { formatVND } from "utils/formatVND";
import { Button, Rating } from "@material-tailwind/react";
import InputQuantity from "components/input/input-quantity";
import { useNavigate } from "react-router-dom";
import { useAddToCartMutation } from "redux/api/cart/cart";
import { CiShoppingCart } from "react-icons/ci";
import { toast } from "react-toastify";

import { useAppSelector } from "redux/store";
interface ProductDetailRightSideProps {
  productId: string;
  isInStock: boolean;
  productName: string;
  numberOfStar: number;
  viewCount: number;
  unitPrice: number;
}

const ProductDetailRightSide: React.FC<ProductDetailRightSideProps> = ({
  productId,
  isInStock,
  numberOfStar,
  productName,
  unitPrice,
  viewCount,
}) => {
  const [quantity, setQuantity] = useState<number>(1);
  const { user } = useAppSelector((state) => state.userSlice);

  const [addToCart, result] = useAddToCartMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (result.isLoading) {
      toast.success("Thêm vào giỏ hàng thành công");
    }
  }, [result]);

  const handleAddToCart = () => {
    if (user) {
      if (quantity !== 0) {
        const dataItem = {
          productId: productId,
          productName: productName,
          quantity: quantity,
          unitPrice: unitPrice,
        };
        addToCart(dataItem);
      } else {
        toast.warning("Số lượng sản phẩm phải lớn hơn 0");
      }
    } else {
      toast.warning("Bạn cần phẩm đăng nhập trước");
      navigate("/login");
    }
  };
  return (
    <div className="basis-1/2  py-8 px-4 flex flex-col gap-4 border shadow-md rounded-lg">
      {isInStock || (
        <p className="bg-[#ff563029] rounded w-fit text-sm uppercase text-[#B71D18] font-bold p-2">
          {"Hết hàng"}
        </p>
      )}

      <h2 className="font-semibold text-xl text-primary-1 uppercase">
        {productName}
      </h2>
      <span className="flex items-center gap-4">
        <Rating readonly value={numberOfStar} />
        <p>{`(${viewCount} lượt xem)`} </p>
      </span>
      <p className="text-2xl">{formatVND(unitPrice)}</p>
      <div className="flex gap-4 items-center">
        <h6>Số lượng</h6>

        <InputQuantity
          maxQuantity={99}
          quantity={quantity}
          onChange={setQuantity}
        />
      </div>

      <div>
        <Button
          size="lg"
          disabled={!isInStock}
          className="flex items-center gap-4 bg-primary hover:bg-primary-text-emphasis text-white"
          onClick={() => handleAddToCart()}
        >
          <CiShoppingCart className="text-xl" />
          <span>Thêm vào giỏ</span>
        </Button>
      </div>
      <div className="flex py-4 space-x-4"></div>
    </div>
  );
};

export default ProductDetailRightSide;
