import React from "react";
import Pagination from "components/pagination/pagitnation";
import { Spinner } from "@material-tailwind/react";
import { useGetCustomersQuery } from "redux/api/auth/customer-api";
import { useParams } from "react-router-dom";
import { IUserDetail } from "redux/api/types";
import CustomerTable from "./customer-table";

interface ICustomerTable extends IUserDetail {
  index: number;
}

const Customers = () => {
  const { index } = useParams();
  const { data, isSuccess, isLoading } = useGetCustomersQuery({
    pageIndex: index,
  });

  let content: React.ReactNode;

  if (isSuccess) {
    const { pageSize, pageIndex } = data;
    const updateData: ICustomerTable[] = data.data.map((item, index) => ({
      ...item,
      index: index + 1 + pageIndex * pageSize,
    }));
    content = (
      <div>
        <CustomerTable data={updateData}></CustomerTable>
        <div className="flex justify-center my-8">
          <Pagination
            pageIndex={data.pageIndex}
            pageSize={data.pageSize}
            totalCount={data.totalCount}
            url="/admin/customers"
          />
        </div>
      </div>
    );
  } else if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[100vh]">
        <Spinner className="h-12 w-12" />
      </div>
    );
  }

  return <div className="px-4 ">{content}</div>;
};

export default Customers;
