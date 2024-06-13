import { useState, useEffect } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { toast } from "react-toastify";
import { IconButton } from "@material-tailwind/react";

import Table from "components/table/table";
import { useRemoveCouponMutation } from "redux/api/discount/coupon";
import {
  IContentConfirm,
  ConfirmDialog,
} from "components/confirm-dialog/confirm-dialog";
import ModalUpdateDiscountEvent from "./modal-update-discount-event";
import {
  IDiscountEvent,
  IDiscountEventTable,
} from "share/types/discount-event";

interface ITable {
  data: IDiscountEventTable[];
}

function DiscountEventTable({ data }: ITable) {
  const [remove, resultRemove] = useRemoveCouponMutation();
  const [couponRemove, setCouponRemove] = useState<IContentConfirm>();
  const [couponUpdate, setCouponUpdate] = useState<IDiscountEvent>();
  const configData = [
    {
      label: "STT",
      render: (data: IDiscountEventTable) => {
        return data.index;
      },
    },
    {
      label: "Tên sự kiện ",
      render: (data: IDiscountEventTable) => {
        return data.name;
      },
    },

    {
      label: "Miêu tả sự kiện",
      render: (data: IDiscountEventTable) => {
        return data.description;
      },
    },
    {
      label: "Tuỳ chọn",
      render: (data: IDiscountEventTable) => {
        return (
          <div className="flex gap-4 justify-end">
            <IconButton
              onClick={() => {
                handleCouponRemove({
                  id: data.id,
                  title: `Bạn có muốn xoá sự kiện ${data.name}`,
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

  const handleToggleUpdate = (data?: IDiscountEvent) => {
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
        <ModalUpdateDiscountEvent
          data={couponUpdate}
          onToggle={handleToggleUpdate}
        />
      )}
    </>
  );
}

export default DiscountEventTable;
