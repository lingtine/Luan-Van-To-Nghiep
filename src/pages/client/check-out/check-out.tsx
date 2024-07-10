import React from "react";

import { useGetDetailCartQuery } from "redux/api/cart/cart";
import { useState } from "react";
import CustomerInfo from "./components/customer-info";
import { useAppSelector } from "redux/store";
import { ICustomerDetail } from "redux/api/types";

import TableProducts from "./components/table-products";
import CouponSelectBox from "./components/coupon-select-box";
import TableSummary from "./components/table-summary";
import { ICoupon } from "share/types/coupon";
import { ISelected } from "components/select-box/select-box";
interface ICouponInput extends ICoupon, ISelected {}

interface CheckOutPageProps {}

const CheckOutPage: React.FC<CheckOutPageProps> = () => {
  const [selected, setSelected] = useState<ICouponInput>();
  const { user } = useAppSelector((state) => state.userSlice) as {
    user: ICustomerDetail;
  };
  const { data, isSuccess, refetch } = useGetDetailCartQuery();

  let content;

  if (isSuccess) {
    const { items } = data;

    content = (
      <>
        <TableProducts products={items} />
        <TableSummary coupon={selected} products={items} />
      </>
    );
  }
  return (
    <div className="container flex flex-wrap-reverse lg:flex-wrap my-8 ">
      <div className=" flex-[0_0_100%] max-w-[100%] lg:flex-[0_0_50%] lg:max-w-[50%]">
        <CustomerInfo fn={refetch} user={user} coupon={selected} />
      </div>

      <div className=" flex-[0_0_100%] max-w-[100%] lg:flex-[0_0_50%] lg:max-w-[50%]">
        <div className="flex flex-col gap-4 w-full px-6">
          <div>
            <h2 className="text-2xl mt-5 mb-[15px] font-semibold">Giỏ hàng</h2>
          </div>
          <CouponSelectBox coupon={selected} setCoupon={setSelected} />
          {content}
        </div>
      </div>
    </div>
  );
};

export default CheckOutPage;
