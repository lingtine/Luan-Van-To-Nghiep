import { Spinner } from "@material-tailwind/react";
import { Button } from "@mui/material";
import Pagination from "components/pagination/pagitnation";
import React from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Link } from "react-router-dom";

import { useParams } from "react-router-dom";
import { useGetReportsQuery } from "redux/api/warehouse/report";
import InventoryReportTable from "./Components/InventoryReportTable";

const Report = () => {
  const { index } = useParams();

  const { data, isSuccess, isLoading } = useGetReportsQuery({
    PageIndex: index,
  });

  let content: React.ReactNode;

  if (isSuccess) {
    content = (
      <>
        <InventoryReportTable rows={data.data} />
        <div className="flex justify-center my-8">
          <Pagination
            pageIndex={data.pageIndex}
            pageSize={data.pageSize}
            totalCount={data.totalCount}
            url="/admin/reports"
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
      <div className="flex justify-end my-4 gap-4">
        <Link to="/admin/report/addGoodsIssue">
          <Button variant="contained" className="flex gap-2 items-center">
            <AiOutlinePlusCircle />
            Thêm phiếu xuất
          </Button>
        </Link>
        <Link to="/admin/report/addGoodsReceipt">
          <Button variant="contained" className="flex gap-2 items-center">
            <AiOutlinePlusCircle />
            Thêm phiếu nhập
          </Button>
        </Link>
      </div>
      {content}
    </div>
  );
};

export default Report;
