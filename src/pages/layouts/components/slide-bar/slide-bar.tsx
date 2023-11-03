import React from "react";
import { BsHouse } from "react-icons/bs";
import { BsMinecartLoaded } from "react-icons/bs";
import { BiUserCircle } from "react-icons/bi";
import { IoExitOutline } from "react-icons/io5";
import { BsCart } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import classNames from "classnames";

interface SlideBarProps {}

const SlideBar: React.FC<SlideBarProps> = () => {
  const navigation = [
    {
      label: "Dashboard",
      href: "/admin",
      current: true,
      icon: <BsHouse />,
    },
    {
      label: "Orders",
      href: "/admin/orders",
      current: false,
      icon: <BsCart />,
    },
    {
      label: "Customer",
      href: "/admin/customers",
      current: false,
      icon: <BiUserCircle />,
    },
    {
      label: "Products",
      href: "/admin/products",
      current: false,
      icon: <BsMinecartLoaded />,
    },
  ];

  const renderNavigation = navigation.map((item) => {
    return (
      <NavLink
        to={item.href}
        className={classNames(
          "flex mb-4 gap-4 w-full items-center text-secondary-6 opacity-60 p-3 hover:opacity-100 hover:bg-[#222] rounded-md text-base ",
          {
            "opacity-100 bg-[#222]": item.current,
          }
        )}
      >
        <span>{item.icon}</span>
        <span>{item.label}</span>
      </NavLink>
    );
  });

  return (
    <div className="fixed h-full bg-black min-w-[280px]">
      <div className="flex justify-center flex-col items-start gap-6 h-full">
        <div className=" flex py-6 px-16 items-center gap-4 border-b pb-8 border-b-gray-600 ">
          <span className="relative bg-primary px-4 py-2 rounded-md text-xl font-bold">
            L
          </span>
          <p className="text-primary text-xl font-semibold">Techwave</p>
        </div>

        <div className="flex flex-col px-8 my-4 justify-between items-center h-full w-full ">
          <div className="flex flex-col w-full">{renderNavigation}</div>
          <button className="flex mb-4 gap-4 w-full items-center text-secondary-6 opacity-60 p-3 hover:opacity-100 hover:bg-[#222] rounded-md text-xl ">
            <span className="rotate-180">
              <IoExitOutline />
            </span>
            <span className="text-base">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SlideBar;
