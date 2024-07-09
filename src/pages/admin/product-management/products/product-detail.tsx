import React from "react";
import { useParams } from "react-router-dom";
import { useGetProductDetailQuery } from "redux/api/catalog/product";
import FormUpdateProductInfo from "./form/form-update-product-info";

interface ProductDetailProps {}

const ProductDetail: React.FC<ProductDetailProps> = () => {
  const { productId } = useParams();

  const { data, isSuccess, isLoading } = useGetProductDetailQuery(
    productId || ""
  );
  let content;

  if (isLoading) {
    content = <h1>loading</h1>;
  } else if (isSuccess) {
    content = <FormUpdateProductInfo product={data} />;
  }
  return (
    <div className="bg-[#fafafa] p-4">
      <h2 className="font-bold text-xl">Chi tiết sản phẩm</h2>
      <section className=" flex flex-col gap-8 bg-white p-4 shadow">
        {content}
      </section>
    </div>
  );
};

export default ProductDetail;
