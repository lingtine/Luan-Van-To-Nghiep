import React from "react";
import { useParams } from "react-router-dom";
import { useGetProductsQuery } from "redux/api/catalog/product";
import { Breadcrumbs } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { FaHouse } from "react-icons/fa6";
import ProductList from "components/products/product-list";
import Sidebar from "./sidebar";

import Pagination from "components/pagination/pagitnation";

interface CategoryPageProps {}

const CategoryPage: React.FC<CategoryPageProps> = () => {
  const { categoryId } = useParams();

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
      <div className="flex gap-4">
        <Sidebar />
        <ProductList />
      </div>

      <div className="flex justify-center">
        <Pagination pageIndex={2} pageSize={30} totalCount={20} url="/" />
      </div>
    </section>
  );
};

export default CategoryPage;
