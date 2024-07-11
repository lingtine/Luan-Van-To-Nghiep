import React from "react";
import Table from "components/table/table";
import { Button, Spinner } from "@material-tailwind/react";
import Pagination from "components/pagination/pagitnation";

import { useGetProductWarehouseQuery } from "redux/api/warehouse/product";
import { useParams } from "react-router-dom";
import { IProductWarehouse } from "share/types/product";
import StockTable from "./Components/StockTable";
interface IProductWarehouseTable extends IProductWarehouse {
  index: number;
}

const Inventory = () => {
  const { index } = useParams();
  const { data, isSuccess, isLoading } = useGetProductWarehouseQuery({
    pageIndex: index,
    pageSize: 20,
  });

  const configData = [
    {
      label: "STT",
      render: (data: IProductWarehouseTable) => {
        return data.index;
      },
    },
    {
      label: "sku",
      render: (data: IProductWarehouseTable) => {
        return data.sku;
      },
    },
    {
      label: "Tên sản phẩm",
      render: (data: IProductWarehouseTable) => {
        return data.name;
      },
    },
    {
      label: "Số lượng",
      render: (data: IProductWarehouseTable) => {
        return <div className="min-w-[80px]">{data.quantity}</div>;
      },
    },
    {
      label: "Trạng thái",
      render: (data: IProductWarehouseTable) => {
        return (
          <div className="min-w-[160px] flex justify-end">
            <Button
              color={data.status === "OutStock" ? "red" : "green"}
              ripple={false}
            >
              {data.status}
            </Button>
          </div>
        );
      },
    },
  ];

  let content: React.ReactNode;

  if (isSuccess) {
    content = (
      <>
        <StockTable rows={data.data} />
        <div className="flex justify-center my-8">
          <Pagination
            pageIndex={data.pageIndex}
            pageSize={data.pageSize}
            totalCount={data.totalCount}
            url="/admin/inventory"
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
      <div className="flex justify-end my-4"></div>
      {content}
    </div>
  );
};

export default Inventory;
