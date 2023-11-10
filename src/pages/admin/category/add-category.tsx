import React from "react";
import { Button, Input, Textarea } from "@material-tailwind/react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useGetAllCategoryGroupsQuery } from "redux/api/catalog/category-group";
import SelectBox from "components/select-box/select-box";
import { ISelected } from "components/select-box/select-box";
import { useAddCategoryMutation } from "redux/api/catalog/category";
import { useNavigate } from "react-router-dom";

interface IDataForm {
  name: string;
  description: string;
}

interface AddCategoryProps {}

const AddCategory: React.FC<AddCategoryProps> = () => {
  const navigate = useNavigate();

  const { data, isSuccess } = useGetAllCategoryGroupsQuery(null);
  const [addCategory, { isSuccess: addSuccess }] = useAddCategoryMutation();

  const [selected, setSelected] = useState<ISelected>();
  const [dataForm, setDataForm] = useState<IDataForm>({
    name: "",
    description: "",
  });

  useEffect(() => {
    if (addSuccess) {
      navigate("/admin/category");
      toast.success("Tạo thành công");
    }
  }, [addSuccess]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      dataForm.name.trim().length === 0 ||
      dataForm.description.trim().length === 0 ||
      !selected
    ) {
      toast.error("Thông tin không hơn lệ");
    } else {
      addCategory({ ...dataForm, categoryGroupId: selected.id });
    }

    console.log({ ...dataForm, categoryGroupId: selected?.id });
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setDataForm(() => ({ ...dataForm, [name]: value }));
  };
  const handleSelect = (option: ISelected) => {
    setSelected(option);
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
  return (
    <div className="px-8">
      <div className="flex gap-4 border-y py-3  items-center">
        <Link to={"/admin/products"}>
          <Button variant="text" className="text-lg">
            <AiOutlineArrowLeft />
          </Button>
        </Link>
        <div>
          <p className="text-sm">Trở về</p>
          <h4 className="text-xl font-bold">Thêm danh mục</h4>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex justify-between gap-4">
        <section className=" flex-[0_0_70%]">
          <header className="text-2xl my-4 font-bold ">
            Thông tin thương hiệu
          </header>
          <div className="flex flex-col gap-4">
            <Input
              onChange={handleChange}
              name="name"
              value={dataForm.name}
              crossOrigin={true}
              variant="outlined"
              label="Tên Danh Mục"
            />
            {content}
            <Textarea
              onChange={handleChange}
              name="description"
              value={dataForm.description}
              label="Miêu tả Danh Mục"
            />
          </div>
          <div className="flex justify-end my-4">
            <Button type="submit">Thêm Danh Mục</Button>
          </div>
        </section>
      </form>
    </div>
  );
};

export default AddCategory;
