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

import { ISupplierTable, ISupplier } from "share/types/supplier";

const Supplier = () => {
  const { index } = useParams();

  const { data, isSuccess, isLoading } = useGetSuppliersQuery();
  const [removeSupplier, { isSuccess: removeSuccess }] =
    useRemoveSupplierMutation();

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
    content = (
      <>
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
