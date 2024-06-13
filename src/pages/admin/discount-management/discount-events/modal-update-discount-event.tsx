import React, { useEffect, useState, memo } from "react";
import Modal from "components/modal/modal";
import { toast } from "react-toastify";
import { Input, Textarea, Button } from "@material-tailwind/react";

import { useUpdateDiscountEventMutation } from "redux/api/discount/discount-event";
import {
  IDiscountEvent,
  IDiscountEventInput,
} from "share/types/discount-event";

function ModalUpdateCoupon({
  onToggle,
  data,
}: {
  onToggle: () => void;
  data: IDiscountEvent;
}) {
  const [update, result] = useUpdateDiscountEventMutation();

  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [dataForm, setDataForm] = useState<IDiscountEventInput>({
    ...data,
  });

  useEffect(() => {
    if (result.isSuccess) {
      onToggle();
      toast.success("Chỉnh sửa thành công");
    }
    if (
      dataForm.description !== data.description ||
      dataForm.name !== data.name
    ) {
      setIsUpdate(true);
    } else {
      setIsUpdate(false);
    }
  }, [result.isSuccess, dataForm, onToggle, data]);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setDataForm(() => ({
      ...dataForm,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (dataForm.name.trim().length === 0) {
      toast.error("Thông tin không hợp lệ");
    } else {
      update(dataForm);
    }
  };
  return (
    <Modal onClose={onToggle}>
      <form
        onSubmit={handleSubmit}
        className="flex justify-between gap-4 flex-col"
      >
        <header className="text-xl my-2 font-bold ">
          Chỉnh sửa sự kiện giảm giá
        </header>
        <div className="flex flex-col gap-4 w-full">
          <Input
            name="name"
            onChange={handleChange}
            value={dataForm.name}
            crossOrigin={"use-credentials"}
            variant="outlined"
            label="Tên sự kiện giảm giá"
          />

          <Textarea
            name="description"
            onChange={handleChange}
            value={dataForm.description}
            label="Miêu tả sự kiện giảm giá"
          />
        </div>
        <div className="flex justify-end my-4 gap-4">
          <Button
            color="red"
            onClick={() => {
              onToggle();
            }}
          >
            Huỷ
          </Button>
          <Button type="submit" disabled={!isUpdate}>
            Chỉnh sửa
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default memo(ModalUpdateCoupon);
