import React from "react";
import Table from "components/table/table";
import { Button, Switch } from "@material-tailwind/react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Pagination from "components/pagination/pagitnation";
import { Link } from "react-router-dom";
import { useEffect } from "react";

import { toast } from "react-toastify";
import {
  useGetSpecificationsQuery,
  useDeleteSpecificationMutation,
} from "redux/api/catalog/specification";

interface SpecificationProps {}

const Specification: React.FC<SpecificationProps> = () => {
  const { data, isSuccess } = useGetSpecificationsQuery(null);
  const [removeSpecification, { isSuccess: removeSuccess }] =
    useDeleteSpecificationMutation();

  const configData = [
    {
      label: "STT",
      render: (data: any) => {
        return data.index;
      },
    },
    {
      label: "Tên đặt tả",
      render: (data: any) => {
        return data.name;
      },
    },

    {
      label: "Miêu tả",
      render: (data: any) => {
        return data.description;
      },
    },

    {
      label: "Tuỳ chọn",
      render: (data: any) => {
        return (
          <div className="flex gap-4 justify-end">
            <Button
              onClick={() => {
                removeSpecification(data.id);
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
        <Link to="/admin/specifications/add-specification">
          <Button className="flex gap-2 items-center">
            <AiOutlinePlusCircle />
            Thêm đặc tả
          </Button>
        </Link>
      </div>
      {content}
      <div className="flex justify-center my-8">
        <Pagination
          pageIndex={0}
          pageSize={20}
          totalCount={80}
          url="/admin/specifications"
        />
      </div>
    </div>
  );
};

export default Specification;
