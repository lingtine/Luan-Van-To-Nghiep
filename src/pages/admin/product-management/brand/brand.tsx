import { Button, Spinner } from "@material-tailwind/react";
import React, { useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { Button as MUIButton, makeStyles } from "@mui/material";

import Pagination from "components/pagination/pagitnation";
import { useGetBrandsQuery } from "redux/api/catalog/brand";
import BrandTable from "./Components/BrandTable";
import ModalAddBrand from "./modal-add-brand";

const Brand = () => {
  const { index } = useParams();
  const [isVisible, setIsVisible] = useState(false);
  const { data, isSuccess, isLoading } = useGetBrandsQuery({
    PageIndex: index || "0",
  });

  const handleToggle = () => {
    setIsVisible(!isVisible);
  };

  let content: React.ReactNode;

  if (isSuccess) {
    const { pageSize, pageIndex, totalCount } = data;
   
    content = (
      <>
        <BrandTable rows={data.data} />
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
        <MUIButton variant="contained" color="success" className="flex gap-2 items-center" onClick={handleToggle}>
          <AiOutlinePlusCircle />
          Thêm Thương hiệu
        </MUIButton>
      </div>
      {content}
      {isVisible && <ModalAddBrand onToggle={handleToggle} />}
    </div>
  );
};

export default Brand;
