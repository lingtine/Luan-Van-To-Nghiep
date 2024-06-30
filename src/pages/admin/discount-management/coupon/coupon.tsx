import React, { useState } from "react";
import { Button, Spinner } from "@material-tailwind/react";
import { useParams } from "react-router-dom";
import { AiOutlinePlusCircle } from "react-icons/ai";

import { useGetCouponsQuery } from "redux/api/discount/coupon";
import Pagination from "components/pagination/pagitnation";
import { ICouponTable } from "share/types/coupon";
import CouponTable from "./coupon-table";
import ModalAddCoupon from "./modal-add-coupon";

const Coupon = () => {
  const { index } = useParams();
  const [isAddNew, setIsAddNew] = useState(false);

  const { data, isSuccess, isLoading } = useGetCouponsQuery({
    PageIndex: index,
  });

  const handleToggleAddNew = () => {
    setIsAddNew(!isAddNew);
  };

  let content: React.ReactNode;

  if (isSuccess) {
    const { pageSize, pageIndex } = data;

    const updateData: ICouponTable[] = data.data.map((item, index) => ({
      ...item,
      index: index + 1 + pageIndex * pageSize,
    }));
    content = (
      <>
        <CouponTable data={updateData} />
        <div className="flex justify-center my-8">
          <Pagination
            pageIndex={data.pageIndex}
            pageSize={data.pageSize}
            totalCount={data.totalCount}
            url="/admin/coupons"
          />
        </div>
      </>
    );
  } else if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[100vh]">
        <Spinner className="h-12 w-12" />
      </div>
    );
  }

  return (
    <div className="px-4 ">
      <div className="flex justify-end my-4">
        <Button
          onClick={() => setIsAddNew(true)}
          className="flex gap-2 items-center"
        >
          <AiOutlinePlusCircle />
          Thêm phiểu giảm giá
        </Button>
      </div>
      {content}
      {isAddNew && <ModalAddCoupon onToggle={handleToggleAddNew} />}
    </div>
  );
};

export default Coupon;
