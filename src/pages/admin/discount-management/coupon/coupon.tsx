import React from "react";
import Table from "components/table/table";
import { Button, Spinner } from "@material-tailwind/react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Pagination from "components/pagination/pagitnation";
import { Link } from "react-router-dom";
import { useEffect } from "react";

import { toast } from "react-toastify";
import {
  useGetCouponsQuery,
  useRemoveCouponMutation,
} from "redux/api/discount/coupon";
import { useParams } from "react-router-dom";
import { ICoupon } from "redux/api/types";
interface ICouponTable extends ICoupon {
  index: number;
}

const Coupon = () => {
  const { index } = useParams();

  const { data, isSuccess, isLoading } = useGetCouponsQuery({
    pageIndex: index,
  });
  const [removeCoupon, { isSuccess: removeSuccess }] =
    useRemoveCouponMutation();

  const configData = [
    {
      label: "STT",
      render: (data: ICouponTable) => {
        return data.index;
      },
    },
    {
      label: "Tên phiếu giảm giá",
      render: (data: ICouponTable) => {
        return data.name;
      },
    },

    {
      label: "Số lượng",
      render: (data: ICouponTable) => {
        return data.quantity;
      },
    },
    {
      label: "Giá được giảm",
      render: (data: ICouponTable) => {
        return data.reducedPrice;
      },
    },
    {
      label: "Miêu tả phiếu giảm giá",
      render: (data: ICouponTable) => {
        return data.description;
      },
    },
    {
      label: "Tuỳ chọn",
      render: (data: ICouponTable) => {
        return (
          <div className="flex gap-4 justify-end">
            <Button
              onClick={() => {
                removeCoupon(data.id);
              }}
              color="red"
            >
              Xoá
            </Button>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    if (removeSuccess) {
      toast.success("Xoá thành công");
    }
  }, [removeSuccess]);

  let content: React.ReactNode;

  if (isSuccess) {
    const { pageSize, pageIndex } = data;

    const updateData: ICouponTable[] = data.data.map((item, index) => ({
      ...item,
      index: index + 1 + pageIndex * pageSize,
    }));
    content = (
      <>
        <Table config={configData} data={updateData}></Table>
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
        <Link to="/admin/coupons/add-coupon">
          <Button className="flex gap-2 items-center">
            <AiOutlinePlusCircle />
            Thêm phiểu giảm giá
          </Button>
        </Link>
      </div>
      {content}
    </div>
  );
};

export default Coupon;
