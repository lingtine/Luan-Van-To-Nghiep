import { useState } from "react";

import { Spinner } from "@material-tailwind/react";
import { Button } from "@mui/material";
import Pagination from "components/pagination/pagitnation";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { useGetCategoriesQuery } from "redux/api/catalog/category";
import CategoryTable from "./Components/CategoryTable";
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

    content = (
      <>
        <CategoryTable rows={data.data} />
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
          color="success"
          variant="contained"
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
