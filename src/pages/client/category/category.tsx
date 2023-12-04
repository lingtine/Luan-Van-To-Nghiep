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
  const [selectedSortOption, setSelectedSortOption] = useState<string | null>(null);
  const { categoryId } = useParams();
  const { data: listCategoryGroupsData, isSuccess: listCategoryGroupsSuccess } = useGetListCategoryGroupsQuery(categoryId!);
  const { data: productAllData, isSuccess: productAllSuccess, refetch: refetchProducts } = useGetProductsQuery(`CategoryGroupId=${categoryId!}&${selectedSortOption}`);

  useEffect(() => {

    if (categoryId) {
      refetchProducts(); 
    }
  }, [categoryId, refetchProducts]);
  
  const handleSortOptionClick = (funcKey : string) => {
    // Update the state with the selected sort option funcKey
    setSelectedSortOption(funcKey);

    if (categoryId) {
      refetchProducts();
    }
    console.log(selectedSortOption);
    
  };
  

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
            <Sidebar data={listCategoryGroupsData.categories} onSortOptionClick={handleSortOptionClick}>
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
