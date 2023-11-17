import React from "react";
import { Breadcrumbs } from "@material-tailwind/react";
import { Link, useLinkClickHandler } from "react-router-dom";
import { FaHouse } from "react-icons/fa6";
interface ProfilePageProps {}

const ProfilePage: React.FC<ProfilePageProps> = () => {
  const dataSlideBar: {
    id: string;
    label: string;
    children?: {
      id: string;
      label: string;
      href: string;
    }[];
  }[] = [
    {
      id: Math.random().toString(),
      label: "Quản lý tài khoản",
      children: [
        {
          id: Math.random().toString(),
          label: "Thông tin tài khoản",
          href: "/profile",
        },
        {
          id: Math.random().toString(),
          label: "Địa chỉ giao hàng",
          href: "/profile/addresses",
        },
      ],
    },
    {
      id: Math.random().toString(),
      label: "Quản lý đơn hàng",
      children: [
        {
          id: Math.random().toString(),
          label: "Danh sách đơn hàng",
          href: "/profile/order",
        },
        {
          id: Math.random().toString(),
          label: "Đơn hàng đã huỷ",
          href: "/profile/order-cancel",
        },
      ],
    },
    {
      id: Math.random().toString(),
      label: "Wishlist",
    },
  ];

  const renderDataSlideBar = dataSlideBar.map((item) => {
    let content;
    if (item.children) {
      content = item.children.map((child) => {
        return (
          <li
            className="text-sm font-light opacity-50 my-1 pl-8"
            key={child.id}
          >
            {child.label}
          </li>
        );
      });
    }

    const renderItem = (
      <li>
        <h4 className="text-base font-medium my-2">{item.label}</h4>
        {content && <ul>{content}</ul>}
      </li>
    );

    return <ul key={item.id}>{renderItem}</ul>;
  });
  return (
    <div className="container">
      <section className="flex justify-between my-10">
        <Breadcrumbs>
          <Link to={"/"} className="opacity-60">
            <FaHouse />
          </Link>
          <Link to={"/profile"}>Tài khoản</Link>
        </Breadcrumbs>
        <p>Welcome {"Hùng ành"}</p>
      </section>
      <section className="mb-36">{renderDataSlideBar}</section>
    </div>
  );
};

export default ProfilePage;
