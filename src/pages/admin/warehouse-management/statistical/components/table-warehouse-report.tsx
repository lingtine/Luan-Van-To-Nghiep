import React from "react";
import Table from "components/table/table";
import { ITransportReport, IProductReport } from "share/types/report";

interface TableWarehouseReportProps {
  data: ITransportReport[] | IProductReport[];
  type: boolean;
}

const TableWarehouseReport: React.FC<TableWarehouseReportProps> = ({
  data,
  type,
}) => {
  const updateData = data.map((item: {}, index) => ({
    ...item,
    index: index + 1,
  }));
  const configData = [
    {
      label: "STT",
      render: (data: any) => {
        return data.index;
      },
    },
    {
      label: "Ngày Nhận",
      render: (data: any) => {
        return data.goodsTransportName;
      },
    },
    {
      label: "Hãng Giao",
      render: (data: any) => {
        return data.from;
      },
    },
    {
      label: "Kho Nhận",
      render: (data: any) => {
        return data.to;
      },
    },

    {
      label: "Tên sản phẩm",
      render: (data: any) => {
        return data.productName;
      },
    },
    {
      label: "Số lượng",
      render: (data: any) => {
        return data.quantity;
      },
    },
  ];
  const configData2 = [
    {
      label: "STT",
      render: (data: any) => {
        return data.index;
      },
    },
    {
      label: "SKU",
      render: (data: any) => {
        return data.sku;
      },
    },
    {
      label: "Tên sản phẩm",
      render: (data: any) => {
        return data.productName;
      },
    },
    {
      label: "Tên Kho",
      render: (data: any) => {
        return data.warehouseName;
      },
    },

    {
      label: "Số lượng sản phẩm",
      render: (data: any) => {
        return data.inStockQuantity;
      },
    },
  ];

  return <Table config={type ? configData2 : configData} data={updateData} />;
};

export default TableWarehouseReport;
