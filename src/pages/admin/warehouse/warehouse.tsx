import React from "react";
import Table from "components/table/table";
import { Button } from "@material-tailwind/react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Pagination from "components/pagination/pagitnation";
import { Link } from "react-router-dom";
import { useEffect } from "react";

import { toast } from "react-toastify";
import {
  useGetWarehousesQuery,
  useRemoveWarehouseMutation,
} from "redux/api/warehouse/warehouse";

interface WarehouseProps {}

const Warehouse: React.FC<WarehouseProps> = () => {
  const { data, isSuccess } = useGetWarehousesQuery(null);
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
        return data.name;
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

    {
      label: "Miêu tả",
      render: (data: any) => {
        return data.description;
      },
    },

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
    const updateData = data.map((item, index) => ({
      ...item,
      index: index + 1,
    }));
    content = <Table config={configData} data={updateData}></Table>;
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
      <div className="flex justify-center my-8">
        <Pagination
          pageIndex={0}
          pageSize={20}
          totalCount={80}
          url="/admin/warehouses"
        />
      </div>
    </div>
  );
};

export default Warehouse;
