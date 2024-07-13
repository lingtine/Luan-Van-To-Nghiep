import React, { useEffect, useState, memo } from "react";
import Modal from "components/modal/modal";
import { toast } from "react-toastify";
import { Input, Textarea, Button } from "@material-tailwind/react";
import { IBrand, IBrandInput } from "share/types/brand";
import { useUpdateBrandMutation } from "redux/api/catalog/brand";
import { Button as MUIButton } from "@mui/material";

function ModalUpdateBrand({
  onToggle,
  data,
}: {
  onToggle: () => void;
  data: IBrand;
}) {
  const [update, result] = useUpdateBrandMutation();
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [dataForm, setDataForm] = useState<IBrandInput>({
    ...data,
    image: new DataTransfer().files[0],
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
    console.log(dataForm)
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
          Chỉnh sửa thương hiệu
        </header>
        <div className="flex flex-col gap-4 w-full">
          <Input
            name="name"
            onChange={handleChange}
            value={dataForm.name}
            crossOrigin={"use-credentials"}
            variant="outlined"
            label="Tên thương hiệu"
          />
          <Textarea
            name="description"
            onChange={handleChange}
            value={dataForm.description}
            label="Miêu tả thương hiệu"
          />
        </div>
        <div className="flex justify-end my-4 gap-4">
          <MUIButton
            variant="contained"
            color="error"
            onClick={() => {
              onToggle();
            }}
          >
            Huỷ
          </MUIButton>
          <MUIButton
            variant="contained"
            type="submit"
            disabled={!isUpdate}
          >
            Lưu
          </MUIButton>
        </div>
      </form>
    </Modal>
  );
}

export default memo(ModalUpdateBrand);
