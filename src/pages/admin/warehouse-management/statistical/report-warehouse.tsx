import React from "react";

import { Button } from "@material-tailwind/react";
import { useState } from "react";
import {
  useGetProductReportByWarehouseMutation,
  useGetProductReportMutation,
  useGetTransportReportByWarehouseMutation,
  useGetTransportReportMutation,
} from "redux/api/warehouse/reporting";
import SelectBoxWarehouse from "./components/select-box-wasehouse";
import { ISelected } from "components/select-box/select-box";
import { Radio, Spinner } from "@material-tailwind/react";
import { toast } from "react-toastify";
import TableWarehouseReport from "./components/table-warehouse-report";
interface ReportWarehouseProps {}

const ReportWarehouse: React.FC<ReportWarehouseProps> = () => {
  const [warehouse, setWarehouse] = useState<ISelected>();
  const [isTypeWarehouse, setIsTypeWarehouse] = useState<boolean>(false);
  const [typeReport, setTypeReport] = useState<number>(1);
  const [getProductReportByWarehouse, resultGetProductReportByWarehouse] =
    useGetProductReportByWarehouseMutation();
  const [getTransportReportByWarehouse, resultGetTransportReportByWarehouse] =
    useGetTransportReportByWarehouseMutation();

  const [getTransportReport, resultGetTransportReport] =
    useGetTransportReportMutation();

  const [getProductReport, resultGetProductReport] =
    useGetProductReportMutation();

  const handleChange = () => {
    setIsTypeWarehouse(!isTypeWarehouse);
  };

  const handleClick = () => {
    if (isTypeWarehouse) {
      if (warehouse) {
        if (typeReport === 1) {
          getProductReportByWarehouse(warehouse.id);
        } else if (typeReport === 2) {
          getTransportReportByWarehouse(warehouse.id);
        }
      } else {
        toast.error("Vui lòng chọn kho");
      }
    } else {
      if (typeReport === 1) {
        getProductReport();
      } else if (typeReport === 2) {
        getTransportReport();
      }
    }
  };

  let content;

  if (
    resultGetProductReport.isLoading ||
    resultGetProductReportByWarehouse.isLoading ||
    resultGetTransportReport.isLoading ||
    resultGetTransportReportByWarehouse.isLoading
  ) {
    content = (
      <div className="flex justify-center items-center h-[100vh]">
        <Spinner className="h-12 w-12" />
      </div>
    );
  }
  if (resultGetProductReport.isSuccess) {
    if (
      resultGetProductReport.data.length !== 0 &&
      typeReport === 1 &&
      !isTypeWarehouse
    ) {
      content = (
        <TableWarehouseReport type={true} data={resultGetProductReport.data} />
      );
    } else if (resultGetProductReport.data.length === 0) {
      content = <p>Không có dữ liệu</p>;
    }
  }
  if (resultGetProductReportByWarehouse.isSuccess) {
    if (
      resultGetProductReportByWarehouse.data.length !== 0 &&
      typeReport === 1 &&
      isTypeWarehouse
    ) {
      content = (
        <TableWarehouseReport
          type={true}
          data={resultGetProductReportByWarehouse.data}
        />
      );
    } else if (resultGetProductReportByWarehouse.data.length === 0) {
      content = <p>Không có dữ liệu</p>;
    }
  }
  if (resultGetTransportReport.isSuccess) {
    if (
      resultGetTransportReport.data.length !== 0 &&
      typeReport === 2 &&
      !isTypeWarehouse
    ) {
      content = (
        <TableWarehouseReport
          type={false}
          data={resultGetTransportReport.data}
        />
      );
    } else if (resultGetTransportReport.data.length === 0) {
      content = <p>Không có dữ liệu</p>;
    }
  }
  if (resultGetTransportReportByWarehouse.isSuccess) {
    if (
      resultGetTransportReportByWarehouse.data.length !== 0 &&
      typeReport === 2 &&
      isTypeWarehouse
    ) {
      content = (
        <TableWarehouseReport
          type={false}
          data={resultGetTransportReportByWarehouse.data}
        />
      );
    } else if (!resultGetTransportReportByWarehouse.data.length) {
      content = <p>Không có dữ liệu</p>;
    }
  }

  return (
    <div className="min-h-[400px]">
      <div className="flex gap-2  justify-center  items-center ">
        <div className="border border-primary-1 p-8">
          <div className="flex justify-center items-center gap-4">
            <h4>Loại báo cáo</h4>
            <Radio
              crossOrigin={""}
              onChange={() => {
                setTypeReport(1);
              }}
              checked={typeReport === 1}
              name="type"
              label="Báo cáo tồn kho"
            />
            <Radio
              crossOrigin={""}
              onChange={() => {
                setTypeReport(2);
              }}
              checked={typeReport === 2}
              name="type"
              label="Báo cáo nhập kho"
            />
          </div>
          <div className="flex justify-center items-center gap-4">
            <h4>Tuy chọn báo cáo</h4>
            <Radio
              onClick={handleChange}
              checked={isTypeWarehouse}
              crossOrigin={""}
              name="warehouse"
              label="Báo cáo theo kho"
            />
            {isTypeWarehouse && (
              <SelectBoxWarehouse
                selected={warehouse}
                onChange={(option: ISelected) => {
                  setWarehouse(option);
                }}
              />
            )}
          </div>
        </div>

        <div>
          <Button onClick={handleClick}>In ra báo cáo</Button>
        </div>
      </div>

      <div className="my-4 px-8">{content}</div>
    </div>
  );
};

export default ReportWarehouse;
