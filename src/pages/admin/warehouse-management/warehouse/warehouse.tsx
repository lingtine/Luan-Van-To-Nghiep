import React, { useState } from "react";
import { Button, Spinner } from "@material-tailwind/react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import Pagination from "components/pagination/pagitnation";
import { useGetWarehousesQuery } from "redux/api/warehouse/warehouse";
import { IWarehouseTable } from "share/types/warehouse";
import WarehouseTable from "./warehouse-table";
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
    const updateData: IWarehouseTable[] = data.data.map((item, index) => ({
      ...item,
      index: index + 1,
    }));
    content = (
      <>
        <WarehouseTable data={updateData}></WarehouseTable>
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
        <Link to="/admin/warehouses/add-warehouse">
          <Button className="flex gap-2 items-center">
            <AiOutlinePlusCircle />
            Thêm kho
          </Button>
        </Link>
      </div>
      {content}
      {isAdd && <ModalAddWarehouse onToggle={handleToggleAdd} />}
    </div>
  );
};

export default Warehouse;
