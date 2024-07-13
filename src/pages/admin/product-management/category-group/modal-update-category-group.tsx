import { useEffect, useState, memo } from "react";
import Modal from "components/modal/modal";
import { toast } from "react-toastify";
import { Input, Textarea } from "@material-tailwind/react";

import {
  ICategoryGroup,
  ICategoryGroupInput,
} from "share/types/category-group";
import { useUpdateCategoryGroupMutation } from "redux/api/catalog/category-group";
import { Button } from "@mui/material";
function ModalUpdateCategoryGroup({
  onToggle,
  categoryGroup,
}: {
  onToggle: () => void;
  categoryGroup: ICategoryGroup;
}) {
  const [update, result] = useUpdateCategoryGroupMutation();
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [dataForm, setDataForm] = useState<ICategoryGroupInput>({
    ...categoryGroup,
  });

  useEffect(() => {
    if (result.isSuccess) {
      onToggle();
      toast.success("Chỉnh sửa thành công");
    }
    if (
      dataForm.description !== categoryGroup.description ||
      dataForm.name !== categoryGroup.name
    ) {
      setIsUpdate(true);
    } else {
      setIsUpdate(false);
    }
  }, [result.isSuccess, dataForm]);
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
          Chỉnh sửa nhóm danh mục
        </header>
        <div className="flex flex-col gap-4 w-full">
          <Input
            name="name"
            onChange={handleChange}
            value={dataForm.name}
            crossOrigin={"use-credentials"}
            variant="outlined"
            label="Tên nhóm danh mục"
          />
          <Textarea
            name="description"
            onChange={handleChange}
            value={dataForm.description}
            label="Miêu tả nhóm danh mục"
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
          <Button
            variant="contained"
            type="submit"
            disabled={!isUpdate}
          >
            Lưu
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default memo(ModalUpdateCategoryGroup);
