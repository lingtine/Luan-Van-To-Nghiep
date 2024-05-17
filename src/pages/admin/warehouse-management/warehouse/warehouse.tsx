import React from "react";
import Table from "components/table/table";
import { Button, Spinner } from "@material-tailwind/react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Pagination from "components/pagination/pagitnation";
import { Link } from "react-router-dom";
import { useEffect } from "react";

import { toast } from "react-toastify";
import {
  useGetWarehousesQuery,
  useRemoveWarehouseMutation,
} from "redux/api/warehouse/warehouse";
import { useParams } from "react-router-dom";
interface WarehouseProps {}

const Warehouse: React.FC<WarehouseProps> = () => {
  const { index } = useParams();
  const { data, isSuccess, isLoading } = useGetWarehousesQuery({
    pageIndex: index,
    pageSize: 20,
  });
  const [removeWarehouse, { isSuccess: removeSuccess }] =
    useRemoveWarehouseMutation();

  const configData = [
    {
      label: "STT",
      render: (data: any) => {
        return data.index;
      },
    },
    {
      label: "Tên Kho",
      render: (data: any) => {
        return <div className="min-w-[100px]">{data.name}</div>;
      },
    },
    {
      label: "Địa chỉ",
      render: (data: any) => {
        return data.address;
      },
    },
    {
      label: "Email",
      render: (data: any) => {
        return data.email;
      },
    },
    {
      label: "Hotline",
      render: (data: any) => {
        return data.hotLine;
      },
    },

    {
      label: "Fax",
      render: (data: any) => {
        return data.fax;
      },
    },

    // {
    //   label: "Miêu tả",
    //   render: (data: any) => {
    //     return data.description;
    //   },
    // },

    {
      label: "Loại kho",
      render: (data: any) => {
        return data.type;
      },
    },

    {
      label: "Tuỳ chọn",
      render: (data: any) => {
        return (
          <div className="flex gap-4 justify-end">
            <Button
              onClick={() => {
                removeWarehouse(data.id);
              }}
              color="red"
            >
              Xoá
            </Button>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    if (removeSuccess) {
      toast.success("Xoá thành công");
    }
  }, [removeSuccess]);

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
            url="/admin/warehouses"
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
      <div className="flex justify-end my-4">
        <Link to="/admin/warehouses/add-warehouse">
          <Button className="flex gap-2 items-center">
            <AiOutlinePlusCircle />
            Thêm kho
          </Button>
        </Link>
      </div>
      {content}
    </div>
  );
};

export default Warehouse;
