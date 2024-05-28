import React from "react";
import Table from "components/table/table";
import { Button, Spinner } from "@material-tailwind/react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Pagination from "components/pagination/pagitnation";
import { Link } from "react-router-dom";
import { useEffect } from "react";

import { toast } from "react-toastify";
import {
  useGetSuppliersQuery,
  useRemoveSupplierMutation,
} from "redux/api/warehouse/supplier";

import { useParams } from "react-router-dom";

import { ISupplier } from "redux/api/types";

interface ISupplierTable extends ISupplier {
  index: number;
}

const Supplier = () => {
  const { index } = useParams();

  const { data, isSuccess, isLoading } = useGetSuppliersQuery({
    pageIndex: index,
  });
  const [removeSupplier, { isSuccess: removeSuccess }] =
    useRemoveSupplierMutation();

  const configData = [
    {
      label: "STT",
      render: (data: ISupplierTable) => {
        return data.index;
      },
    },
    {
      label: "Tên nhà cung cấp",
      render: (data: ISupplierTable) => {
        return <div className="min-w-[160px]">{data.name}</div>;
      },
    },

    {
      label: "Email",
      render: (data: ISupplierTable) => {
        return data.email;
      },
    },
    {
      label: "Số điện thoại",
      render: (data: ISupplierTable) => {
        return <div className="min-w-[140px]">{data.phoneNumber}</div>;
      },
    },
    {
      label: "Địa chỉ",
      render: (data: ISupplierTable) => {
        return data.address;
      },
    },
    {
      label: "Tuỳ chọn",
      render: (data: ISupplierTable) => {
        return (
          <div className="flex gap-4 justify-end">
            <Button
              onClick={() => {
                removeSupplier(data.id);
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

  useEffect(() => {
    if (removeSuccess) {
      toast.success("Xoá thành công");
    }
  }, [removeSuccess]);

  let content: React.ReactNode;

  if (isSuccess) {
    const updateData: ISupplierTable[] = data.data.map((item, index) => ({
      ...item,
      index: index + 1,
    }));
    console.log("🚀 ~ updateData ~ updateData:", data);
    content = (
      <>
        <Table config={configData} data={updateData}></Table>
        <div className="flex justify-center my-8">
          <Pagination
            pageIndex={data.pageIndex}
            pageSize={data.pageSize}
            totalCount={data.totalCount}
            url="/admin/suppliers"
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
      <div className="flex justify-end my-4">
        <Link to="/admin/suppliers/add-supplier">
          <Button className="flex gap-2 items-center">
            <AiOutlinePlusCircle />
            Thêm nhà cung cấp
          </Button>
        </Link>
      </div>
      {content}
    </div>
  );
};

export default Supplier;
