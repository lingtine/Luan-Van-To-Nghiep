import React, { useEffect, useState } from "react";
import Sidebar from "./components/sidebar";
import CategoryList from "./components/category-list";

import { useGetProductsQuery } from "redux/api/catalog/product";
import { useParams } from "react-router-dom";

import PaginationClient from "components/pagination/pagitcation-client";
import { ICategory } from "share/types/category";

import { Button } from "@material-tailwind/react";
import SelectBox from "components/select-box/select-box";
import { ISelected } from "components/select-box/select-box";
interface CategoryPageProps {}

interface ISort extends ISelected {
  IsOrderDesc: boolean;
  OrderBy: string;
}

const CategoryPage: React.FC<CategoryPageProps> = () => {
  const { categoryId } = useParams();
  const [sort, setSort] = useState<null | ISort>(null);
  const [pageCurrent, setPageCurrent] = useState<number>(0);
  const [categories, setCategories] = useState<ICategory[] | null>(null);
  const [isInStock, setIsInStock] = useState<{ status: boolean } | null>(null);

  const { data, isSuccess } = useGetProductsQuery({
    CategoryGroupId: categoryId,
    PageIndex: pageCurrent,
    PageSize: 24,

    IsInStock: isInStock?.status,
    OrderBy: sort?.OrderBy,
    IsOrderDesc: sort?.IsOrderDesc,
  });

  const handleChangePageIndex = (index: number) => {
    setPageCurrent(index);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    setSort(null);
    handleCleanFilter();
  }, [categoryId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pageCurrent]);
  const handleChangeCategories = (item: ICategory) => {
    setCategories(() => {
      if (categories) {
        const category = categories.find((category) => category.id === item.id);

        return category
          ? categories.filter(function (category) {
              return category.id !== item.id;
            })
          : [...categories, item];
      } else {
        return [item];
      }
    });
    setPageCurrent(0);
  };
  const handleChangeIsInStock = (status: boolean | null) => {
    if (status === null) {
      setIsInStock(null);
    } else {
      setIsInStock({ status });
    }
    setPageCurrent(0);
  };

  const handleCleanFilter = () => {
    setCategories(null);
    setIsInStock(null);
    setPageCurrent(0);
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
      <div className="container flex flex-wrap lg:-mx-4   my-8">
        <div className="flex-[0_0_100%] max-w-[100%] lg:flex-[0_0_25%] lg:max-w-[25%] p-4">
          <Sidebar
            categories={categories}
            onChangeCategories={handleChangeCategories}
            isInStock={isInStock}
            onChangeIsInStock={handleChangeIsInStock}
          />
          <Button
            onClick={handleCleanFilter}
            fullWidth
            disabled={categories === null && isInStock === null}
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
              <CategoryList data={data.data} />
              <div className="flex justify-center my-8">
                <PaginationClient
                  onChange={handleChangePageIndex}
                  pageIndex={pageCurrent}
                  pageSize={data.pageSize}
                  totalNumber={data.totalCount}
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
