import React from "react";
import Table from "components/table/table";
import Pagination from "components/pagination/pagitnation";
import { Spinner } from "@material-tailwind/react";
import { useGetCustomersQuery } from "redux/api/auth/customer-api";

interface CustomersProps {}

const Customers: React.FC<CustomersProps> = () => {
  const { data, isSuccess, isLoading } = useGetCustomersQuery(null);

  const configData = [
    {
      label: "STT",
      render: (data: any) => {
        return data.index;
      },
    },
    {
      label: "Tên Khách hàng",
      render: (data: any) => {
        return data.name;
      },
    },
    {
      label: "Tên Email",
      render: (data: any) => {
        return data.name;
      },
    },

    {
      label: "Tuỳ chọn",
      render: (data: any) => {
        return (
          <div className="flex gap-4 justify-end">
            {/* <Button>Xoá</Button> */}
          </div>
        );
      },
    },
  ];

  let content: React.ReactNode;

  if (isSuccess) {
    const updateData = data.map((item, index) => ({
      ...item,
      index: index + 1,
    }));
    content = <Table config={configData} data={updateData}></Table>;
  } else if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[100vh]">
        <Spinner className="h-12 w-12" />
      </div>
    );
  }

  return (
    <div className="px-4 ">
      {content}
      <div className="flex justify-center my-8">
        <Pagination
          pageIndex={0}
          pageSize={20}
          totalCount={80}
          url="/admin/customers"
        />
      </div>
    </div>
  );
};

export default Customers;
