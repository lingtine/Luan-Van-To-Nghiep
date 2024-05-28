import React from "react";
import { Input, Button, Textarea } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useUpdateProductMutation } from "redux/api/catalog/product";
import { useNavigate } from "react-router-dom";
import { IProductDetailType } from "redux/api/types";
import UploadImage from "components/upload-image/upload-image";
interface FormUpdateProductInfoProps {
  product: IProductDetailType;
}

const FormUpdateProductInfo: React.FC<FormUpdateProductInfoProps> = ({
  product,
}) => {
  const navigate = useNavigate();
  const [updateProduct, result] = useUpdateProductMutation();
  const [isUpdate, setIsUpdate] = useState(false);
  const [dataForm, setDataForm] = useState<{
    id: string;
    name: string;
    description: string;
    image: File;
    unitPrice: number;
  }>({
    id: product.id,
    name: product.name,
    description: product.description,
    image: new DataTransfer().files[0],
    unitPrice: product.unitPrice,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log();
    if (dataForm.image) {
      console.log(dataForm);
      updateProduct(dataForm);
    } else {
      const { image, ...updateDataForm } = dataForm;
      updateProduct(updateDataForm);
    }
  };
  const handleChangeData = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setDataForm(() => ({ ...dataForm, [name]: value }));
  };

  const handleChangeImage = (image: File) => {
    setDataForm(() => {
      return { ...dataForm, image };
    });
  };

  useEffect(() => {
    if (
      dataForm.name === product.name &&
      dataForm.unitPrice === product.unitPrice &&
      dataForm.description === product.description &&
      !dataForm.image
    ) {
      setIsUpdate(false);
    } else {
      setIsUpdate(true);
    }
  }, [dataForm, product.name, product.unitPrice, product.description]);

  useEffect(() => {
    if (result.isSuccess) {
      navigate(-1);
      toast.success("Chỉnh sửa sản phẩm thành công");
    }
  }, [result, navigate]);

  return (
    <form onSubmit={handleSubmit} action="" className="flex flex-wrap gap-5 ">
      <div className="flex-[0_0_100%] flex justify-between">
        <h3 className="text-xl font-bold">Thông tin cơ bản</h3>
        <div>
          <Button disabled={!isUpdate} type="submit">
            Save
          </Button>
        </div>
      </div>
      <div className="flex-[0_0_46%] flex flex-col gap-4">
        <div>
          <label className="text-sm font-semibold">Tên sản phẩm</label>
          <Input
            crossOrigin={""}
            value={dataForm.name}
            name="name"
            onChange={handleChangeData}
          />
        </div>
        <div>
          <label className="text-sm font-semibold">Giá sản phẩm</label>
          <Input
            value={dataForm.unitPrice || ""}
            name="unitPrice"
            onChange={handleChangeData}
            type="number"
            crossOrigin={""}
          />
        </div>
        <div>
          <label className="text-sm font-semibold">Miêu tả sản phẩm</label>
          <Textarea
            value={dataForm.description}
            name="description"
            onChange={handleChangeData}
          />
        </div>
        <div>
          <label className="text-sm font-semibold">Danh mục sản phẩm</label>
          <Input
            crossOrigin={""}
            readOnly
            value={product.category.name}
            name="category"
            disabled
          />
        </div>
        <div>
          <label className="text-sm font-semibold">Thương hiệu</label>
          <Input
            crossOrigin={""}
            readOnly
            value={product.brand.name}
            name="brand"
            disabled
          />
        </div>
      </div>

      <div className="flex-[0_0_46%]">
        {product.imageUrl ? (
          <>
            <h3 className="text-sm font-semibold">Hình ảnh sản phẩm</h3>
            <img
              className="h-96 w-full object-contain "
              src={product.imageUrl}
              alt={product.name}
            />
          </>
        ) : (
          <UploadImage onChange={handleChangeImage} />
        )}
      </div>
    </form>
  );
};

export default FormUpdateProductInfo;
