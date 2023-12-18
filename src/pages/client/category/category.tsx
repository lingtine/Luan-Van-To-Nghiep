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
  const [selectedSortOption, setSelectedSortOption] = useState<string | null>(
    null
  );
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [pageIndex, setPageIndex] = useState(0);
  const { categoryId } = useParams();
  const { data: listCategoryGroupsData, isSuccess: listCategoryGroupsSuccess } =
    useGetListCategoryGroupsQuery(categoryId!);
    const [oldType, setOldType] = useState<any>('');
  const {
    data: productAllData,
    isSuccess: productAllSuccess,
    refetch: refetchProducts,
  } = useGetProductsQuery(
    `CategoryGroupId=${categoryId!}&CategoryId=${
      selectedType ? selectedType : ""
    }&${
      selectedSortOption ? selectedSortOption : ""
    }&PageIndex=${pageIndex}&PageSize=12`
  );
  
  const location = useLocation();
  const currentUrl = window.location.pathname
  const lastSlashIndex = currentUrl.lastIndexOf('/');
  const desiredPart = currentUrl.substring(0, lastSlashIndex);
  
  useEffect(() => {
    if (categoryId) {
      refetchProducts();
      setSelectedType(null);
    }
    if(oldType === selectedType) {
      setSelectedType(null);
      refetchProducts();
    } else {

    }
  const urlPath = window.location.href
  const parts = urlPath.split('/');
  const desiredPart = parts[parts.length - 1];
  setPageIndex(Number(desiredPart) - 1)
  }, [categoryId, refetchProducts]);

  const handleSortOptionClick = (funcKey: string) => {
    setSelectedSortOption(funcKey);
    console.log(funcKey);
    
    if (categoryId) {
      refetchProducts();
    }
  };
  const handleSortType = (type: string) => {
    setOldType(selectedType)
    console.log('old', oldType);
    console.log('new', type , selectedType);
    if(oldType === selectedType || oldType == null) {
      setSelectedType(null);
      refetchProducts();
    } else {
      setSelectedType(type);
      refetchProducts();
    }
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
            <Sidebar
              data={listCategoryGroupsData.categories}
              onSortOptionClick={handleSortOptionClick}
              onSortType={handleSortType}
            >
              <CategoryList data={productAllData?.data} />
            </Sidebar>
          </>
        ) : (
          <div>Loading...</div>
        )}
      </div>

      <div className="flex justify-center">
        <Pagination
          pageIndex={pageIndex}
          url={desiredPart}
          pageSize={productAllSuccess ? productAllData.pageSize : 30}
          totalCount={20}
        />
      </div>
    </section>
  );
};

export default CategoryPage;
