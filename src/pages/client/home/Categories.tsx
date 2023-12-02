import React from "react";
import BoxTemplate from "components/box-template/box-template";
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import { SlScreenDesktop } from "react-icons/sl";
import { IoIosLaptop } from "react-icons/io";
import { FiBatteryCharging } from "react-icons/fi";
import { useGetProductHomeQuery } from "redux/api/catalog/product";
interface CategoriesProps {}

const Categories: React.FC<CategoriesProps> = () => {
  const { data, isSuccess, isLoading } = useGetProductHomeQuery(null);

  const Content = data?.map((category: any) => {
    return (
      <li
        className="rounded py-6 px-14 border border-black flex flex-col justify-center items-center hover:border-secondary-3 hover:bg-secondary-3 hover:text-white"
        key={category.id}
      >
        <span className="text-6xl">{category.icon}</span>
        <p className="text-base ">{category.title}</p>
      </li>
    );
  });
  return (
    <>
      {
        <BoxTemplate
          title="Tìm kiếm bằng danh mục"
          heading="Thể loại"
          data={data}
        >
          <div className="py-16 flex justify-between">{Content}</div>
        </BoxTemplate>
      }
    </>
  );
};

export default Categories;
