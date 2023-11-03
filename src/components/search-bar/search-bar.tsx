import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
interface SearchBarProps {}

const SearchBar: React.FC<SearchBarProps> = () => {
  return (
    <div className="flex flex-1 border text-base border-primary-1 px-4 py-2 min-w-[230px] items-center rounded-lg">
      <input
        className="flex-1 bg-transparent"
        placeholder="Nhập tên sản phẩm"
      />
      <span>
        <FaMagnifyingGlass />
      </span>
    </div>
  );
};

export default SearchBar;
