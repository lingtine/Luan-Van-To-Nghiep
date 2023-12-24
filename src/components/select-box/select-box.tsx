import React from "react";
import { useState, useEffect, useRef } from "react";
import { BiDownArrow, BiLeftArrow } from "react-icons/bi";

export interface ISelected {
  id: string;
  label: string;
}

interface SelectBoxProps {
  options: ISelected[];
  placeholder?: string;
  selected?: ISelected | null;
  onChange: Function;
  label: string;
}

const SelectBox: React.FC<SelectBoxProps> = ({
  options,
  placeholder,
  selected,
  onChange,
  label,
}) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const selectBoxRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClick = (e: any) => {
      if (!selectBoxRef.current) return;
      if (!selectBoxRef.current.contains(e.target)) {
        setIsOpened(false);
      }
    };

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const handleDropDown = () => {
    setIsOpened(!isOpened);
  };
  const renderOptions = options.map((option: ISelected) => {
    const handleSelected = () => {
      setIsOpened(false);
      onChange(option);
    };

    return (
      <div className="" onClick={handleSelected} key={option.id}>
        {option.label}
      </div>
    );
  });
  return (
    <div className="relative h-10 w-72 min-w-[200px]">
      <div
        ref={selectBoxRef}
        className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-red-500 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
      >
        <div className="text-base">
          <div
            onClick={handleDropDown}
            className="flex items-center justify-between"
          >
            <p>{selected ? selected.label : placeholder || "Select..."}</p>
            {isOpened && options.length !== 1 ? (
              <BiDownArrow />
            ) : (
              <BiLeftArrow />
            )}
          </div>
        </div>
        {isOpened && options.length !== 0 && (
          <ul className="absolute w-full shadow-lg p-4 max-h-[200px] overflow-y-auto  left-0  bg-white rounded-es-2xl rounded-ee-2xl  z-50">
            {renderOptions}
          </ul>
        )}
        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
          {label}
        </label>
      </div>
    </div>
  );
};

export default SelectBox;
