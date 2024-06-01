import React from "react";
import { Button, Input, Textarea } from "@material-tailwind/react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import UploadImage from "components/upload-image/upload-image";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useGetCategoriesByParametersMutation } from "redux/api/catalog/category";
import { useGetAllCategoryGroupsQuery } from "redux/api/catalog/category-group";
import { useGetAllBrandsQuery } from "redux/api/catalog/brand";
import SelectBox, { ISelected } from "components/select-box/select-box";
import { useAddProductMutation } from "redux/api/catalog/product";
import { IProductType } from "redux/api/types";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [getCategories, { isSuccess: getCategorySuccess, data: categoryData }] =
    useGetCategoriesByParametersMutation();
  const { data: brandsData, isSuccess: getBrandsSuccess } =
    useGetAllBrandsQuery(null);
  const [addProduct, result] = useAddProductMutation();
  const { data: categoryGroupData, isSuccess: getCategoryGroupSuccess } =
    useGetAllCategoryGroupsQuery(null);

  const navigate = useNavigate();

  const [dataForm, setDataForm] = useState<IProductType>({
    id: "",
    name: "",
    description: "",
    image: new DataTransfer().files[0],
    unitPrice: 0,
    brandId: "",
    categoryId: "",
    sku: "",
  });
  const [categoryGroupSelected, setCategoryGroupSelected] =
    useState<ISelected>();
  const [brandsSelected, setBrandsSelected] = useState<ISelected>();
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      dataForm.brandId.trim().toString().length === 0 ||
      dataForm.categoryId.trim().toString().length === 0 ||
      dataForm.description.trim().toString().length === 0 ||
      dataForm.sku.trim().toString().length === 0 ||
      !dataForm.image ||
      dataForm.name.trim().toString().length === 0 ||
      dataForm.unitPrice <= 0
    ) {
      toast.error("Thông tin không hợp lệ");
    } else {
      addProduct(dataForm);
    }
  };

  useEffect(() => {
    if (result.isSuccess) {
      toast.success("Tạo sản phẩm thành công");
      navigate("/admin/products");
    }
  }, [result, navigate]);

  let content, contentCategory, contentBrands: React.ReactNode;
  if (getCategoryGroupSuccess) {
    const updateData = categoryGroupData.map((item) => ({
      ...item,
      label: item.name,
    }));

    content = (
      <SelectBox
        label="Chọn Nhóm Danh Mục"
        onChange={(option: ISelected) => {
          getCategories({ GroupId: option.id, PageSize: 99 });
          setCategoryGroupSelected(option);
        }}
        options={updateData}
        selected={categoryGroupSelected}
      />
    );
  }
  if (getBrandsSuccess) {
    const updateData = brandsData.map((item) => ({
      ...item,
      label: item.name,
    }));

    contentBrands = (
      <SelectBox
        label="Chọn Thương Hiệu"
        onChange={(option: ISelected) => {
          setBrandsSelected(option);
          setDataForm(() => ({ ...dataForm, brandId: option.id }));
        }}
        selected={brandsSelected}
        options={updateData}
      />
    );
  }

  if (getCategorySuccess && categoryData) {
    const updateData = categoryData.map((item) => ({
      ...item,
      label: item.name,
    }));
    contentCategory = (
      <SelectBox
        label="Chọn Danh Mục"
        onChange={(option: ISelected) => {
          setCategorySelected(option);
          setDataForm(() => ({ ...dataForm, categoryId: option.id }));
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

      <form onSubmit={handleSubmit} className="flex justify-between gap-4">
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
              crossOrigin={"use-credentials"}
              variant="outlined"
              label="Tên sản phẩm"
            />
            <Input
              onChange={handleChange}
              name="sku"
              value={dataForm?.sku}
              crossOrigin={"use-credentials"}
              variant="outlined"
              label="Sku"
            />
            <Input
              onChange={handleChange}
              name="unitPrice"
              type="number"
              value={dataForm?.unitPrice}
              crossOrigin={"use-credentials"}
              variant="outlined"
              label="Giá sản phẩm"
            />
            {contentBrands}
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
            <Button type="submit">Thêm sản phẩm</Button>
          </div>
        </section>
      </form>
    </div>
  );
};

export default AddProduct;
