import React from "react";

import { BiStoreAlt } from "react-icons/bi";
import { CiDollar } from "react-icons/ci";
import { TbMoneybag } from "react-icons/tb";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import CoreValue from "../home/Corevalue";
import { useTranslation } from "react-i18next";

const About: React.FC = () => {
  const { t } = useTranslation();
  const dataInfo: {
    id: string;
    icon: React.ReactNode;
    value: number;
    label: string;
  }[] = [
    {
      id: Math.random().toString(),
      icon: <BiStoreAlt />,
      value: 10.5,
      label: "Sallers active our site",
    },
    {
      id: Math.random().toString(),
      icon: <CiDollar />,
      value: 33,
      label: "Mopnthly Produduct Sale",
    },
    {
      id: Math.random().toString(),
      icon: <HiOutlineShoppingBag />,
      value: 45.5,
      label: "Customer active in our site",
    },
    {
      id: Math.random().toString(),
      icon: <CiDollar />,
      value: 25,
      label: "Anual gross sale in our site",
    },
  ];

  const dataUser: {
    id: string;
    imageUrl: string;
    name: string;
    role: string;
  }[] = [
    {
      id: Math.random().toString(),
      imageUrl: "images/about/tom-cruise.png",
      name: "Tom Cruise",
      role: "Founder & Chairman",
    },
    {
      id: Math.random().toString(),
      imageUrl: "images/about/Emma-watson.png",
      name: "Emma Watson",
      role: "Managing Director",
    },
    {
      id: Math.random().toString(),
      imageUrl: "images/about/will-smith.png",
      name: "Will Smith",
      role: "Product Designer",
    },
  ];

  const renderDataUser = dataUser.map((item) => {
    return (
      <div key={item.id}>
        <div>
          <img alt={item.name} src={item.imageUrl} />
        </div>
        <div className="py-8">
          <h4 className="text-3xl font-medium">{item.name}</h4>
          <p className="text-base font-normal my-2">{item.role}</p>
        </div>
      </div>
    );
  });

  const renderDataInfo = dataInfo.map((item) => {
    return (
      <div
        key={item.id}
        className="px-12 py-7 border border-color-black group hover:border-secondary-3 hover:bg-secondary-3 hover:text-white"
      >
        <div className="flex justify-center items-center p-6">
          <div className="bg-black rounded-full p-2 border-8 group-hover:bg-white ">
            <span className="text-secondary text-4xl font-semibold group-hover:text-primary-1">
              {item.icon}
            </span>
          </div>
        </div>
        <div className="text-center">
          <h4 className="font-bold text-3xl">{item.value}k</h4>
          <p className="text-base font-normal my-3">{item.label}</p>
        </div>
      </div>
    );
  });

  return (
    <div>
      <div className="container mx-auto">
        <div className="flex items-center my-20">
          <div className="flex-[0_0_50%] max-w-[50%] p-16">
            <h2 className="text-5xl font-semibold my-10">
              {t("about")}
            </h2>
            <p className="text-base font-normal text-justify">
            {t("description")}
            </p>
            <br></br>
            {/* <p className="text-base font-normal text-justify">
              Techwave có hơn 1 triệu sản phẩm để cung cấp, tăng trưởng với tốc
              độ rất nhanh. Độc quyền cung cấp nhiều loại tài sản đa dạng khác
              nhau từ người tiêu dùng.
            </p> */}
          </div>
          <div className="flex-[0_0_50%] max-w-[50%]">
            <img src="images/about/out-story.png" alt="slide" />
          </div>
        </div>

        <div className="flex justify-between items-center my-20">
          {renderDataInfo}
        </div>

        <div className="flex justify-between items-center my-20">
          {renderDataUser}
        </div>

        <CoreValue />
      </div>
    </div>
  );
};

export default About;
