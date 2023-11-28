import React from "react";
import { useParams } from "react-router-dom";
import { Input, Rating, Typography, Button } from "@material-tailwind/react";
import { useGetProductDetailQuery } from "redux/api/catalog/product";
import { AiFillEye, AiFillHeart } from "react-icons/ai";
import TableProductSpecifications from "components/table/table-product-specifications";
import FormUpdateProductInfo from "./form/form-update-product-info";
import { IProductDetailType } from "redux/api/types";
import Modal from "components/modal/modal";
interface ProductDetailProps {}

const ProductDetail: React.FC<ProductDetailProps> = () => {
  const { productId } = useParams();
  const { data, isSuccess } = useGetProductDetailQuery(productId || "", {
    refetchOnFocus: true,
  });

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
        <div className="border-b border-primary-1 pb-8">
          <FormUpdateProductInfo product={data} />
        </div>

        <div className=" gap-4 flex ">
          <div className="flex-[0_0_50%]">
            <div>
              <h4 className="text-xl font-semibold">Thông số sản phẩm</h4>
              <Button>Thêm thông số</Button>
            </div>
            {<TableProductSpecifications data={data.productSpecifications} />}
          </div>

          <div className="flex-[0_0_50%]">
            <h3 className="text-lg font-bold">Đánh giá của khách hàng</h3>

            <div className="flex flex-wrap gap-6"></div>
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
      </>
    );
  }

  return (
    <div className="bg-[#fafafa] p-4">
      <div className="">
        <section className="flex items-center justify-between">
          <h2 className="font-bold text-xl">Chi tiết sản phẩm</h2>
        </section>
        <section className=" flex flex-col gap-8 bg-white p-4 shadow">
          {content}
        </section>
      </div>
    </div>
  );
};

export default ProductDetail;
