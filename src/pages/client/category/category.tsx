import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
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
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [ pageIndex, setPageIndex] = useState(0)
  const { categoryId } = useParams();
  const { data: listCategoryGroupsData, isSuccess: listCategoryGroupsSuccess } = useGetListCategoryGroupsQuery(categoryId!);
  const { data: productAllData, isSuccess: productAllSuccess, refetch: refetchProducts } = useGetProductsQuery(`CategoryGroupId=${categoryId!}&CategoryId=${selectedType ? selectedType : ''}&${selectedSortOption ? selectedSortOption : ''}&PageIndex=${pageIndex}&PageSize=12`);
  const location = useLocation();
  const currentUrl = location.pathname + location.search;
  useEffect(() => {
    if (categoryId) {
      refetchProducts(); 
      setSelectedType(null)
    }
  }, [categoryId, refetchProducts]);

  const handleSortOptionClick = (funcKey : string) => {
    setSelectedSortOption(funcKey);

    if (categoryId) {
      refetchProducts();
    }
    
  };
  const handleSortType = (type : string) => {
    setSelectedType(type);

    if (categoryId) {
      refetchProducts();
    }
    
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
            <Sidebar data={listCategoryGroupsData.categories} onSortOptionClick={handleSortOptionClick} onSortType={handleSortType}>
              <CategoryList data={productAllData?.data} />
            </Sidebar>
          </>
        ) : (
          <div>Loading...</div>
        )}
      </div>

      <div className="flex justify-center">
        <Pagination pageIndex={pageIndex} url={currentUrl} pageSize={productAllSuccess ? productAllData.pageSize : 30} totalCount={20}  />
      </div>
    </section>
  );
};

export default CategoryPage;
