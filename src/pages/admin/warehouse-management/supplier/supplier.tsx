import React, { useState } from "react";
import { Button, Spinner } from "@material-tailwind/react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useGetSuppliersQuery } from "redux/api/warehouse/supplier";

import SupplierTable from "./supplier-table";
import { ISupplierTable } from "share/types/supplier";
import ModalAddSupplier from "./modal-add-supplier";

const Supplier = () => {
  const { data, isSuccess, isLoading } = useGetSuppliersQuery();
  const [isAdd, setIsAdd] = useState(false);
  let content: React.ReactNode;

  const handleToggleAdd = () => {
    setIsAdd(!isAdd);
  };

  if (isSuccess) {
    const updateData: ISupplierTable[] = data.data.map((item, index) => ({
      ...item,
      index: index + 1,
    }));
    content = (
      <>
        <SupplierTable data={updateData} />
        {/* <div className="flex justify-center my-8">
          <Pagination
            pageIndex={pageIndex}
            pageSize={pageSize}
            totalCount={totalCount}
            url="/admin/suppliers"
          />
        </div> */}
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
        <Button className="flex gap-2 items-center">
          <AiOutlinePlusCircle />
          Thêm nhà cung cấp
        </Button>
      </div>
      {content}
      {isAdd && <ModalAddSupplier onToggle={handleToggleAdd} />}
    </div>
  );
};

export default Supplier;
