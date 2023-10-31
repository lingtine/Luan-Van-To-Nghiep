import React from "react";
import BoxTemplate from "components/box-template/box-template";
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import { SlScreenDesktop } from "react-icons/sl";
import { IoIosLaptop } from "react-icons/io";
import { FiBatteryCharging } from "react-icons/fi";
interface CategoriesProps {}

const Categories: React.FC<CategoriesProps> = () => {
  const data = [
    {
      id: Math.random.toString(),
      title: "Điện Thoại",
      icon: <HiOutlineDevicePhoneMobile />,
    },
    {
      id: Math.random.toString(),
      title: "Màn Hình",
      icon: <SlScreenDesktop />,
    },
    {
      id: Math.random.toString(),
      title: "LapTop",
      icon: <IoIosLaptop />,
    },
    {
      id: Math.random.toString(),
      title: "Phụ Kiện",
      icon: <FiBatteryCharging />,
    },
    {
      id: Math.random.toString(),
      title: "Phụ Kiện",
      icon: <FiBatteryCharging />,
    },
  ];

  const Content = data.map((item) => {
    return (
      <li
        className="rounded py-6 px-14 border border-black flex flex-col justify-center items-center hover:border-secondary-3 hover:bg-secondary-3 hover:text-white"
        key={item.id}
      >
        <span className="text-6xl">{item.icon}</span>
        <p className="text-base ">{item.title}</p>
      </li>
    );
  });
  return (
    <>
      <BoxTemplate title="Tìm kiếm bằng danh mục" heading="Thể loại">
        <div className="py-16 flex justify-between">{Content}</div>
      </BoxTemplate>
    </>
  );
};

export default Categories;
