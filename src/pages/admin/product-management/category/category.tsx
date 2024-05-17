import React from "react";
import Table from "components/table/table";
import { Button, Spinner } from "@material-tailwind/react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Pagination from "components/pagination/pagitnation";
import { Link } from "react-router-dom";
import { useEffect } from "react";

import { toast } from "react-toastify";
import {
  useGetCategoriesQuery,
  useDeleteCategoryMutation,
} from "redux/api/catalog/category";
import { useParams } from "react-router-dom";
interface CategoryProps {}

const Category: React.FC<CategoryProps> = () => {
  const { index } = useParams();

  const { data, isSuccess, isLoading } = useGetCategoriesQuery({
    pageIndex: index,
  });
  const [removeCategory, { isSuccess: removeSuccess }] =
    useDeleteCategoryMutation();

  const configData = [
    {
      label: "STT",
      render: (data: any) => {
        return data.index;
      },
    },
    {
      label: "Tên Danh Mục",
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
                removeCategory(data.id);
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
    const { pageSize, pageIndex } = data;

    const updateData = data.data.map((item, index) => ({
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
            url="/admin/category"
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
        <Link to="/admin/category/add-category">
          <Button className="flex gap-2 items-center">
            <AiOutlinePlusCircle />
            Thêm danh mục
          </Button>
        </Link>
      </div>
      {content}
    </div>
  );
};

export default Category;
