import React from "react";
import Table from "components/table/table";
import { Button, Spinner } from "@material-tailwind/react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Pagination from "components/pagination/pagitnation";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import {
  useGetBrandsQuery,
  useDeleteBrandMutation,
} from "redux/api/catalog/brand";
import { useParams } from "react-router-dom";

interface BrandProps {}

const Brand: React.FC<BrandProps> = () => {
  const { index } = useParams();

  const { data, isSuccess, isLoading } = useGetBrandsQuery({
    pageIndex: index,
  });
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
            <img className="w-28" src={data.imageUrl} alt={data.name} />

            {/* <p>{data.name}</p> */}
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

  useEffect(() => {
    if (removeSuccess) {
      toast.success("Xoá thành công");
    }
  }, [removeSuccess]);
  let content: React.ReactNode;

  if (isSuccess && data) {
    const updateData = data.data.map((item, index) => ({
      ...item,
      index: index + 1,
    }));

    content = (
      <>
        <Table config={configData} data={updateData}></Table>;
        <div className="flex justify-center my-8">
          <Pagination
            pageIndex={data.pageIndex}
            pageSize={data.pageSize}
            totalCount={data.totalCount}
            url={"/admin/brand"}
          />
        </div>
        ;
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
        <Link to="/admin/brand/add-brand">
          <Button className="flex gap-2 items-center">
            <AiOutlinePlusCircle />
            Thêm Thương hiệu
          </Button>
        </Link>
      </div>
      {content}
    </div>
  );
};

export default Brand;
