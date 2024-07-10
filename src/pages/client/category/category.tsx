import { useEffect, useCallback } from "react";

import { useParams } from "react-router-dom";
import { useFilterProductByParameterMutation } from "redux/api/catalog/product";
import { useAppSelector, useAppDispatch } from "redux/store";
import { handleChangePage } from "redux/features/products/product-filter-slice";

import PaginationClient from "components/pagination/pagitcation-client";
import CategorySidebar from "./components/CategorySidebar";
import ProductList from "./components/product-list";
import ProductSort from "./components/product-sort";

const CategoryPage = () => {
  const { categoryId } = useParams();
  const { sort, brandIds, categoryIds, filterValues, pageIndex, pageSize } =
    useAppSelector((state) => state.productFilterSlice);

  const dispatch = useAppDispatch();

  const [filterProductByParameter, result] =
    useFilterProductByParameterMutation();

  const handleReload = useCallback(() => {
    if (categoryId) {
      filterProductByParameter({
        groupId: categoryId,
        categoryIds: categoryIds.length === 0 ? undefined : categoryIds,
        filterValues: filterValues.length === 0 ? undefined : filterValues,
        brandIds: brandIds.length === 0 ? undefined : brandIds,
        pageIndex: pageIndex,
        pageSize: pageSize,
        sort: sort?.value,
      });
    }
  }, [
    categoryId,
    filterProductByParameter,
    sort?.value,
    brandIds,
    filterValues,
    categoryIds,
    pageIndex,
    pageSize,
  ]);

  useEffect(() => {
    handleReload();
  }, [handleReload]);

  let content;

  if (result.isSuccess) {
    const { data } = result;
    content = (
      <>
        <ProductList data={data.data} />
        <div className="flex justify-center my-8">
          <PaginationClient
            onChange={(pageIndex: number) => {
              dispatch(handleChangePage(pageIndex));
            }}
            pageIndex={data.pageIndex}
            pageSize={data.pageSize}
            totalNumber={data.totalCount}
          />
        </div>
      </>
    );
  }
  return (
    <div className="container my-8">
      <h2 className="text-2xl mx-4 lg:mx-0">Sản phẩm</h2>
      <div className="container flex flex-wrap lg:-mx-4 my-8">
        <div className="flex-[0_0_100%] max-w-[100%] lg:flex-[0_0_25%] lg:max-w-[25%] p-4">
          <CategorySidebar onFilter={handleReload} groupId={categoryId || ""} />
        </div>
        <div className="flex-[0_0_100%] max-w-[100%] lg:flex-[0_0_75%] lg:max-w-[75%] p-4">
          <ProductSort />

          {content}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
