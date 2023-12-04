import React from "react";
import Table from "components/table/table";
import { Button, Switch, Spinner } from "@material-tailwind/react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Pagination from "components/pagination/pagitnation";
import { Link } from "react-router-dom";

import {
  useGetProductsQuery,
  useDeleteProductMutation,
} from "redux/api/catalog/product";
import { useParams } from "react-router-dom";
import { useFormatPrice } from "hooks/use-format-price";
interface ProductsProps {}

const Products: React.FC<ProductsProps> = () => {
  const { index } = useParams();
  const [formatPrice] = useFormatPrice();
  const { data, isSuccess, isLoading } = useGetProductsQuery({
    pageIndex: index,
    pageSize: 20,
  });
  const [removeProduct] = useDeleteProductMutation();
  const configData = [
    {
      label: "STT",
      render: (data: any) => {
        return data.index;
      },
    },
    {
      label: "Sản phẩm",
      render: (data: any) => {
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
      render: (data: any) => {
        return <div className="line-clamp-3">{data.description}</div>;
      },
    },
    {
      label: "Giá bán",
      render: (data: any) => {
        return formatPrice.format(data.unitPrice);
      },
    },
    {
      label: "Active",
      render: (data: any) => {
        return <Switch crossOrigin={"use-credentials"}></Switch>;
      },
    },
    {
      label: "Tuỳ chọn",
      render: (data: any) => {
        return (
          <div className="flex gap-4 min-w-[200px]">
            <Link to={`/admin/products/product-detail/${data.id}`}>
              <Button color="blue">Chi tiết</Button>
            </Link>
            <Button
              onClick={() => {
                removeProduct(data.id);
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
    const updateData = data.data.map((item, index) => {
      return { ...item, index: index + 1 };
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
    <div className="px-4 ">
      <div className="flex justify-end my-4 ">
        <Link to="/admin/products/add-product">
          <Button className="flex gap-2 items-center">
            <AiOutlinePlusCircle />
            Thêm sản phẩm
          </Button>
        </Link>
      </div>
      {content}
    </div>
  );
};

export default Products;
