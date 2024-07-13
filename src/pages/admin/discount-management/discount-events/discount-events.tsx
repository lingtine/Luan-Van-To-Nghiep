import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Spinner } from "@material-tailwind/react";

import { useGetDiscountEventsQuery } from "redux/api/discount/discount-event";
import Pagination from "components/pagination/pagitnation";
import { IDiscountEventTable } from "share/types/discount-event";
import DiscountEventTable from "./discount-event-table";
import ModalAddDiscountEvent from "./modal-add-discount-event";
import DiscountTable from "./Components/DiscountTable";
import { Button } from "@mui/material";

const DiscountEvent = () => {
  const { index } = useParams();
  const { data, isSuccess, isLoading } = useGetDiscountEventsQuery({
    PageIndex: index,
  });
  const [isVisibleModalAdd, setIsVisibleModalAdd] = useState(false);

  const handleToggleAddNew = () => {
    setIsVisibleModalAdd(!isVisibleModalAdd);
  };

  let content: React.ReactNode;

  if (isSuccess) {
    const { pageSize, pageIndex, totalCount } = data;

    content = (
      <>
        <DiscountTable rows={data.data}></DiscountTable>
        <div className="flex justify-center my-8">
          <Pagination
            pageIndex={pageIndex}
            pageSize={pageSize}
            totalCount={totalCount}
            url="/admin/discountEvents"
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
          variant="contained"
          color="success"
          onClick={() => setIsVisibleModalAdd(true)}
          className="flex gap-2 items-center"
        >
          <AiOutlinePlusCircle />
          Thêm mới
        </Button>
      </div>
      {content}
      {isVisibleModalAdd && (
        <ModalAddDiscountEvent onToggle={handleToggleAddNew} />
      )}
    </div>
  );
};

export default DiscountEvent;
