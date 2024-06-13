import { useState, useEffect } from "react";

import Table from "components/table/table";
import { useRemoveCouponMutation } from "redux/api/discount/coupon";
import { ICouponTable, ICoupon } from "share/types/coupon";
import { IconButton } from "@material-tailwind/react";
import { MdDelete, MdEdit } from "react-icons/md";
import {
  IContentConfirm,
  ConfirmDialog,
} from "components/confirm-dialog/confirm-dialog";
import { toast } from "react-toastify";
import ModalUpdateCoupon from "./modal-update-coupon";

interface ITable {
  data: ICouponTable[];
}

function CouponTable({ data }: ITable) {
  const [remove, resultRemove] = useRemoveCouponMutation();
  const [couponRemove, setCouponRemove] = useState<IContentConfirm>();
  const [couponUpdate, setCouponUpdate] = useState<ICoupon>();
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
      label: "Miêu tả ",
      render: (data: ICouponTable) => {
        return data.description;
      },
    },
    {
      label: "Tuỳ chọn",
      render: (data: ICouponTable) => {
        return (
          <div className="flex gap-4 justify-end">
            <IconButton
              onClick={() => {
                handleCouponRemove({
                  id: data.id,
                  title: `Bạn có muốn xoá phiếu giảm giá ${data.name}`,
                  content:
                    "Thao tác này sẽ xóa bản ghi. Một khi đã xóa thì không thể khôi phục lại.",
                });
              }}
              color="red"
            >
              <MdDelete />
            </IconButton>
            <IconButton
              onClick={() => {
                handleToggleUpdate(data);
              }}
            >
              <MdEdit />
            </IconButton>
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    if (resultRemove.isSuccess) {
      toast.success("Xoá thành công");
    }
  }, [resultRemove]);

  const handleToggleUpdate = (data?: ICoupon) => {
    setCouponUpdate(data);
  };
  const handleCouponRemove = (data?: IContentConfirm) => {
    setCouponRemove(data);
  };

  return (
    <>
      <Table config={configData} data={data}></Table>;
      <ConfirmDialog
        data={couponRemove}
        setData={handleCouponRemove}
        handleConfirm={() => {
          if (couponRemove) {
            remove(couponRemove.id);
            handleCouponRemove();
          }
        }}
      />
      {couponUpdate && (
        <ModalUpdateCoupon data={couponUpdate} onToggle={handleToggleUpdate} />
      )}
    </>
  );
}

export default CouponTable;
