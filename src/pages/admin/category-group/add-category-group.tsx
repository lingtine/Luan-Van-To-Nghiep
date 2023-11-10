import React from "react";
import { Button, Input, Textarea } from "@material-tailwind/react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useAddCategoryGroupMutation } from "redux/api/catalog/category-group";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

interface IDataForm {
  name: string;
  description: string;
}

interface AddCategoryGroupProps {}

const AddCategoryGroup: React.FC<AddCategoryGroupProps> = () => {
  const navigate = useNavigate();
  const [addCategoryGroup, { isSuccess }] = useAddCategoryGroupMutation();
  const [dataForm, setDataForm] = useState<IDataForm>({
    name: "",
    description: "",
  });

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

  useEffect(() => {
    if (isSuccess) {
      navigate("/admin/category-group");
      toast.success("Thêm thành công");
    }
  }, [isSuccess]);

  return (
    <div className="px-8">
      <div className="flex gap-4 border-y py-3  items-center">
        <Link to={"/admin/category-group"}>
          <Button variant="text" className="text-lg">
            <AiOutlineArrowLeft />
          </Button>
        </Link>
        <div>
          <p className="text-sm">Trở về</p>
          <h4 className="text-xl font-bold">Thêm Nhóm Danh Mục</h4>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex justify-between gap-4">
        <section className=" flex-[0_0_50%]">
          <header className="text-2xl my-4 font-bold ">
            Thông tin nhóm danh mục
          </header>
          <div className="flex flex-col gap-4">
            <Input
              name="name"
              onChange={handleChange}
              value={dataForm.name}
              crossOrigin={true}
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
        </section>
      </form>
    </div>
  );
};

export default AddCategoryGroup;
