import React, { useEffect, useState, memo } from "react";
import { toast } from "react-toastify";
import { Input, Textarea, Button } from "@material-tailwind/react";

import Modal from "components/modal/modal";
import { useUpdateWarehouseMutation } from "redux/api/warehouse/warehouse";
import { IWarehouse, IWarehouseInput } from "share/types/warehouse";

function ModalUpdateWarehouse({
  onToggle,
  data,
}: {
  onToggle: () => void;
  data: IWarehouse;
}) {
  const [update, result] = useUpdateWarehouseMutation();
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [dataForm, setDataForm] = useState<IWarehouseInput>({
    ...data,
    warehouseType: data.type,
  });

  useEffect(() => {
    if (result.isSuccess) {
      onToggle();
      toast.success("Chỉnh sửa thành công");
    }
    if (
      dataForm.description !== data.description ||
      dataForm.name !== data.name ||
      dataForm.address !== data.address ||
      dataForm.email !== data.email ||
      dataForm.fax !== data.fax ||
      dataForm.warehouseType !== data.type ||
      dataForm.hotLine !== data.hotLine
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

    if (
      dataForm.name.trim().length &&
      dataForm.description.trim().length &&
      dataForm.address.trim().length &&
      dataForm.hotLine.trim().length &&
      dataForm.fax.trim().length &&
      dataForm.warehouseType.trim().length &&
      dataForm.email.trim().length
    ) {
      update(dataForm);
    } else {
      toast.error("Thông tin không hợp lệ");
    }
  };
  return (
    <Modal onClose={onToggle}>
      <form
        onSubmit={handleSubmit}
        className="flex justify-between gap-4 flex-col"
      >
        <header className="text-xl my-2 font-bold ">
          Chỉnh sửa thông tin kho
        </header>
        <div className="flex flex-col gap-4 w-full">
          <Input
            name="name"
            onChange={handleChange}
            value={dataForm.name}
            crossOrigin={"use-credentials"}
            variant="outlined"
            label="Tên kho"
          />
          <Input
            name="address"
            onChange={handleChange}
            value={dataForm.address}
            crossOrigin={"use-credentials"}
            variant="outlined"
            label="Địa chỉ"
          />
          <Input
            name="email"
            onChange={handleChange}
            value={dataForm.email}
            crossOrigin={"use-credentials"}
            variant="outlined"
            label="Email"
          />
          <Input
            name="fax"
            onChange={handleChange}
            value={dataForm.fax}
            crossOrigin={"use-credentials"}
            variant="outlined"
            label="Fax"
          />
          <Input
            name="hotLine"
            onChange={handleChange}
            value={dataForm.hotLine}
            crossOrigin={"use-credentials"}
            variant="outlined"
            label="Hotline"
          />
          <Textarea
            name="description"
            onChange={handleChange}
            value={dataForm.description}
            label="Miêu tả miêu tả"
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

export default memo(ModalUpdateWarehouse);
