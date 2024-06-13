import { useEffect, useState, memo } from "react";
import { Input, Textarea, Button } from "@material-tailwind/react";

import { toast } from "react-toastify";
import Modal from "components/modal/modal";
import { useGetAllCategoryGroupsQuery } from "redux/api/catalog/category-group";
import { useAddCategoryMutation } from "redux/api/catalog/category";
import { ICategoryInput } from "share/types/category";
import { ISelected } from "components/select-box/select-box";
import SelectBox from "components/select-box/select-box";

function ModalAddCategory({ onToggle }: { onToggle: () => void }) {
  const [addCategory, result] = useAddCategoryMutation();
  const [selected, setSelected] = useState<ISelected>();
  const { data, isSuccess } = useGetAllCategoryGroupsQuery();

  const [dataForm, setDataForm] = useState<ICategoryInput>({
    categoryGroupId: "",
    description: "",
    name: "",
  });
  useEffect(() => {
    if (result.isSuccess) {
      onToggle();
      toast.success("Thêm thành công");
    }
  }, [result, onToggle]);

  const handleSelect = (option: ISelected) => {
    setSelected(option);
    setDataForm(() => ({ ...dataForm, categoryGroupId: option.id }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setDataForm(() => ({
      ...dataForm,
      [name]: value,
    }));
  };

  let content;
  if (isSuccess) {
    const updateData = data.map((item) => ({ ...item, label: item.name }));

    content = (
      <SelectBox
        onChange={handleSelect}
        options={updateData}
        selected={selected}
        label="Chọn Nhóm Danh Mục"
      />
    );
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      dataForm.name.trim().length === 0 ||
      dataForm.description.trim().length === 0 ||
      dataForm.categoryGroupId.trim().length === 0
    ) {
      toast.error("Thông tin không hợp lệ");
    } else {
      addCategory(dataForm);
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
        {content}
        <div className="flex justify-end my-4">
          <Button type="submit">Thêm nhóm danh mục</Button>
        </div>
      </form>
    </Modal>
  );
}

export default memo(ModalAddCategory);
