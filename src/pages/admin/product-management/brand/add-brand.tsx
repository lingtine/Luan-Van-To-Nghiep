import React from "react";
import { Button, Input, Textarea } from "@material-tailwind/react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import UploadImage from "components/upload-image/upload-image";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAddBrandMutation } from "redux/api/catalog/brand";
import { toast } from "react-toastify";
import { IBrand } from "redux/api/types";
import { useNavigate } from "react-router-dom";

interface AddBrandProps {}

const AddBrand: React.FC<AddBrandProps> = () => {
  const [addBrand, { isSuccess }] = useAddBrandMutation();
  const [dataForm, setDataForm] = useState<IBrand>({
    id: "",
    name: "",
    description: "",
    image: new DataTransfer().files[0],
  });
  const navigate = useNavigate();
  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setDataForm(() => ({ ...dataForm, [name]: value }));
  };

  const handleChangeImage = (image: File) => {
    setDataForm(() => ({ ...dataForm, image }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      dataForm.description.trim().length === 0 ||
      dataForm.name.trim().length === 0 ||
      !dataForm.image
    ) {
      toast.error("Thông Tin không chính xác");
    } else {
      addBrand(dataForm);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Tạo thành công");
      navigate("/admin/brand");
    }
  }, [isSuccess]);

  return (
    <div className="px-8">
      <div className="flex gap-4 border-y py-3  items-center">
        <Link to={"/admin/brand"}>
          <Button variant="text" className="text-lg">
            <AiOutlineArrowLeft />
          </Button>
        </Link>
        <div>
          <p className="text-sm">Trở về</p>
          <h4 className="text-xl font-bold">Thêm Thương hiệu</h4>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex justify-between gap-4">
        <section className="flex-[0_0_30%]">
          <UploadImage onChange={handleChangeImage} />
        </section>
        <section className=" flex-[0_0_70%]">
          <header className="text-2xl my-4 font-bold ">
            Thông tin thương hiệu
          </header>
          <div className="flex flex-col gap-4">
            <Input
              onChange={handleChange}
              value={dataForm.name}
              name="name"
              crossOrigin={"use-credentials"}
              variant="outlined"
              label="Tên thương hiệu"
            />

            <Textarea
              onChange={handleChange}
              name="description"
              value={dataForm.description}
              label="Miêu tả thương hiệu"
            />
          </div>
          <div className="flex justify-end my-4">
            <Button type="submit">Thêm Thương Hiệu</Button>
          </div>
        </section>
      </form>
    </div>
  );
};

export default AddBrand;
