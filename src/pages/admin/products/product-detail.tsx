import React from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  Input,
  Textarea,
  Rating,
  Typography,
} from "@material-tailwind/react";
import {
  useGetProductDetailQuery,
  useUpdateProductMutation,
} from "redux/api/catalog/product";
import { useNavigate } from "react-router-dom";
import { AiFillEye, AiFillHeart } from "react-icons/ai";
import { useState, useEffect } from "react";
import TableProductSpecifications from "components/table/table-product-specifications";
import { toast } from "react-toastify";
interface ProductDetailProps {}

const ProductDetail: React.FC<ProductDetailProps> = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { data, isSuccess } = useGetProductDetailQuery(productId || "", {
    refetchOnFocus: true,
  });
  const [updateProduct, result] = useUpdateProductMutation();
  const [dataForm, setDataForm] = useState<{
    id: string;
    name: string;
    description: string;
    image: File;
    unitPrice: number;
  }>({
    id: "",
    name: "",
    description: "",
    image: new DataTransfer().files[0],
    unitPrice: 0,
  });
  const handleClick = () => {
    updateProduct(dataForm);
  };

  const handleChangeData = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setDataForm(() => ({ ...dataForm, [name]: value }));
  };
  useEffect(() => {
    if (isSuccess) {
      setDataForm(() => ({
        ...dataForm,
        id: data.id,
        description: data.description,
        name: data.name,
        unitPrice: data.unitPrice,
      }));
    }
  }, [isSuccess]);

  useEffect(() => {
    if (result.isSuccess) {
      navigate("/admin/products");
      toast.success("Chỉnh sửa sản phẩm thành công");
    }
  }, [result]);

  let content: React.ReactNode;

  if (isSuccess) {
    const renderProductSpecifications = data.productSpecifications.map(
      (item) => {
        return (
          <div>
            <label className="text-sm font-semibold">
              {item.specificationName}
            </label>
            <Input
              crossOrigin={""}
              readOnly
              value={item.specificationValue}
              name="brand"
            />
          </div>
        );
      }
    );

    content = (
      <>
        <div className="flex flex-[0_0_50%] flex-col gap-4">
          <h3 className="text-lg font-bold">Thông tin cơ bản</h3>

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
              value={data.category.name}
              name="category"
            />
          </div>
          <div>
            <label className="text-sm font-semibold">Miêu tả sản phẩm</label>
            <Input
              crossOrigin={""}
              readOnly
              value={data.brand.name}
              name="brand"
            />
          </div>

          <h3 className="text-lg font-bold">Đánh giá của khách hàng</h3>

          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <h5 className="pr-2">Lượt xem:</h5>
              <AiFillEye />
              {data.viewCount}
            </div>

            <div className="flex items-center gap-2">
              <h5 className="pr-2">Lượt thích:</h5>
              <AiFillHeart />
              {data.likeCount}
            </div>
            <div className="flex items-center gap-2 font-bold text-blue-gray-500">
              <Rating value={data.numberOfStar} readonly />
              <Typography
                color="blue-gray"
                className="font-medium text-blue-gray-500"
              >
                Dựa trên {data.rateCount} đánh giá
              </Typography>
            </div>
          </div>
        </div>
        <div className="flex[0_0_50%] gap-4 flex flex-col">
          {<TableProductSpecifications data={data.productSpecifications} />}
          <h3 className="text-lg font-bold">Hình ảnh sản phẩm</h3>

          <img
            className="h-96 w-full object-cover object-center"
            src={data.imageUrl}
            alt={data.name}
          />
        </div>
      </>
    );
  }

  return (
    <div className="bg-[#fafafa] p-4">
      <div className="">
        <section className="flex items-center justify-between">
          <h2 className="font-bold text-xl">Chi tiết sản phẩm</h2>
          <Button onClick={handleClick}>Save</Button>
        </section>
        <section className="flex gap-8 bg-white p-4 shadow">{content}</section>
      </div>
    </div>
  );
};

export default ProductDetail;
