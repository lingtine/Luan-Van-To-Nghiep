import { Spinner } from "@material-tailwind/react";
import Pagination from "components/pagination/pagitnation";
import React, { useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "redux/api/catalog/product";
import { IProductDetail } from "share/types/product";

import {
  ConfirmDialog,
  IContentConfirm,
} from "components/confirm-dialog/confirm-dialog";
import ProductTable from "./Components/ProductTable";
import { Button } from "@mui/material";

const Products = () => {
  const { index } = useParams();

  const [productRemove, setProductRemove] = useState<IContentConfirm>();
  const { data, isSuccess, isLoading } = useGetProductsQuery({
    PageIndex: index,
    PageSize: 20,
  });
  const [removeProduct] = useDeleteProductMutation();
  const handleToggleProduct = (data?: IContentConfirm) => {
    if (data) {
      setProductRemove(() => {
        return data;
      });
    } else {
      setProductRemove(undefined);
    }
  };

  let content: React.ReactNode;
  if (isSuccess) {
    content = (
      <>
        <ProductTable rows={data.data} />
        <div className="flex justify-center my-8">
          <Pagination
            pageIndex={data.pageIndex}
            pageSize={data.pageSize}
            totalCount={data.totalCount}
            url="/admin/products"
          />
        </div>
      </>
    );
  } else if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[100vh]">
        <Spinner className="h-12 w-12" />
      </div>
    );
  }

  return (
    <div className="px-4 overflow-hidden">
      <div className="flex justify-end my-4 ">
        <Link to="/admin/products/add-product">
          <Button
            color="success"
            variant="contained"
            className="flex gap-2 items-center"
          >
            <AiOutlinePlusCircle />
            Thêm sản phẩm
          </Button>
        </Link>
      </div>
      {content}
      <ConfirmDialog
        data={productRemove}
        setData={handleToggleProduct}
        handleConfirm={() => {
          if (productRemove) {
            removeProduct(productRemove.id);
            handleToggleProduct();
          }
        }}
      />
    </div>
  );
};

export default Products;
