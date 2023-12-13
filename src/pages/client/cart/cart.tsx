import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useGetDetailCartQuery } from "redux/api/cart/cart";
import { formatVND } from "utils/formatVND";
import { useCreateOrderMutation } from "redux/api/order/order";
import { useGetCouponsQuery } from "redux/api/discount/coupon";
import { toast } from "react-toastify";
import SelectBox from "components/select-box/select-box";
import { ISelected } from "components/select-box/select-box";

type Inputs = {
  couponId: string;
  deliveryInfo: {
    fullName: string;
    phoneNumber: string;
    email: string;
    address: {
      city: string;
      district: string;
      ward: string;
      street: string;
      streetNumber: string;
    };
    note: string;
  };
};

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { data: dataCoupon, isSuccess: getCouponSuccess } =
    useGetCouponsQuery(null);
  const [selected, setSelected] = useState<ISelected>();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (selected) {
      createOrder({ ...data, couponId: selected.id });
    }
  };
  const { data, isSuccess } = useGetDetailCartQuery(null);
  const [createOrder, result] = useCreateOrderMutation();

  useEffect(() => {
    if (result.isSuccess) {
      toast.success("Tạo đơn hàng thành công");
      navigate("/");
    }
  }, [result]);
  let content;
  if (getCouponSuccess) {
    const options = dataCoupon.data.map((item) => ({
      ...item,
      label: item.name,
    }));

    content = (
      <SelectBox
        label=""
        selected={selected}
        onChange={setSelected}
        options={options}
      />
    );
  }

  return (
    <div className="m-auto flex max-w-[1200px] bg-white my-7 py-7 h-screen border border-primary-1">
      <div className="px-8 flex flex-col border-r-2 h-full basis-1/2">
        <div>
          <h2 className="text-[32px] uppercase mt-5 mb-[15px]">Checkout</h2>
        </div>
        <div className="gap-6 flex-1">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-between h-full"
          >
            <div>
              <div className="flex flex-col text-dark-200 form-group">
                <label>Fullname</label>
                <input
                  type="text"
                  {...register("deliveryInfo.fullName", { required: true })}
                  className="block border border-primary-1 w-full px-1 py-1 pb-1 text-base bg-transparent bg-center bg-no-repeat text-dark-200"
                />
              </div>

              <div className="flex mt-[15px] text-dark-200 form-group justify-between">
                <div>
                  <label>Email</label>
                  <input
                    type="text"
                    {...register("deliveryInfo.email", { required: true })}
                    className="block border border-primary-1 w-full px-1 py-1 pb-1 text-base bg-transparent bg-center bg-no-repeat text-dark-200"
                  />
                </div>
                <div>
                  <label>Phone number</label>
                  <input
                    type="text"
                    {...register("deliveryInfo.phoneNumber", {
                      required: true,
                    })}
                    className="block border border-primary-1 w-full px-1 py-1 pb-1 text-base bg-transparent bg-center bg-no-repeat text-dark-200"
                  />
                </div>
                <div>
                  <label>Street Number</label>
                  <input
                    type="number"
                    {...register("deliveryInfo.address.streetNumber", {
                      required: true,
                    })}
                    className="block border border-primary-1 w-full px-1 py-1 pb-1 text-base bg-transparent bg-center bg-no-repeat text-dark-200"
                  />
                </div>
              </div>

              <div className="flex flex-col mt-[15px] text-dark-200 form-group">
                <label>Street</label>
                <input
                  type="text"
                  {...register("deliveryInfo.address.street", {
                    required: true,
                  })}
                  className="block border border-primary-1 w-full px-1 py-1 pb-1 text-base bg-transparent bg-center bg-no-repeat text-dark-200"
                />
              </div>

              <div className="flex flex-col mt-[15px] text-dark-200 form-group">
                <label>Ward</label>
                <input
                  type="text"
                  {...register("deliveryInfo.address.ward", { required: true })}
                  className="block border border-primary-1 w-full px-1 py-1 pb-1 text-base bg-transparent bg-center bg-no-repeat text-dark-200"
                />
              </div>

              <div className="flex mt-4 gap-4 justify-between">
                <div>
                  <label>City</label>
                  <input
                    type="text"
                    {...register("deliveryInfo.address.city", {
                      required: true,
                    })}
                    className="block border border-primary-1 w-full px-1 py-1 pb-1 text-base bg-transparent bg-center bg-no-repeat text-dark-200"
                  />
                </div>
                <div>
                  <label>District</label>
                  <input
                    type="text"
                    {...register("deliveryInfo.address.district", {
                      required: true,
                    })}
                    className="block border border-primary-1 w-full px-1 py-1 pb-1 text-base bg-transparent bg-center bg-no-repeat text-dark-200"
                  />
                </div>
              </div>

              <div className="flex flex-col mt-[15px] text-dark-200 form-group">
                <label>Note</label>
                <textarea
                  {...register("deliveryInfo.note")}
                  className="block border border-primary-1 w-full px-1 py-1 pb-1 text-base bg-transparent bg-center bg-no-repeat text-dark-200"
                />
              </div>
            </div>

            <div className="flex gap-3 justify-between items-center">
              <Link to="/">
                <span className="text-sm text-primary-200 hover:underline cursor-pointer">
                  Tiếp tục mua hàng
                </span>
              </Link>
              <button
                type="submit"
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
        {data &&
          (data.items.length === 0 ? (
            <div className="flex justify-center items-center w-[200px]">
              Không có sản phẩm nào
            </div>
          ) : (
            data.items.map((item: any, index: number) => (
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
                      <img
                        src={
                          "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:80/plain/https://cellphones.com.vn/media/catalog/product/t/e/text_ng_n_13__3_29.png"
                        }
                        alt={"ảnh"}
                        className="h-[64px] w-[64px] object-cover"
                      />
                      <div className="flex flex-col">
                        <span className="text-black line-clamp-2">
                          {item.name}
                        </span>
                        <span className="text-primary-200">
                          Quantity: {item.quantity}
                        </span>
                      </div>
                    </div>
                    <span>{formatVND(item.unitPrice * item.quantity)}</span>
                  </div>
                </div>
              </>
            ))
          ))}
        <i className="mtrl-select"></i>

        <div className="flex flex-col mt-[15px] text-dark-200 form-group">
          <label>Coupon</label>
          {content}
        </div>
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
