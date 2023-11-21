import React from "react";
import { Link } from "react-router-dom";

const Cart: React.FC = () => {
  const bill = {
    items: [
      {
        cart_detail_id: 1,
        product_name: "Iphone 12 promax",
        quantity: 2,
        total_price: "15.000.000đ",
      },
    ],
  };
  return (
    <div className="m-auto flex max-w-[1200px] bg-white my-7 py-7 h-screen border border-primary-1">
      <div className="px-8 flex flex-col border-r-2 h-full basis-1/2">
        <div>
          <h2 className="text-[32px] uppercase mt-5 mb-[15px]">Checkout</h2>
        </div>
        <div className="gap-6 flex-1">
          <form className="flex flex-col justify-between h-full">
            <div>
            <div className="flex flex-col text-dark-200 form-group">
              <input
                type="text"
                value="Trần Nhật Huy"
                name="name"
                className="block w-full px-1 py-1 pb-1 text-base bg-transparent bg-center bg-no-repeat border-transparent text-dark-200 focus:border-none focus:outline-none "
              />
              {/* <p className="pl-2 my-0 mb-2 text-red-500">
            {errors.email?.message}
          </p> */}
            </div>
            <div className="flex mt-[15px] text-dark-200 form-group">
              <input
                name="email"
                value="huytran@gmail.com"
                type="text"
                className="block w-full px-1 py-1 pb-1 text-base bg-transparent bg-center bg-no-repeat border-transparent text-dark-200 focus:border-none focus:outline-none "
              />
              {/* <p className="pl-2 my-0 mb-2 text-red-500">
            {errors.password?.message}
          </p> */}
              <input
                name="phone"
                value="0123456789"
                type="number"
                className="block w-full px-1 py-1 pb-1 text-base bg-transparent bg-center bg-no-repeat border-transparent text-dark-200 focus:border-none focus:outline-none "
              />
            </div>

            <div className="flex flex-col mt-[15px] text-dark-200 form-group">
              <input
                name="address"
                value="51a Cách Mạng Tháng 8"
                type="text"
                className="block w-full px-1 py-1 pb-1 text-base bg-transparent bg-center bg-no-repeat border-transparent text-dark-200 focus:border-none focus:outline-none "
              />
            </div>

            <div className="flex flex-col mt-4 gap-4">
              <div className="flex">
                <input
                  name="city"
                  value="thành phố Hồ Chí Minh"
                  type="text"
                  className="block w-full px-1 py-1 pb-1 text-base bg-transparent bg-center bg-no-repeat border-transparent text-dark-200 focus:border-none focus:outline-none "
                />
                <input
                  name="district"
                  value="Quận 1"
                  type="text"
                  className="block w-full px-1 py-1 pb-1 text-base bg-transparent bg-center bg-no-repeat border-transparent text-dark-200 focus:border-none focus:outline-none "
                />
              </div>
              {/* <ToggleButton
            type="province"
            data={province}
            setValue={setValue}
          /> */}
            </div>

            </div>
            <div className="flex gap-3 justify-between items-center">
              <Link to="/">
                <span className="text-sm text-primary-200 hover:underline cursor-pointer">
                  Tiếp tục mua hàng
                </span>
              </Link>
              <button
                type="button"
                className="h-14 px-6 py-2 font-semibold rounded-xl bg-primary-1 text-white hover:text-black hover:bg-white border hover:border-primary-1"
              >
                Thanh Toán
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="basis-1/2 px-6 flex flex-col gap-4 ">
        <div>
          <h2 className="text-[32px] uppercase mt-5 mb-[15px]">Detail</h2>
        </div>
        {!bill ? (
          <div className="flex justify-center items-center w-[200px]">
            Không có sản phẩm nào
          </div>
        ) : (
          bill.items.map((item, index) => (
            <>
              <div key={item.cart_detail_id}>
                <div key={index} className="flex justify-between">
                  <div className="flex gap-4">
                    {/* <Image
                  alt="product-img"
                  src={item.image}
                  width={64}
                  height={64}
                /> */}
                    <div className="flex flex-col">
                      <span className="text-black">{item.product_name}</span>
                      <span className="text-primary-200">
                        Quantity: {item.quantity}
                      </span>
                    </div>
                  </div>
                  <span>{item.total_price}</span>
                </div>
              </div>
            </>
          ))
        )}
        <i className="mtrl-select"></i>
        <div className="self-start w-full text-primary-200">
          <div className="flex justify-between mt-[14px]">
            <span>Bill</span>
            <span>15.000.000đ</span>
          </div>
          <div className="flex justify-between mt-[14px]">
            <span>Ship fee</span>
            <span>0đ</span>
          </div>
        </div>
        <i className="mtrl-select"></i>
        <div className="flex justify-between">
          <span className="text-base text-black">Total:</span>
          <div className="flex justify-center">
            <span className="text-primary-200 opacity-80 flex mr-2 justify-center items-center text-sm">
              VND
            </span>
            <span className="text-xl text-bold">15.000.000đ</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Cart;
