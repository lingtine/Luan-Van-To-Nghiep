import React from "react";
import Table from "components/table/table";
import { IUserDetail } from "redux/api/types";

interface ICustomerTable extends IUserDetail {
  index: number;
}

function CustomerTable({ data }: { data: ICustomerTable[] }) {
  const configData = [
    {
      label: "STT",
      render: (data: ICustomerTable) => {
        return data.index;
      },
    },
    {
      label: "Tên Khách hàng",
      render: (data: ICustomerTable) => {
        return data.name;
      },
    },
    {
      label: "Tên Email",
      render: (data: ICustomerTable) => {
        return data.name;
      },
    },
  ];
  return <Table config={configData} data={data}></Table>;
}

export default CustomerTable;
