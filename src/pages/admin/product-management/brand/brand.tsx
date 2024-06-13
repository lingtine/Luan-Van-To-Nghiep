import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Spinner } from "@material-tailwind/react";
import { AiOutlinePlusCircle } from "react-icons/ai";

import Pagination from "components/pagination/pagitnation";
import { IBrandTable } from "share/types/brand";
import { useGetBrandsQuery } from "redux/api/catalog/brand";
import BrandTable from "./brand-table";
import ModalAddBrand from "./modal-add-brand";

const Brand = () => {
  const { index } = useParams();
  const [isVisible, setIsVisible] = useState(false);
  const { data, isSuccess, isLoading } = useGetBrandsQuery({
    PageIndex: index,
  });

  const handleToggle = () => {
    setIsVisible(!isVisible);
  };

  let content: React.ReactNode;

  if (isSuccess) {
    const { pageSize, pageIndex, totalCount } = data;
    const updateData: IBrandTable[] = data.data.map((item, index) => ({
      ...item,
      index: index + 1 + pageIndex * pageSize,
    }));

    content = (
      <>
        <BrandTable data={updateData} />
        <div className="flex justify-center my-8">
          <Pagination
            pageIndex={pageIndex}
            pageSize={pageSize}
            totalCount={totalCount}
            url={"/admin/brand"}
          />
        </div>
        ;
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
          Thêm Thương hiệu
        </Button>
      </div>
      {content}
      {isVisible && <ModalAddBrand onToggle={handleToggle} />}
    </div>
  );
};

export default Brand;
