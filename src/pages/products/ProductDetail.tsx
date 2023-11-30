import { SearchBar } from "components";
import Comments from "pages/client/comment/comments";
import React, { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoIosSend } from "react-icons/io";
import { useParams } from "react-router-dom";
import { useAddToCartMutation } from "redux/api/cart/cart";
import { useGetProductDetailQuery } from "redux/api/catalog/product";
import { formatVND } from "utils/formatVND";

export default function ProductDetailPage() {
  const { productId } = useParams();
  const { data, isSuccess } = useGetProductDetailQuery(productId || "", {
    refetchOnFocus: true,
  });
  const [quantity, setQuantity] = useState<number>(1)
    const [addToCart] = useAddToCartMutation()

  function handleAddToCart() {
    if(data) {
      const dataItem = {
        productId: data.id,
        productName: data.name,
        quantity: quantity,
        unitPrice: data.unitPrice,
      }
      // addToCart(dataItem)
      console.log(dataItem);
    }
  }

  
  return (
    <>
    {isSuccess && (
      <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 flex flex-col lg:flex-row">
        <div className="min-w-[60%] bg-banner-1">
          {/* <SliderProduct props={"imageValue"} data={detail.product_images} /> */}
        </div>
        <div className="mx-8">
          {/* <ItemHeading /> */}
          <div className=" h-[60px] border-b border-b-white-800 h-fit">
            <h2 className="font-semibold text-4xl whitespace-wrap uppercase">
              {data.name}
            </h2>
          </div>
          <div className="py-5 flex text-2xl font-bold text-hoverColor">
            <span>{formatVND(data.unitPrice)}</span>
          </div>
          <div>
            <div className="text-left border-b border-b-white-800 pb-3 line-clamp-6 overflow-auto">
              <span>{data.description}</span>
            </div>
            <div>
              {/* <h3 className="py-3 text-2xl flex uppercase">
                Thông tin sản phẩm
              </h3>
         
              <ul className="text-left list-disc ml-6">
                <li>Thiết kế sang trọng</li>
                <li>Vỏ hợp kim rắn chắc</li>
                <li>Camera siêu mượt</li>
                <li>Nhiều ngăn nhỏ tiện lợi phía trong balo</li>
              </ul> */}
            </div>
          </div>
          {/* <AddBTn /> */}
          <div className="flex py-4 space-x-4">
            <div className="relative">
              <div className="text-center left-0 pt-2 right-0 absolute block text-xs uppercase text-gray-400 tracking-wide font-semibold">
                Qty
              </div>

              <div>
                <input
                  className="cursor-pointer appearance-none rounded-xl border border-gray-200 pl-4 pr-8 h-14 flex items-end pb-1"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleAddToCart()}
              className="h-14 px-6 py-2 font-semibold rounded-xl bg-primary-1 text-white hover:text-black hover:bg-white border hover:border-primary-1"
            >
              Thêm sản phẩm
            </button>
          </div>
        </div>
      </div>
      <div className="px-4 sm:px-6 lg:px-14 mt-6 mx-auto">
        <span className="font-semibold text-4xl whitespace-wrap uppercase my-8">
          Bình Luận
        </span>

        <div className="flex items-center gap-7 my-7 mr-4">
        
          {/* <img
            src="https://images.unsplash.com/photo-1507965613665-5fbb4cbb8399?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDQzfHRvd0paRnNrcEdnfHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
            alt=""
            className="h-[60px] w-[60px] object-fill rounded-full"
          /> */}
    
          <SearchBar className="max-w-[320px]" area label="Nhập bình luận về sản phẩm"/>
          <button className="w-[60px] h-[60px] bg-primary border border-primary-1 hover:bg-white flex items-center justify-center rounded-lg">
            <IoIosSend className="text-2xl"/>
          </button>
        </div>
        <Comments />
      </div>
    </div>
    )}
    </>
  );
}
