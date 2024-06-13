import React, { useState } from "react";
import { useParams } from "react-router-dom";

import { Button, Spinner } from "@material-tailwind/react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Pagination from "components/pagination/pagitnation";
import { useGetSpecificationsQuery } from "redux/api/catalog/specification";
import SpecificationTable from "./specification-table";
import { ISpecificationTable } from "share/types/specification";
import ModalAddSpecification from "./modal-add-specification";

const Specification = () => {
  const { index } = useParams();
  const [isVisible, setIsVisible] = useState(false);
  const { data, isSuccess, isLoading } = useGetSpecificationsQuery({
    PageIndex: index,
  });

  const handleToggle = () => {
    setIsVisible(!isVisible);
  };

  let content: React.ReactNode;

  if (isSuccess) {
    const { pageIndex, pageSize, totalCount } = data;

    const updateData: ISpecificationTable[] = data.data.map((item, index) => ({
      ...item,
      index: index + 1 + pageIndex * pageSize,
    }));
    content = (
      <>
        <SpecificationTable data={updateData}></SpecificationTable>
        <div className="flex justify-center my-8">
          <Pagination
            pageIndex={pageIndex}
            pageSize={pageSize}
            totalCount={totalCount}
            url="/admin/specifications"
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
        <Button className="flex gap-2 items-center">
          <AiOutlinePlusCircle />
          Thêm đặc tả
        </Button>
      </div>
      {content}
      {isVisible && <ModalAddSpecification onToggle={handleToggle} />}
    </div>
  );
};

export default Specification;
