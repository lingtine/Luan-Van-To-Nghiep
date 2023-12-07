import React from "react";
import Table from "components/table/table";
import { Button, Spinner } from "@material-tailwind/react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import {
  useGetCategoryGroupsQuery,
  useDeleteCategoryGroupMutation,
} from "redux/api/catalog/category-group";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
interface CategoryGroupProps {}

const CategoryGroup: React.FC<CategoryGroupProps> = () => {
  const { index } = useParams();

  const { data, isLoading, isSuccess } = useGetCategoryGroupsQuery({
    pageIndex: index,
  });
  const [removeCategoryGroup, { isSuccess: removeIsSuccess }] =
    useDeleteCategoryGroupMutation();
  const configData = [
    {
      label: "STT",
      render: (data: any) => {
        return data.index;
      },
    },
    {
      label: "Tên Nhóm Danh Mục",
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
                removeCategoryGroup(data.id);
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
    if (removeIsSuccess) {
      toast.success("Xoá thành công");
    }
  }, [removeIsSuccess]);

  let content: React.ReactNode;
  if (isSuccess) {
    const { pageSize, pageIndex } = data;

    const dataUpdate = data.data.map((item, index) => ({
      ...item,
      index: index + 1 + pageIndex * pageSize,
    }));
    content = <Table config={configData} data={dataUpdate}></Table>;
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
        <Link to="/admin/category-group/add-category-group">
          <Button className="flex gap-2 items-center">
            <AiOutlinePlusCircle />
            Thêm Nhóm Danh Mục
          </Button>
        </Link>
      </div>
      {content}
    </div>
  );
};

export default CategoryGroup;
