import { useEffect, useState, memo } from "react";
import { Input, Textarea, Button } from "@material-tailwind/react";

import { toast } from "react-toastify";
import Modal from "components/modal/modal";
import { useAddCategoryGroupMutation } from "redux/api/catalog/category-group";
import { ICategoryGroupInput } from "share/types/category-group";

function ModalAddCategoryGroup({ onToggle }: { onToggle: () => void }) {
  const [addCategoryGroup, { isSuccess }] = useAddCategoryGroupMutation();

  const [dataForm, setDataForm] = useState<ICategoryGroupInput>({
    name: "",
    description: "",
  });
  useEffect(() => {
    if (isSuccess) {
      onToggle();
      toast.success("Thêm thành công");
    }
  }, [isSuccess]);
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
      dataForm.description.trim().length === 0
    ) {
      toast.error("Thông tin không hợp lệ");
    } else {
      addCategoryGroup(dataForm);
    }
  };
  return (
    <Modal onClose={onToggle}>
      <form
        onSubmit={handleSubmit}
        className="flex justify-between gap-4 flex-col"
      >
        <header className="text-xl my-2 font-bold ">Thêm nhóm danh mục</header>
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
        <div className="flex justify-end my-4">
          <Button type="submit">Thêm nhóm danh mục</Button>
        </div>
      </form>
    </Modal>
  );
}

export default memo(ModalAddCategoryGroup);
