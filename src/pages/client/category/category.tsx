import React from "react";
import { useParams } from "react-router-dom";
import { useGetProductsQuery } from "redux/api/catalog/product";
import { Breadcrumbs } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { FaHouse } from "react-icons/fa6";
import ProductList from "components/products/product-list";
import Sidebar from "./sidebar";

import Pagination from "components/pagination/pagitnation";
import ProductsList from "components/products/products-list";
import { useGetCategoryQuery } from "redux/api/catalog/category";
import { useGetListCategoryGroupsQuery } from "redux/api/catalog/category-group";
import CategoryList from "./category-list";

interface CategoryPageProps {}

const CategoryPage: React.FC<CategoryPageProps> = () => {
  const { categoryId } = useParams();
  const { data, isSuccess } = useGetListCategoryGroupsQuery(categoryId!);
  console.log(categoryId, data);

  return (
    <section className="container">
      <div className="my-8">
        <Breadcrumbs>
          <Link to={"/"}>
            <FaHouse />
          </Link>
          <Link to={"/categoryId"}>
            <FaHouse />
          </Link>
        </Breadcrumbs>
      </div>
      <div className="flex gap-4 my-8">
        {isSuccess ? (
          <>
            <Sidebar data={data.categories}>
              <CategoryList data={data.categories} />
            </Sidebar>
          </>
        ) : (
          <div>Loading...</div>
        )}
      </div>

      <div className="flex justify-center">
        <Pagination pageIndex={2} pageSize={30} totalCount={20} url="/" />
      </div>
    </section>
  );
};

export default CategoryPage;
