import { useEffect } from "react";

import { useParams, useSearchParams } from "react-router-dom";
import { Spinner } from "@material-tailwind/react";
import { useFilterProductByParameterMutation } from "redux/api/catalog/product";
import { useAppSelector, useAppDispatch } from "redux/store";
import {
  handleChangePage,
  handleClearFilter,
} from "redux/features/products/product-filter-slice";

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

  const handleReload = () => {
    window.scrollTo({ top: 0 });
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
  };
  useEffect(() => {
    handleReload();
    console.log(sort);
  }, [pageIndex, sort]);
  useEffect(() => {
    if (categoryId) {
      handleClearFilter();
      filterProductByParameter({
        groupId: categoryId,
        pageIndex: 0,
        pageSize: 24,
      });
    }
  }, [categoryId, filterProductByParameter]);

  let content;

  if (result.isSuccess) {
    const { data } = result;

    if (data.data.length === 0) {
      content = <div>Không tìm thấy sản phẩm nào</div>;
    } else {
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
  } else if (result.isLoading) {
    content = (
      <div className="h-full w-full flex justify-center">
        <Spinner className="w-12 h-12" />
      </div>
    );
  }
  return (
    <div className="container my-8">
      <h2 className="text-2xl mx-4 lg:mx-0">Sản phẩm</h2>
      <div className="container flex flex-wrap lg:-mx-4 my-8">
        <div className="flex-[0_0_100%] max-w-[100%] md:flex-[0_0_50%] md:max-w-[50%] xl:flex-[0_0_25%] xl:max-w-[25%] p-4">
          <CategorySidebar onFilter={handleReload} groupId={categoryId || ""} />
        </div>
        <div className="flex-[0_0_100%] max-w-[100%] md:flex-[0_0_50%] md:max-w-[50%] xl:flex-[0_0_75%] xl:max-w-[75%] p-4">
          <ProductSort />

          {content}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
