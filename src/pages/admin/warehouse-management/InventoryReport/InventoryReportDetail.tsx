import { Textarea } from "@material-tailwind/react";
import {
  Button,
  InputLabel,
  TextField,
  TextareaAutosize,
  Theme,
  makeStyles,
} from "@mui/material";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link, useParams } from "react-router-dom";
import { useGetReportQuery } from "redux/api/warehouse/report";
import InventoryProductTable from "./Components/InventoryProductTable";
import { format } from "date-fns";

const InventoryReportDetail = () => {
  const moment = require("moment");

  const { id } = useParams();
  const { data, isSuccess } = useGetReportQuery(id ?? "");
  console.log("🚀 ~ InventoryReportDetail ~ data:", data?.reportProducts);

  return (
    <>
      <div className="px-8">
        <div className="flex gap-4 border-y py-3  items-center">
          <Link to={"/admin/report"}>
            <Button variant="text" className="text-lg">
              <AiOutlineArrowLeft />
            </Button>
          </Link>
          <div>
            <p className="text-sm">Trở về</p>
            <h4 className="text-xl font-bold">Nhập, Xuất kho</h4>
          </div>
        </div>

        <div>
          <div className="bg-white flex-col gap-4 p-4">
            <div className="flex-col gap-4">
              <div className="w-full flex gap-4">
                <div className="basis-[50%]">
                  <InputLabel htmlFor={data?.to}>Từ</InputLabel>
                  <TextField
                    className="w-full"
                    value={data?.supplierName}
                    variant="outlined"
                  />
                </div>
                <div className="basis-[50%]">
                  <InputLabel htmlFor={data?.to}>Đến</InputLabel>
                  <TextField
                    className="w-full"
                    value={data?.toName}
                    variant="outlined"
                  />
                </div>
              </div>
              <div className="mt-4">
                <InputLabel htmlFor={data?.to}>Nội dung</InputLabel>
                <Textarea
                  className="h-full"
                  name="description"
                  value={data?.description}
                />
              </div>
            </div>
            <div>
              <div className="w-full flex-col gap-4">
                <div className="flex gap-4 justify-between">
                  <div className="w-full">
                    <InputLabel htmlFor={data?.creatorName}>
                      Người tạo phiếu
                    </InputLabel>
                    <TextField
                      className="w-full"
                      value={data?.creatorName}
                      variant="outlined"
                    />
                  </div>
                  <div className="w-full">
                    <InputLabel htmlFor={data?.approveName}>
                      Người xác nhận
                    </InputLabel>
                    <TextField
                      className="w-full"
                      value={data?.approveName}
                      variant="outlined"
                    />
                  </div>
                  <div className="w-full">
                    <InputLabel htmlFor={data?.inspectorName}>
                      Người kiểm tra
                    </InputLabel>
                    <TextField
                      className="w-full"
                      value={data?.inspectorName}
                      variant="outlined"
                    />
                  </div>
                </div>
                <div className="flex gap-4 justify-between">
                  <div className="w-full">
                    <InputLabel htmlFor={data?.creatorName}>
                      Thời gian tạo
                    </InputLabel>
                    <TextField
                      className="w-full"
                      value={
                        data?.createAt
                          ? moment(new Date(data?.createAt!)).format(
                              "DD/MM/YYYY HH:mm"
                            )
                          : ""
                      }
                      variant="outlined"
                    />
                  </div>
                  <div className="w-full">
                    <InputLabel htmlFor={data?.approveName}>
                      Thời gian xác nhận
                    </InputLabel>
                    <TextField
                      className="w-full"
                      value={
                        data?.approveAt
                          ? moment(new Date(data?.approveAt!)).format(
                              "DD/MM/YYYY HH:mm"
                            )
                          : ""
                      }
                      variant="outlined"
                    />
                  </div>
                  <div className="w-full">
                    <InputLabel htmlFor={data?.inspectorName}>
                      Thời gian kiểm tra
                    </InputLabel>
                    <TextField
                      className="w-full"
                      value={
                        data?.inspectAt
                          ? moment(new Date(data?.inspectAt)).format(
                              "DD/MM/YYYY HH:mm"
                            )
                          : ""
                      }
                      variant="outlined"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <InventoryProductTable rows={data?.reportProducts ?? []} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InventoryReportDetail;
