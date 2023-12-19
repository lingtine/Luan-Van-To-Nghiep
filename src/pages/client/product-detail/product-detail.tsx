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
function ProductDetailPage() {
  const { productId } = useParams();
  const { data } = useGetProductDetailQuery(productId || "", {
    refetchOnFocus: true,
  });

  const {
    data: cartdata,
    isSuccess: loadcart,
    refetch,
  } = useGetDetailCartQuery(null);

  const [quantity, setQuantity] = useState<number>(1);
  const [addToCart, isSuccess] = useAddToCartMutation();

  async function handleAddToCart() {
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

  return (
    <>
      {isSuccess && data && (
        <div className="container mx-auto">
          <div className=" px-4 sm:px-6 lg:px-8 mt-6 flex flex-col lg:flex-row ">
            <div className="min-w-[50%] ">
              <img
                className="h-full w-full  max-h-[400px] object-contain "
                src={
                  data.imageUrl ||
                  "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:80/plain/https://cellphones.com.vn/media/catalog/product/t/e/text_ng_n_13__3_29.png"
                }
                alt=""
              />
            </div>
            <div className="min-w-[50%]  py-8 px-4 flex flex-col gap-4 bg-blue-gray-50">
              {/* <ItemHeading /> */}

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
                <p>{"(" + data.viewCount + " lượt xem" + ")"} </p>
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
              {/* <div>
                <div>
                  <h3 className="py-3 text-2xl flex uppercase">
                    Thông tin sản phẩm
                  </h3>

                  <ul className="text-left list-disc ml-6 max-h-[500px] overflow-auto">
                    {data.productSpecifications &&
                      data.productSpecifications.map((info) => (
                        <li key={info.id}>
                          {info.specificationName} : {info.specificationValue}
                        </li>
                      ))}
                  </ul>
                </div>
              </div> */}
              {/* <AddBTn /> */}
              <div className="flex py-4 space-x-4"></div>
            </div>
          </div>

          <div className="max-w-[50%] my-20">
            <h4 className="text-xl font-bold my-4">Thông số sản phẩm</h4>
            <ul>
              {data.productSpecifications.map((item) => {
                return (
                  <li
                    className="flex text-sm px-2 items-center  gap-4 justify-between border border-primary-1"
                    key={item.id}
                  >
                    <span className="min-w-[50%] py-4 flex[0_0_50%] border-r border-primary-1">
                      {item.specificationName}
                    </span>
                    <span>{item.specificationValue}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* <div className="text-left border-b border-b-white-800 pb-3 overflow-auto">
              <span>{data.description}</span>
            </div> */}
          {/* <div className="px-4 sm:px-6 lg:px-14 mt-6 mx-auto">
        <span className="font-semibold text-4xl whitespace-wrap uppercase my-8">
          Bình Luận
        </span>

        <div className="flex items-center gap-7 my-7 mr-4">
          <SearchBar className="max-w-[320px]" area label="Nhập bình luận về sản phẩm"/>
          <button className="w-[60px] h-[60px] bg-primary border border-primary-1 hover:bg-white flex items-center justify-center rounded-lg">
            <IoIosSend className="text-2xl"/>
          </button>
        </div>
        <Comments />
      </div> */}
        </div>
      )}
    </>
  );
}

export default ProductDetailPage;
