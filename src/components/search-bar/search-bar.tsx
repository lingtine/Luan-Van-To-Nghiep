import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
interface SearchBarProps {
  className?: string;
  label?: string;
  area?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ className, label, area }) => {
  return (
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
          />
          <span>
            <FaMagnifyingGlass />
          </span>
        </>
      )}
    </div>
  );
};

export default SearchBar;
