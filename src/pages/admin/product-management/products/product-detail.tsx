import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Rating,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import {
  useGetProductDetailQuery,
  useRemoveSpecificationForProductMutation,
} from "redux/api/catalog/product";
import { AiFillEye, AiFillHeart } from "react-icons/ai";
import FormUpdateProductInfo from "./form/form-update-product-info";
import { useState } from "react";
import { CiTrash } from "react-icons/ci";

import FormAddSpecificationsProduct from "./form/form-add-specifications-product";
import Modal from "components/modal/modal";
import UploadMultiple from "components/upload-image/UploadMultiple";
import { IProductSpecifications } from "redux/api/types";
interface ProductDetailProps {}

const ProductDetail: React.FC<ProductDetailProps> = () => {
  const { productId } = useParams();
  const { data, isSuccess } = useGetProductDetailQuery(productId || "", {
    refetchOnFocus: true,
  });

  let content: React.ReactNode;

  if (isSuccess) {
    content = (
      <>
        <div className="pb-8"></div>
      </>
    );
  }

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
