import React, { useState } from "react";
import Table from "components/table/table";
import { Button, Spinner } from "@material-tailwind/react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Pagination from "components/pagination/pagitnation";
import { Link } from "react-router-dom";

import {
  useGetProductsQuery,
  useDeleteProductMutation,
} from "redux/api/catalog/product";
import { useParams } from "react-router-dom";
import { useFormatPrice } from "hooks/use-format-price";
import { IProductDetail } from "share/types/product";

import {
  ConfirmDialog,
  IContentConfirm,
} from "components/confirm-dialog/confirm-dialog";

interface IProductTable extends IProductDetail {
  index: number;
}

const Products = () => {
  const { index } = useParams();
  const [formatPrice] = useFormatPrice();
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

  const configData = [
    {
      label: "STT",
      render: (data: IProductTable) => {
        return data.index;
      },
    },
    {
      label: "Sản phẩm",
      render: (data: IProductTable) => {
        return (
          <div className="flex items-center gap-4  min-w-[300px] max-h-[100px] overflow-y-hidden">
            <img className="w-8" src={data.imageUrl} alt={data.name} />

            <p>{data.name}</p>
          </div>
        );
      },
    },

    {
      label: "Miêu tả",
      render: (data: IProductTable) => {
        return <div className="line-clamp-3">{data.description}</div>;
      },
    },
    {
      label: "Giá bán",
      render: (data: IProductTable) => {
        return formatPrice.format(data.unitPrice);
      },
    },

    {
      label: "Tuỳ chọn",
      render: (data: IProductTable) => {
        return (
          <div className="flex gap-4 min-w-[200px]">
            <Link to={`/admin/products/product-detail/${data.id}`}>
              <Button color="blue">Chi tiết</Button>
            </Link>
            <Button
              onClick={() => {
                handleToggleProduct({
                  id: data.id,
                  title: `Bạn có muốn xoá sản phẩm ${data.name}`,
                  content:
                    "Thao tác này sẽ xóa bản ghi. Một khi đã xóa thì không thể khôi phục lại.",
                });
              }}
              color="red"
            >
              Xoá
            </Button>
          </div>
        );
      },
    },
  ];

  let content: React.ReactNode;
  if (isSuccess) {
    const { pageSize, pageIndex } = data;

    const updateData: IProductTable[] = data.data.map((item, index) => {
      return { ...item, index: index + 1 + pageIndex * pageSize };
    });

    content = (
      <>
        <Table config={configData} data={updateData}></Table>
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
          <Button className="flex gap-2 items-center">
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
