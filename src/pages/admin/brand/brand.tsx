import React from "react";
import Table from "components/table/table";
import { Button, Switch } from "@material-tailwind/react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Pagination from "components/pagination/pagitnation";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import {
  useGetBrandsQuery,
  useDeleteBrandMutation,
} from "redux/api/catalog/brand";

interface BrandProps {}

const Brand: React.FC<BrandProps> = () => {
  const { data, isSuccess } = useGetBrandsQuery(null);
  const [removeBrand, { isSuccess: removeSuccess }] = useDeleteBrandMutation();

  const configData = [
    {
      label: "STT",
      render: (data: any) => {
        return data.index;
      },
    },
    {
      label: "Tên Thương Hiệu",
      render: (data: any) => {
        return (
          <div className="flex items-center gap-4">
            <img className="w-8" src={data.imageUrl} alt={data.name} />

            <p>{data.name}</p>
          </div>
        );
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
                removeBrand(data.id);
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

  let content: React.ReactNode;

  if (isSuccess) {
    const updateData = data.map((item, index) => ({
      ...item,
      index: index + 1,
    }));

    content = <Table config={configData} data={updateData}></Table>;
  }

  useEffect(() => {
    if (removeSuccess) {
      toast.success("Xoá thành công");
    }
  }, [removeSuccess]);

  return (
    <div className="px-4 ">
      <div className="flex justify-end my-4">
        <Link to="/admin/brand/add-brand">
          <Button className="flex gap-2 items-center">
            <AiOutlinePlusCircle />
            Thêm Thương hiệu
          </Button>
        </Link>
      </div>
      {content}

      <div className="flex justify-center my-8">
        <Pagination pageIndex={0} pageSize={20} totalCount={80} url="/" />
      </div>
    </div>
  );
};

export default Brand;
