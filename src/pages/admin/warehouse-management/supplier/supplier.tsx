import React, { useState } from "react";
import { Spinner } from "@material-tailwind/react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useGetSuppliersQuery } from "redux/api/warehouse/supplier";

import SupplierTable from "./Components/SupplierTable";
import { ISupplierTable } from "share/types/supplier";
import ModalAddSupplier from "./modal-add-supplier";
import Pagination from "components/pagination/pagitnation";
import { Button } from "@mui/material";

const Supplier = () => {
  const { data, isSuccess, isLoading } = useGetSuppliersQuery();
  const [isAdd, setIsAdd] = useState(false);
  let content: React.ReactNode;

  const handleToggleAdd = () => {
    setIsAdd(!isAdd);
  };

  if (isSuccess) {
    content = (
      <>
        <SupplierTable rows={data.data} />
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
        <Button
          color="success"
          variant="contained"
          className="flex gap-2 items-center"
          onClick={() => setIsAdd(true)}
        >
          Thêm mới
        </Button>
      </div>
      {content}
      {isAdd && <ModalAddSupplier onToggle={handleToggleAdd} />}
    </div>
  );
};

export default Supplier;
