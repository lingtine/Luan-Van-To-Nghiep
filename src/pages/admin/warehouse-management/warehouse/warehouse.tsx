import { Spinner } from "@material-tailwind/react";
import { Button } from "@mui/material";
import React, { useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Link, useParams } from "react-router-dom";

import Pagination from "components/pagination/pagitnation";
import { useGetWarehousesQuery } from "redux/api/warehouse/warehouse";
import WarehouseTable from "./Components/WarehouseTable";
import ModalAddWarehouse from "./modal-add-warehouse";

const Warehouse = () => {
  const { index } = useParams();
  const { data, isSuccess, isLoading } = useGetWarehousesQuery({
    PageIndex: index,
    PageSize: 20,
  });
  const [isAdd, setIsAdd] = useState(false);

  const handleToggleAdd = () => {
    setIsAdd(!isAdd);
  };

  let content: React.ReactNode;

  if (isSuccess) {
    content = (
      <>
        <WarehouseTable rows={data.data} />
        <div className="flex justify-center my-8">
          <Pagination
            pageIndex={data.pageIndex}
            pageSize={data.pageSize}
            totalCount={data.totalCount}
            url="/admin/warehouses"
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
          onClick={() => {
            setIsAdd(true);
          }}
        >
          <AiOutlinePlusCircle />
          Thêm kho
        </Button>
      </div>
      {content}
      {isAdd && <ModalAddWarehouse onToggle={handleToggleAdd} />}
    </div>
  );
};

export default Warehouse;
