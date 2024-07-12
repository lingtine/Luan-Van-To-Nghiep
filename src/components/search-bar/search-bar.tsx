import useDebounce from "hooks/use-debounce";

import React, { useEffect, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

import ProductsSearch from "./products-search";
import { useGetProductsByParamsMutation } from "redux/api/catalog/product";
import { Card } from "@material-tailwind/react";
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
  }, [debounceSearch, getProducts]);
  const handleClear = () => {
    setSearchValue("");
  };

  return (
    <>
      <div
        className={`group flex flex-1 border text-base border-secondary-border-subtle rounded-full   hover:border-white px-4 py-2 min-w-[230px] items-center ${className}`}
      >
        {area ? (
          <textarea
            className="flex-1 bg-transparent border-none"
            placeholder={label ? label : "Nhập tên sản phẩm"}
          ></textarea>
        ) : (
          <>
            <input
              className="group-hover:text-white flex-1 text-secondary-border-subtle bg-transparent"
              placeholder={label ? label : "Nhập tên sản phẩm"}
              onChange={(e) => setSearchValue(e.target.value)}
              value={searchValue}
            />

            <FaMagnifyingGlass className="group-hover:text-white text-secondary-border-subtle" />
          </>
        )}
      </div>
      <Card className="absolute z-[9999999] min-w-96 w-full bg-white">
        {debounceSearch &&
          isSuccess &&
          searchValue &&
          data &&
          (data.length === 0 ? (
            <div className="p-8 shadow-xl text-sm">Không tìm thấy sản phẩm</div>
          ) : (
            <ProductsSearch onClear={handleClear} data={data} />
          ))}
      </Card>
    </>
  );
};

export default SearchBar;
