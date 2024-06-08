import { useState } from "react";

import { Button, Spinner } from "@material-tailwind/react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { useGetCategoriesQuery } from "redux/api/catalog/category";
import { ICategoryTable } from "share/types/category";
import Pagination from "components/pagination/pagitnation";
import CategoryTable from "./category-table";
import ModalAddCategory from "./modal-add-category";

const Category = () => {
  const { index } = useParams();
  const [isAddNewCategory, setIsAddNewCategory] = useState(false);

  const { data, isSuccess, isLoading } = useGetCategoriesQuery({
    PageIndex: index,
  });

  const handleToggleAddNew = () => {
    setIsAddNewCategory(!isAddNewCategory);
  };
  let content;
  if (isSuccess) {
    const { pageSize, pageIndex } = data;

    const updateData: ICategoryTable[] = data.data.map((item, index) => ({
      ...item,
      index: index + 1 + pageIndex * pageSize,
    }));
    content = (
      <>
        <CategoryTable data={updateData} />
        <div className="flex justify-center my-8">
          <Pagination
            pageIndex={data.pageIndex}
            pageSize={data.pageSize}
            totalCount={data.totalCount}
            url={"/admin/category"}
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
    <div className="px-4">
      <div className="flex justify-end my-4">
        <Button
          className="flex gap-2 items-center"
          onClick={handleToggleAddNew}
        >
          <AiOutlinePlusCircle />
          Thêm danh mục
        </Button>
      </div>
      {content}

      {isAddNewCategory && <ModalAddCategory onToggle={handleToggleAddNew} />}
    </div>
  );
};

export default Category;
