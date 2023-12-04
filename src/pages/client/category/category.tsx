import React, { useEffect, useState } from "react";
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
import { IProductType } from "redux/api/types";

interface CategoryPageProps {}

const CategoryPage: React.FC<CategoryPageProps> = () => {
  const { categoryId } = useParams();
  const { data: listCategoryGroupsData, isSuccess: listCategoryGroupsSuccess } = useGetListCategoryGroupsQuery(categoryId!);
  const { data: productAllData, isSuccess: productAllSuccess, refetch: refetchProducts } = useGetProductsQuery(`CategoryGroupId=${categoryId!}`);

  // Use useEffect to refetch products when categoryId changes
  useEffect(() => {
    // Ensure that categoryId is defined before attempting to refetch
    if (categoryId) {
      refetchProducts(); // Assuming refetchProducts accepts an object with parameters
    }
  }, [categoryId, refetchProducts]);
  console.log(productAllData, categoryId);
  

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
        {listCategoryGroupsSuccess ? (
          <>
            <Sidebar data={listCategoryGroupsData.categories}>
              <CategoryList data={productAllData?.data} />
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
