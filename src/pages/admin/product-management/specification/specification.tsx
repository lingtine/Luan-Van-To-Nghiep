import React from "react";
import Table from "components/table/table";
import { Button, Spinner } from "@material-tailwind/react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Pagination from "components/pagination/pagitnation";
import { Link } from "react-router-dom";
import { useEffect } from "react";

import { toast } from "react-toastify";
import {
  useGetSpecificationsQuery,
  useDeleteSpecificationMutation,
} from "redux/api/catalog/specification";
import { useParams } from "react-router-dom";

import { ISpecification } from "share/types/specification";

interface ISpecificationTable extends ISpecification {
  index: number;
}

const Specification = () => {
  const { index } = useParams();
  const { data, isSuccess, isLoading } = useGetSpecificationsQuery({
    PageIndex: index,
  });

  const [removeSpecification, { isSuccess: removeSuccess }] =
    useDeleteSpecificationMutation();

  const configData = [
    {
      label: "STT",
      render: (data: ISpecificationTable) => {
        return data.index;
      },
    },
    {
      label: "Tên đặt tả",
      render: (data: ISpecificationTable) => {
        return data.name;
      },
    },

    {
      label: "Miêu tả",
      render: (data: ISpecificationTable) => {
        return data.description;
      },
    },

    {
      label: "Tuỳ chọn",
      render: (data: ISpecificationTable) => {
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
    const { pageIndex, pageSize } = data;

    const updateData: ISpecificationTable[] = data.data.map((item, index) => ({
      ...item,
      index: index + 1 + pageIndex * pageSize,
    }));
    content = (
      <>
        <Table config={configData} data={updateData}></Table>
        <div className="flex justify-center my-8">
          <Pagination
            pageIndex={data.pageIndex}
            pageSize={data.pageSize}
            totalCount={data.totalCount}
            url="/admin/specifications"
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
        <Link to="/admin/specifications/add-specification">
          <Button className="flex gap-2 items-center">
            <AiOutlinePlusCircle />
            Thêm đặc tả
          </Button>
        </Link>
      </div>
      {content}
    </div>
  );
};

export default Specification;
