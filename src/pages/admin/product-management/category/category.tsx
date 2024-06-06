import React, { useState } from "react";
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
import { ICategory } from "share/types/category";
import {
  ConfirmDialog,
  IContentConfirm,
} from "components/confirm-dialog/confirm-dialog";

interface ICategoryTable extends ICategory {
  index: number;
}

const Category = () => {
  const { index } = useParams();
  const [categoryRemove, setCategoryRemove] = useState<IContentConfirm>();

  const { data, isSuccess, isLoading } = useGetCategoriesQuery({
    PageIndex: index,
  });
  const [removeCategory, { isSuccess: removeSuccess }] =
    useDeleteCategoryMutation();
  const handleCategoryRemove = (data?: IContentConfirm) => {
    if (data) {
      setCategoryRemove(() => {
        return data;
      });
    } else {
      setCategoryRemove(undefined);
    }
  };
  const configData = [
    {
      label: "STT",
      render: (data: ICategoryTable) => {
        return data.index;
      },
    },
    {
      label: "Tên Danh Mục",
      render: (data: ICategoryTable) => {
        return data.name;
      },
    },

    // Add category group
    {
      label: "Nhóm danh Mục",
      render: (data: ICategoryTable) => {
        return data.categoryGroup?.name;
      },
    },

    {
      label: "Miêu tả",
      render: (data: ICategoryTable) => {
        return data.description;
      },
    },

    {
      label: "Tuỳ chọn",
      render: (data: ICategoryTable) => {
        return (
          <div className="flex gap-4 justify-end">
            <Button
              onClick={() => {
                handleCategoryRemove({
                  id: data.id,
                  title: `Bạn có muốn xoá danh mục ${data.name}`,
                  content:
                    "Thao tác này sẽ xóa bản ghi. Một khi đã xóa thì không thể khôi phục lại.",
                });
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

    const updateData: ICategoryTable[] = data.data.map((item, index) => ({
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
      <ConfirmDialog
        data={categoryRemove}
        setData={handleCategoryRemove}
        handleConfirm={() => {
          if (categoryRemove) {
            removeCategory(categoryRemove.id);
            handleCategoryRemove();
          }
        }}
      />
    </div>
  );
};

export default Category;
