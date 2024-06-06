import React from "react";
import BoxTemplate from "components/box-template/box-template";
import { Link } from "react-router-dom";
import { useGetAllCategoryGroupsQuery } from "redux/api/catalog/category-group";

interface CategoriesProps {}

const Categories: React.FC<CategoriesProps> = () => {
  const { data, isSuccess } = useGetAllCategoryGroupsQuery();

  let content;
  if (isSuccess) {
    content = data.map((category: any) => {
      return (
        <li
          className="rounded flex-[0_0_42%] md:flex-[0_0_20%] text-sm  p-4  xl:py-6 xl:px-14 border border-black flex flex-col justify-center items-center hover:border-secondary-3 hover:bg-secondary-3 hover:text-white"
          key={category.id}
        >
          <Link to={"/category/" + category.id}>{category.name}</Link>
        </li>
      );
    });
  }

  return (
    <>
      {
        <BoxTemplate
          title="Tìm kiếm bằng danh mục"
          heading="Thể loại"
          data={data}
        >
          <div className="py-10 px-8 flex justify-between flex-wrap gap-4">
            {content}
          </div>
        </BoxTemplate>
      }
    </>
  );
};

export default Categories;
