import React, { useEffect, useState, memo } from "react";
import { toast } from "react-toastify";
import { Input, Textarea, Button } from "@material-tailwind/react";

import Modal from "components/modal/modal";
import { ISpecification, ISpecificationInput } from "share/types/specification";
import { useUpdateSpecificationMutation } from "redux/api/catalog/specification";

function ModalUpdateSpecification({
  onToggle,
  data,
}: {
  onToggle: () => void;
  data: ISpecification;
}) {
  const [update, result] = useUpdateSpecificationMutation();
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [dataForm, setDataForm] = useState<ISpecificationInput>({
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
        <header className="text-xl my-2 font-bold ">Chỉnh sửa đặt tả</header>
        <div className="flex flex-col gap-4 w-full">
          <Input
            name="name"
            onChange={handleChange}
            value={dataForm.name}
            crossOrigin={"use-credentials"}
            variant="outlined"
            label="Tên đặt tả"
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

export default memo(ModalUpdateSpecification);
