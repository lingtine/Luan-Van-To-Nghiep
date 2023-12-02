import React, { useEffect } from "react";
import { Breadcrumbs } from "@material-tailwind/react";
import { Link, redirect } from "react-router-dom";
import { FaHouse } from "react-icons/fa6";
import NotLogin from "components/not-login";
import { AiOutlineEdit } from "react-icons/ai";
import { BsFillTrash3Fill } from "react-icons/bs";
import TableOrder from "components/table/table-data";
interface ProfilePageProps {
 isAuthenticated: boolean;
}

const ProfilePage: React.FC<ProfilePageProps> = ({isAuthenticated}) => {
  const userData = localStorage.getItem('user');
  const data = userData ? JSON.parse(userData) : null;
  useEffect(() => {
    if(isAuthenticated) {
      redirect('/login')
    }
  },[])
  const dataSlideBar: {
    id: string;
    label: string;
    children?: {
      id: string;
      label: string;
      href: string;
      email?:string;
      address?: string;
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
          email: data.email || " ",
        },
        {
          id: Math.random().toString(),
          label: "Địa chỉ giao hàng",
          href: "/profile/addresses",
          address: "111 Bijoy sarani, Dhaka, DH 1515, Bangladesh."
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
      ],
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
            {child.label} : <span>{(child.email || child.address) ? (child.email || child.address) : ""}</span>
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
    isAuthenticated ? 
    (<div className="container">
    <section className="flex justify-between my-10">
      <Breadcrumbs>
        <Link to={"/"} className="opacity-60">
          <FaHouse />
        </Link>
        <Link to={"/profile"}>Tài khoản</Link>
      </Breadcrumbs>
      <p>Chào mừng : <span className="text-primary font-bold">{`${data.name || 'user'}`}</span></p>
    </section>
    <section className="mb-36">

    </section>

    <section className="mb-36">
      {renderDataSlideBar}
      <TableOrder/>
    </section>
    
  </div> ) : 
   <NotLogin/>
  );
};

export default ProfilePage;
