import { useEffect, useState } from "react";
import CategoryList from "./components/category-list";

import { useParams } from "react-router-dom";
import {
  useFilterProductByParameterMutation,
  useGetProductsQuery,
} from "redux/api/catalog/product";

import PaginationClient from "components/pagination/pagitcation-client";

import { IFilterProduct } from "redux/api/types";

import { IProductDetail } from "share/types/product";

import CategorySidebar from "./components/CategorySidebar";
import { Button } from "@material-tailwind/react";
import SelectBox, { ISelected } from "components/select-box/select-box";

interface ISort extends ISelected {
  IsOrderDesc: boolean;
  OrderBy: string;
}

const CategoryPage = () => {
  const { categoryId } = useParams();
  const [sort, setSort] = useState<ISort>();
  const [pageCurrent, setPageCurrent] = useState<number>(0);
  const [isInStock, setIsInStock] = useState<{ status: boolean } | null>(null);
  const [products, setProducts] = useState<IProductDetail[]>([]);
  const [isClear, setIsClear] = useState(false);

  const [productData, setProductData] = useState<{
    products: IProductDetail[];
    pageIndex: number;
    pageSize: number;
    totalCount: number;
  }>({
    products: [],
    pageIndex: pageCurrent,
    pageSize: 24,
    totalCount: 1,
  });

  const [filterProductByParameter, result] =
    useFilterProductByParameterMutation();

  const { data, isSuccess } = useGetProductsQuery({
    CategoryGroupId: categoryId,
    PageIndex: pageCurrent.toString(),
    PageSize: 24,

    IsInStock: isInStock?.status,
  });

  const handleChangePageIndex = (index: number) => {
    setPageCurrent(index);
  };

  useEffect(() => {
    setProducts(data?.data ?? []);

    setProductData({
      products: data?.data ?? [],
      pageIndex: data?.pageIndex ?? 0,
      pageSize: data?.pageSize ?? 24,
      totalCount: data?.totalCount ?? 24,
    });
  }, [data?.data]);

  useEffect(() => {
    setProducts(result.data?.data ?? []);
    setProductData({
      products: result.data?.data ?? [],
      pageIndex: result.data?.pageIndex ?? 0,
      pageSize: result.data?.pageSize ?? 24,
      totalCount: result.data?.totalCount ?? 24,
    });
  }, [result.data]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setSort(undefined);
    handleCleanFilter();
  }, [categoryId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pageCurrent]);

  // const handleChangeCategories = (item: ICategory) => {
  //   setCategories(() => {
  //     if (categories) {
  //       const category = categories.find((category) => category.id === item.id);

  //       return category
  //         ? categories.filter(function (category) {
  //             return category.id !== item.id;
  //           })
  //         : [...categories, item];
  //     } else {
  //       return [item];
  //     }
  //   });
  //   setPageCurrent(0);
  // };

  // const handleChangeIsInStock = (status: boolean | null) => {
  //   if (status === null) {
  //     setIsInStock(null);
  //   } else {
  //     setIsInStock({ status });
  //   }
  //   setPageCurrent(0);
  // };

  const handleCleanFilter = () => {
    setIsClear((prev) => !prev);
    setPageCurrent(0);
    setProducts(data?.data ?? []);
  };

  const handleFilter = (parameters: {
    brandIds: string[];
    categoryIds: string[];
    filterValues: IFilterProduct[];
  }) => {
    filterProductByParameter({
      pageSize: 24,
      pageIndex: pageCurrent,
      categoryIds: parameters.categoryIds,
      brandIds: parameters.brandIds,
      filterValues: parameters.filterValues,
    });
  };

  const options: ISort[] = [
    {
      id: Math.random.toString(),
      label: "Giá từ thấp tới cao",
      IsOrderDesc: false,
      OrderBy: "Price",
    },
    {
      id: Math.random.toString(),
      label: "Giá từ cao tới thấp",
      IsOrderDesc: true,
      OrderBy: "Price",
    },
    {
      id: Math.random.toString(),
      label: "A đến Z",
      IsOrderDesc: false,
      OrderBy: "Name",
    },
    {
      id: Math.random.toString(),
      label: "Z đến A",
      IsOrderDesc: true,
      OrderBy: "name",
    },
  ];

  return (
    <div className="container my-8">
      <h2 className="text-2xl mx-4 lg:mx-0">Sản phẩm</h2>
      <div className="container flex flex-wrap lg:-mx-4 my-8">
        <div className="flex-[0_0_100%] max-w-[100%] lg:flex-[0_0_25%] lg:max-w-[25%] p-4">
          {/* <Sidebar
            categories={categories}
            onChangeCategories={handleChangeCategories}
            isInStock={isInStock}
            onChangeIsInStock={handleChangeIsInStock}
          /> */}

          <CategorySidebar
            isClear={isClear}
            groupId={categoryId ?? ""}
            onFilter={handleFilter}
          />

          <Button
            className="mt-4"
            onClick={handleCleanFilter}
            fullWidth
            // disabled
          >
            Xoá bộ lọc
          </Button>
        </div>
        <div className=" flex-[0_0_100%] max-w-[100%] lg:flex-[0_0_75%] lg:max-w-[75%] p-4">
          <div className="flex justify-end w-full mb-8">
            <SelectBox
              label="Sắp xếp"
              onChange={(option: ISort) => {
                setSort(option);
              }}
              selected={sort}
              options={options}
            />
          </div>

          {isSuccess && (
            <>
              <CategoryList data={productData.products} />
              <div className="flex justify-center my-8">
                <PaginationClient
                  onChange={handleChangePageIndex}
                  pageIndex={pageCurrent}
                  pageSize={productData.pageSize}
                  totalNumber={productData.totalCount}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
