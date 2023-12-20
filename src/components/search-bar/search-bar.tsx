import useDebounce from "hooks/use-debounce";
import MeiliSearch from "meilisearch";
import React, { useEffect, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

import { formatVND } from "utils/formatVND";

import { useNavigate } from "react-router-dom";
interface SearchBarProps {
  className?: string;
  label?: string;
  area?: boolean;
}

const client = new MeiliSearch({
  host: "http://ecommerce.quochao.id.vn:7700/",
  apiKey: "5b9b8e6b23fdc6999583e126a2a8f271821668d9607a42bcc8ea7d86e587",
});

const index = client.getIndex("products");

const SearchBar: React.FC<SearchBarProps> = ({ className, label, area }) => {
  const [productsSearch, setProductsSearch] = useState([]);
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState<string>("");
  const debounceSearch = useDebounce(searchValue, 500) as string;

  useEffect(() => {
    debounceSearch.trim();
    async function searchMeili() {
      const search = (await index).search(debounceSearch);
      search.then((data: any) => {
        setProductsSearch(data.hits);
        console.log(data.hits);
      });
    }
    if (debounceSearch !== "") {
      searchMeili();
    }
  }, [debounceSearch]);
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
      <div className="absolute z-50 w-full bg-white ">
        <ul>
          {debounceSearch &&
            searchValue &&
            productsSearch.map((product: any) => (
              <li className="cursor-pointer px-2 py-3 border border-gray-500 flex justify-between ">
                <div
                  onClick={() => {
                    navigate(`/product-detail/${product.id}`);
                    setSearchValue("");
                  }}
                >
                  <span>{product.name}</span>
                  <span>{formatVND(product.unitPrice)}</span>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default SearchBar;
