import React, { useEffect, useState, memo } from "react";
import Modal from "components/modal/modal";
import { toast } from "react-toastify";
import { Input, Textarea } from "@material-tailwind/react";
import { ISupplier, ISupplierInput } from "share/types/supplier";
import { useUpdateSupplierMutation } from "redux/api/warehouse/supplier";
import { Button } from "@mui/material";
function ModalUpdateSupplier({
  onToggle,
  data,
}: {
  onToggle: () => void;
  data: ISupplier;
}) {
  const [update, result] = useUpdateSupplierMutation();
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [dataForm, setDataForm] = useState<ISupplierInput>({
    ...data,
  });

  useEffect(() => {
    if (result.isSuccess) {
      onToggle();
      toast.success("Chỉnh sửa thành công");
    }
    if (
      dataForm.name !== data.name ||
      dataForm.address !== data.address ||
      dataForm.description !== data.description ||
      dataForm.email !== data.email ||
      dataForm.phoneNumber !== data.phoneNumber
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
      dataForm.name.trim().length === 0 ||
      dataForm.address.trim().length === 0 ||
      dataForm.description.trim().length === 0 ||
      dataForm.email.trim().length === 0 ||
      dataForm.phoneNumber.trim().length === 0
    ) {
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
          Chỉnh sửa nhà cung cấp
        </header>
        <div className="flex flex-col gap-4 w-full">
          <Input
            name="name"
            onChange={handleChange}
            value={dataForm.name}
            crossOrigin={"use-credentials"}
            variant="outlined"
            label="Tên nhà cung cấp"
          />
          <Input
            name="address"
            onChange={handleChange}
            value={dataForm.address}
            crossOrigin={"use-credentials"}
            variant="outlined"
            label="Tên địa chỉ"
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
            name="phoneNumber"
            onChange={handleChange}
            value={dataForm.phoneNumber}
            crossOrigin={"use-credentials"}
            variant="outlined"
            label="Số điện thoại"
          />

          <Textarea
            name="description"
            onChange={handleChange}
            value={dataForm.description}
            label="Miêu tả "
          />
        </div>
        <div className="flex justify-end my-4 gap-4">
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              onToggle();
            }}
          >
            Huỷ
          </Button>
          <Button variant="contained" type="submit" disabled={!isUpdate}>
            Lưu
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default memo(ModalUpdateSupplier);
