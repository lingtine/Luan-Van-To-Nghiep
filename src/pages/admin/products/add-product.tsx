import React from "react";
import { Button, Input, Textarea } from "@material-tailwind/react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import UploadImage from "components/upload-image/upload-image";
import { Link } from "react-router-dom";
interface AddProductProps {}

const AddProduct: React.FC<AddProductProps> = () => {
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
          <h4 className="text-xl font-bold">Thêm sản phẩm</h4>
        </div>
      </div>

      <form className="flex justify-between gap-4">
        <section className="flex-[0_0_30%]">
          <UploadImage />
        </section>
        <section className=" flex-[0_0_70%]">
          <header className="text-2xl my-4 font-bold ">
            Thông tin sản phẩm
          </header>
          <div className="flex flex-col gap-4">
            <Input crossOrigin={true} variant="outlined" label="Tên sản phẩm" />
            <Input crossOrigin={true} variant="outlined" label="Giá sản phẩm" />

            <Textarea label="Miêu tả sản phẩm" />
          </div>
          <div className="flex justify-end my-4">
            <Button>Thêm sản phẩm</Button>
          </div>
        </section>
      </form>
    </div>
  );
};

export default AddProduct;
