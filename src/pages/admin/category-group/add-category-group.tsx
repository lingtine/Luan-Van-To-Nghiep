import React from "react";
import { Button, Input, Textarea } from "@material-tailwind/react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import UploadImage from "components/upload-image/upload-image";
import { Link } from "react-router-dom";

interface AddCategoryGroupProps {}

const AddCategoryGroup: React.FC<AddCategoryGroupProps> = () => {
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
          <h4 className="text-xl font-bold">Thêm Nhóm Danh Mục</h4>
        </div>
      </div>

      <form className="flex justify-between gap-4">
        <section className="flex-[0_0_30%]">
          <UploadImage />
        </section>
        <section className=" flex-[0_0_70%]">
          <header className="text-2xl my-4 font-bold ">
            Thông tin nhóm danh mục
          </header>
          <div className="flex flex-col gap-4">
            <Input
              crossOrigin={true}
              variant="outlined"
              label="Tên nhóm danh mục"
            />
            <Textarea label="Miêu tả nhóm danh mục" />
          </div>
          <div className="flex justify-end my-4">
            <Button>Thêm nhóm danh mục</Button>
          </div>
        </section>
      </form>
    </div>
  );
};

export default AddCategoryGroup;
