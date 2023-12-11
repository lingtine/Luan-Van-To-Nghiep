import React from "react";
import BoxTemplate from "components/box-template/box-template";
import { useGetAllCategoryGroupsQuery } from "redux/api/catalog/category-group";
import { Link } from "react-router-dom";

interface CategoriesProps {}

const Categories: React.FC<CategoriesProps> = () => {
  const { data, isSuccess, isLoading } = useGetAllCategoryGroupsQuery(null);

  let content;
  if (isSuccess) {
    content = data.map((category: any) => {
      return (
        <li
          className="rounded py-6 px-14 border border-black flex flex-col justify-center items-center hover:border-secondary-3 hover:bg-secondary-3 hover:text-white"
          key={category.id}
        >
          <Link to={"category/" + category.id}>
            <p className="text-base ">{category.name}</p>
          </Link>
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
          <div className="py-16 flex justify-between">{content}</div>
        </BoxTemplate>
      }
    </>
  );
};

export default Categories;
