import useDebounce from "hooks/use-debounce";

import React, { useEffect, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

import ProductsSearch from "./products-search";
import { useGetProductsByParamsMutation } from "redux/api/catalog/product";
interface SearchBarProps {
  className?: string;
  label?: string;
  area?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ className, label, area }) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [getProducts, { isSuccess, data }] = useGetProductsByParamsMutation();
  const debounceSearch = useDebounce(searchValue, 500) as string;

  useEffect(() => {
    debounceSearch.trim();

    if (debounceSearch !== "") {
      getProducts({ Keyword: debounceSearch, PageSize: 10 });
    }
  }, [debounceSearch]);
  const handleClear = () => {
    setSearchValue("");
  };

  return (
    <>
      <div
        className={`flex flex-1 border text-base border-primary-1 px-4 py-2 min-w-[230px] items-center rounded-lg ${className}`}
      >
        {area ? (
          <textarea
            className="flex-1 bg-transparent border-none"
            placeholder={label ? label : "Nhập tên sản phẩm"}
          ></textarea>
        ) : (
          <>
            <input
              className="flex-1 bg-transparent"
              placeholder={label ? label : "Nhập tên sản phẩm"}
              onChange={(e) => setSearchValue(e.target.value)}
              value={searchValue}
            />
            <span>
              <FaMagnifyingGlass />
            </span>
          </>
        )}
      </div>
      <div className="absolute z-50 w-full bg-white  ">
        {debounceSearch &&
          isSuccess &&
          searchValue &&
          data &&
          (data.length === 0 ? (
            <div className="p-8 shadow-xl text-sm">Không tìm thấy sản phẩm</div>
          ) : (
            <ProductsSearch onClear={handleClear} data={data} />
          ))}
      </div>
    </>
  );
};

export default SearchBar;
