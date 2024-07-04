import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Button, Spinner } from "@material-tailwind/react";

import { useGetDiscountEventsQuery } from "redux/api/discount/discount-event";
import Pagination from "components/pagination/pagitnation";
import { IDiscountEventTable } from "share/types/discount-event";
import DiscountEventTable from "./discount-event-table";
import ModalAddDiscountEvent from "./modal-add-discount-event";

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

    const updateData: IDiscountEventTable[] = data.data.map((item, index) => ({
      ...item,
      index: index + 1 + pageIndex * pageSize,
    }));
    content = (
      <>
        <DiscountEventTable data={updateData}></DiscountEventTable>
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
          onClick={() => setIsVisibleModalAdd(true)}
          className="flex gap-2 items-center"
        >
          <AiOutlinePlusCircle />
          Thêm Sự Kiện
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
