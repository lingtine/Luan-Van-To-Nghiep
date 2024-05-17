import React from "react";
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
interface ProductDetailProps {}

const ProductDetail: React.FC<ProductDetailProps> = () => {
  const { productId } = useParams();
  const { data, isSuccess } = useGetProductDetailQuery(productId || "", {
    refetchOnFocus: true,
  });

  const [removeSpecification] = useRemoveSpecificationForProductMutation();
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  let content: React.ReactNode;

  if (isSuccess) {
    content = (
      <>
        <div className="border-b border-primary-1 pb-8">
          <FormUpdateProductInfo product={data} />
        </div>

        <div className="flex gap-5">
          <div className="flex-[0_0_46%]">
            <div className="flex justify-between">
              <h4 className="text-xl font-semibold">Thông số sản phẩm</h4>
              <Button onClick={handleOpen}>Thêm thông số</Button>
            </div>

            <div className="my-4">
              {data.productSpecifications.map((item) => {
                return (
                  <div className="flex gap-4 border border-primary-1 justify-between  items-center p-2">
                    <h5 className="min-w-[200px]  ">
                      {item.specificationName}
                    </h5>

                    <p> {item.specificationValue}</p>

                    <IconButton
                      className="min-w-[40px]"
                      onClick={() => {
                        removeSpecification({
                          productId: productId || "",
                          data: [item.specificationId],
                        });
                      }}
                    >
                      <CiTrash />
                    </IconButton>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex-[0_0_46%]">
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
      {isOpen && (
        <Modal onClose={handleClose}>
          <FormAddSpecificationsProduct
            onClose={handleClose}
            productId={productId || ""}
          />
        </Modal>
      )}
    </div>
  );
};

export default ProductDetail;
