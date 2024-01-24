import React from "react";
import { useState } from "react";

import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import {
  useAddToCartMutation,
  useGetDetailCartQuery,
} from "redux/api/cart/cart";
import { useGetProductDetailQuery } from "redux/api/catalog/product";
import { Rating, Button } from "@material-tailwind/react";
import { formatVND } from "utils/formatVND";
import InputQuantity from "components/input/input-quantity";
import ProductSpecification from "./components/product-specifications";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "redux/store";
import ProductDetailSkeleton from "components/skeleton/product-detail-skeleton";
function ProductDetailPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { accessToken } = useAppSelector((state) => state.authSlice);
  const { data, isLoading, isSuccess } = useGetProductDetailQuery(
    productId || "",
    {
      refetchOnFocus: true,
    }
  );

  const { refetch } = useGetDetailCartQuery(null);

  const [quantity, setQuantity] = useState<number>(1);
  const [addToCart] = useAddToCartMutation();

  async function handleAddToCart() {
    console.log(accessToken);
    if (!accessToken) {
      toast.info("Bạn cần phẩm đăng nhập trước");
      navigate("/login");
    } else {
      if (data) {
        const dataItem = {
          productId: data.id,
          productName: data.name,
          quantity: quantity,
          unitPrice: data.unitPrice,
        };
        try {
          await addToCart(dataItem);
          await refetch();
          if (isSuccess) {
            toast.success("Thêm vào giỏ hàng thành công");
          }
        } catch (error) {
          console.error("Error adding to cart:", error);
          toast.error("Failed to add to cart");
        }
      }
    }
  }
  if (isSuccess) {
    return (
      <>
        {data && (
          <div className="container mx-auto my-20">
            <div className=" px-4 sm:px-6 lg:px-8 mt-6 flex flex-col lg:flex-row ">
              <div className="min-w-[50%] ">
                <img
                  className="h-full w-full  max-h-[400px] object-contain "
                  src={
                    data.imageUrl ||
                    "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:80/plain/https://cellphones.com.vn/media/catalog/product/t/e/text_ng_n_13__3_29.png"
                  }
                  alt={data.name}
                />
              </div>
              <div className="min-w-[50%]  py-8 px-4 flex flex-col gap-4 border shadow-md rounded-lg">
                {data.isInStock || (
                  <p className="bg-[#ff563029] rounded w-fit text-sm uppercase text-[#B71D18] font-bold p-2">
                    {"Hết hàng"}
                  </p>
                )}

                <h2 className="font-semibold text-xl text-primary-1 uppercase">
                  {data.name}
                </h2>
                <span className="flex items-center gap-4">
                  <Rating readonly value={data.numberOfStar} />
                  <p>{`(${data.viewCount} lượt xem)`} </p>
                </span>
                <p className="text-2xl">{formatVND(data.unitPrice)}</p>
                <div className="flex justify-between">
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
                    disabled={!data.isInStock}
                    color={data.isInStock ? "yellow" : "gray"}
                    onClick={() => handleAddToCart()}
                  >
                    Thêm vào giỏ hàng
                  </Button>
                </div>
                <div className="flex py-4 space-x-4"></div>
              </div>
            </div>

            {data.productSpecifications.length !== 0 && (
              <div className="max-w-[50%] my-20">
                <ProductSpecification data={data.productSpecifications} />
              </div>
            )}
          </div>
        )}
      </>
    );
  } else if (isLoading) {
    return (
      <div className="container my-12 mx-auto">
        <ProductDetailSkeleton />
      </div>
    );
  }
  return <div></div>;
}

export default ProductDetailPage;
