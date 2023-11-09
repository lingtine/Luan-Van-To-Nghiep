import React from "react";
import Table from "components/table/table";
import { Button, Switch } from "@material-tailwind/react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Pagination from "components/pagination/pagitnation";
import { Link } from "react-router-dom";
interface CategoryGroupProps {}

const CategoryGroup: React.FC<CategoryGroupProps> = () => {
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
      render: () => {
        return (
          <div className="flex gap-4 justify-end">
            <Button color="red">Xoá</Button>
          </div>
        );
      },
    },
  ];

  const data = [
    {
      id: Math.random().toString(),
      index: 1,
      name: "iphone",
      description: "iphone 15 pro max",
    },
    {
      id: Math.random().toString(),
      index: 2,
      name: "iphone",
      description: "iphone 15 pro max",
    },
    {
      id: Math.random().toString(),
      index: 3,
      name: "iphone",
      description: "iphone 15 pro max",
    },
    {
      id: Math.random().toString(),
      index: 4,
      name: "iphone",
      description: "iphone 15 pro max",
      unitPrice: 9000000,
    },
  ];

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
      <Table config={configData} data={data}></Table>
      <div className="flex justify-center my-8">
        <Pagination pageIndex={0} pageSize={20} totalCount={80} url="/" />
      </div>
    </div>
  );
};

export default CategoryGroup;
