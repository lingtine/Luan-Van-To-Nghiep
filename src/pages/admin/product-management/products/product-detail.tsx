import React from "react";
import { useParams } from "react-router-dom";
import {
  useGetProductDetailQuery
} from "redux/api/catalog/product";
import FormUpdateProductInfo from "./form/form-update-product-info";

interface ProductDetailProps {}

const ProductDetail: React.FC<ProductDetailProps> = () => {
  const { productId } = useParams();
  
  const { data, isSuccess } = useGetProductDetailQuery(productId || "", {
    refetchOnFocus: true,
  });

  return (
    <div className="bg-[#fafafa] p-4">
      <h2 className="font-bold text-xl">Chi tiết sản phẩm</h2>

      <section className=" flex flex-col gap-8 bg-white p-4 shadow">
        {isSuccess && <FormUpdateProductInfo product={data} />}
      </section>
    </div>
  );
};

export default ProductDetail;
