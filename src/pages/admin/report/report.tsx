import React from "react";
import Table from "components/table/table";
import { Button, Spinner } from "@material-tailwind/react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Pagination from "components/pagination/pagitnation";
import { Link } from "react-router-dom";

import { useEffect } from "react";

import { toast } from "react-toastify";
import {
  useGetReportsQuery,
  useApproveReportMutation,
  useCancelReportMutation,
  useInspectReportMutation,
} from "redux/api/warehouse/report";
import { useParams } from "react-router-dom";
interface ReportProps {}

const Report: React.FC<ReportProps> = () => {
  const { index } = useParams();

  const { data, isSuccess, isLoading } = useGetReportsQuery({
    pageIndex: index,
  });
  const [approveReport] = useApproveReportMutation();
  const [cancelReport] = useCancelReportMutation();
  const [inspectReport] = useInspectReportMutation();

  const configData = [
    {
      label: "STT",
      render: (data: any) => {
        return data.index;
      },
    },
    {
      label: "Loại phiếu",
      render: (data: any) => {
        return data.reportType === "GoodsReceiptReport"
          ? "Phiếu Nhập"
          : "Phiếu xuất";
      },
    },

    {
      label: "Miêu tả",
      render: (data: any) => {
        return data.description;
      },
    },
    {
      label: "Trạng thái",
      render: (data: any) => {
        if (data.reportStatus === "Creative") return "Khởi tạo";
        if (data.reportStatus === "Approved") return "Đã xác nhận";

        if (data.reportStatus === "Inspected") return "Đã kiểm tra";

        if (data.reportStatus === "Cancelled") return "Đã Huỷ";
      },
    },
    {
      label: "Ngày tạo phiếu",
      render: (data: any) => {
        const time = new Date(data.createAt);

        return (
          time.getDate().toString() +
          "/" +
          time.getMonth().toString() +
          "/" +
          +time.getFullYear().toString()
        );
      },
    },

    {
      label: "Tuỳ chọn",
      render: (data: any) => {
        let content = "";
        if (data.reportStatus === "Creative") content = "Xác nhận";
        if (data.reportStatus === "Approved") content = "Kiểm tra";
        return (
          <div className="flex gap-4 justify-end">
            {/* <Link to={`${data.id}`}>
              <Button>Chi tiết</Button>
            </Link> */}

            {content && (
              <Button
                onClick={() => {
                  if (data.reportStatus === "Creative") approveReport(data.id);
                  if (data.reportStatus === "Approved") inspectReport(data.id);
                }}
                color="light-blue"
              >
                {content}
              </Button>
            )}
            <Button
              color="red"
              disabled={
                data.reportStatus === "Cancelled" ||
                data.reportStatus === "Inspected"
              }
              onClick={() => {
                cancelReport(data.id);
              }}
            >
              Huỷ
            </Button>
          </div>
        );
      },
    },
  ];

  let content: React.ReactNode;

  if (isSuccess) {
    const updateData = data.data.map((item, index) => ({
      ...item,
      index: index + 1,
    }));
    content = (
      <>
        <Table config={configData} data={updateData}></Table>
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
          <Button className="flex gap-2 items-center">
            <AiOutlinePlusCircle />
            Thêm phiếu xuất
          </Button>
        </Link>
        <Link to="/admin/report/addGoodsReceipt">
          <Button className="flex gap-2 items-center">
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
