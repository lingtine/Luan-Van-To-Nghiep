import React, { useState } from "react";

import { useGetDetailCartQuery } from "redux/api/cart/cart";

import { useGetCouponsQuery } from "redux/api/discount/coupon";
import SelectBox, { ISelected } from "components/select-box/select-box";
import { IProductInOrder } from "redux/api/types";
import { useGetCustomerDetailQuery } from "redux/api/auth/customer-api";
import CustomerInfo from "./components/customer-info";
import { useFormatPrice } from "hooks/use-format-price";
import { ICoupon } from "share/types/coupon";

interface ICouponInput extends ICoupon, ISelected {}

const Cart: React.FC = () => {
  const [formPrice] = useFormatPrice();

  const { data: dataUser } = useGetCustomerDetailQuery();

  const { data: dataCoupon, isSuccess: getCouponSuccess } = useGetCouponsQuery(
    {}
  );
  const [selected, setSelected] = useState<ICouponInput>();

  const { data, isSuccess, refetch } = useGetDetailCartQuery();

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

  let contentTotal;

  if (isSuccess) {
    const total = data.items.reduce((total, currValue) => {
      return total + currValue.unitPrice * currValue.quantity;
    }, 0);

    contentTotal = (
      <div className="border p-4 rounded-md border-primary-1 w-full">
        <h5 className="text-lg font-semibold my-4">Tổng quan đơn hàng</h5>

        <ul className="flex flex-col gap-4 w-full">
          <li className="flex justify-between">
            <p>Tổng phụ</p>
            <p>{formPrice.format(total)}</p>
          </li>
          {selected && (
            <li className="flex justify-between">
              <p>Phiếu giảm giá</p>
              <p>{formPrice.format(selected.reducedPrice)}</p>
            </li>
          )}
        </ul>
        <div className="flex justify-between  my-4">
          <p className="text-lg font-semibold">Tổng</p>
          <p className="font-semibold">
            {selected
              ? formPrice.format(total - selected.reducedPrice)
              : formPrice.format(total)}
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="container flex flex-wrap-reverse lg:flex-wrap my-8 ">
      <div className=" flex-[0_0_100%] max-w-[100%] lg:flex-[0_0_50%] lg:max-w-[50%]">
        {dataUser && (
          <CustomerInfo fn={refetch} user={dataUser} coupon={selected} />
        )}
      </div>

      <div className=" flex-[0_0_100%] max-w-[100%] lg:flex-[0_0_50%] lg:max-w-[50%]">
        <div className="flex flex-col gap-4 w-full px-6">
          <div>
            <h2 className="text-2xl mt-5 mb-[15px] font-semibold">Giỏ hàng</h2>
          </div>
          {data &&
            (data.items.length === 0 ? (
              <div className="flex justify-center items-center ">
                Không có sản phẩm nào
              </div>
            ) : (
              data.items.map((item: IProductInOrder) => (
                <>
                  <div key={item.id} className="flex justify-between w-full">
                    <div className="flex gap-8">
                      <img
                        src={
                          "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:80/plain/https://cellphones.com.vn/media/catalog/product/t/e/text_ng_n_13__3_29.png"
                        }
                        alt={"ảnh"}
                        className="h-[64px] w-[64px] object-cover"
                      />
                      <div className="flex flex-col ">
                        <span className="text-black line-clamp-1">
                          {item.name}
                        </span>
                        <span className="text-primary-200">
                          Số lượng: {item.quantity}
                        </span>
                      </div>
                    </div>
                    <span>
                      {formPrice.format(item.unitPrice * item.quantity)}
                    </span>
                  </div>
                </>
              ))
            ))}

          <div className="flex flex-col gap-2">
            <label className="text-lg font-semibold">Mã giảm giá</label>
            {content}
          </div>

          {contentTotal}
        </div>
      </div>
    </div>
  );
};
export default Cart;
