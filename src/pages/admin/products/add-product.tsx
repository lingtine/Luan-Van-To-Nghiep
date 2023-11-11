import React from "react";
import { Button, Input, Textarea } from "@material-tailwind/react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import UploadImage from "components/upload-image/upload-image";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useGetCategoriesByParametersMutation } from "redux/api/catalog/category";
import { useGetAllCategoryGroupsQuery } from "redux/api/catalog/category-group";
import SelectBox, { ISelected } from "components/select-box/select-box";

import { IProductType } from "redux/api/types";
interface AddProductProps {}

const AddProduct: React.FC<AddProductProps> = () => {
  const [getCategories, { isSuccess: getCategorySuccess, data: categoryData }] =
    useGetCategoriesByParametersMutation();
  const { data: categoryGroupData, isSuccess: getCategoryGroupSuccess } =
    useGetAllCategoryGroupsQuery(null);

  const [dataForm, setDataForm] = useState<IProductType>({
    name: "",
    description: "",
    image: new DataTransfer().files[0],
    unitPrice: 0,
    brandId: "",
    categoryId: "",
  });
  const [categoryGroupSelected, setCategoryGroupSelected] =
    useState<ISelected>();
  const [categorySelected, setCategorySelected] = useState<ISelected>();

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setDataForm(() => {
      return { ...dataForm, [name]: value };
    });
  };

  const handleChangeImage = (image: File) => {
    setDataForm(() => {
      return { ...dataForm, image };
    });
  };

  let content: React.ReactNode;
  let contentCategory: React.ReactNode;
  if (getCategoryGroupSuccess) {
    const updateData = categoryGroupData.map((item) => ({
      ...item,
      label: item.name,
    }));

    content = (
      <SelectBox
        label="Chọn Nhóm Danh Mục"
        onChange={(option: ISelected) => {
          getCategories(option.id);
          setCategoryGroupSelected(option);
        }}
        options={updateData}
        selected={categoryGroupSelected}
      />
    );
  }

  if (getCategorySuccess && categoryData) {
    console.log(categoryData);
    const updateData = categoryData.map((item) => ({
      ...item,
      label: item.name,
    }));
    contentCategory = (
      <SelectBox
        label="Chọn Danh Mục"
        onChange={(option: ISelected) => {
          setCategorySelected(option);
        }}
        options={updateData}
        selected={categorySelected}
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
          <h4 className="text-xl font-bold">Thêm sản phẩm</h4>
        </div>
      </div>

      <form className="flex justify-between gap-4">
        <section className="flex-[0_0_30%]">
          <UploadImage onChange={handleChangeImage} />
        </section>
        <section className=" flex-[0_0_70%]">
          <header className="text-2xl my-4 font-bold ">
            Thông tin sản phẩm
          </header>
          <div className="flex flex-col gap-4">
            <Input
              onChange={handleChange}
              name="name"
              value={dataForm?.name}
              crossOrigin={true}
              variant="outlined"
              label="Tên sản phẩm"
            />
            <Input
              onChange={handleChange}
              name="unitPrice"
              type="number"
              value={dataForm?.unitPrice}
              crossOrigin={true}
              variant="outlined"
              label="Giá sản phẩm"
            />

            {content}

            {contentCategory}
            <Textarea
              onChange={handleChange}
              name="description"
              value={dataForm?.description}
              label="Miêu tả sản phẩm"
            />
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
