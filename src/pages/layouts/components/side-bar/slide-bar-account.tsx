import React from "react";

import { Button } from "@material-tailwind/react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useLogoutMutation } from "redux/api/auth/authApi";
import { useAppSelector } from "redux/store";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { TbTruckDelivery } from "react-icons/tb";
import { RiBillLine } from "react-icons/ri";
import { FaRegAddressCard } from "react-icons/fa6";
import { MdFavoriteBorder } from "react-icons/md";

interface SlideBarAccountProps {}

const SlideBarAccount: React.FC<SlideBarAccountProps> = () => {
  const [logout, { isSuccess }] = useLogoutMutation();

  const navigate = useNavigate();
  const { refreshToken } = useAppSelector((state) => state.authSlice);
  const { user } = useAppSelector((state) => state.userSlice);

  const navigation = [
    {
      label: "Thông tin cá nhân",
      href: "/account",
      icon: <FaRegAddressCard />,
    },
    {
      label: "Địa chỉ giao hàng",
      href: "/account/address",
      icon: <TbTruckDelivery />,
    },
    {
      label: "Đơn hàng",
      href: "/account/orders",
      icon: <RiBillLine />,
    },
    {
      label: "Yêu thích",
      href: "/account/wishlist",
      icon: <MdFavoriteBorder />,
    },
  ];

  useEffect(() => {
    if (isSuccess) {
      navigate("/login-admin");
    }
  }, [isSuccess, navigate]);

  const handleLogout = () => {
    if (refreshToken) {
      logout({ refreshToken });
    }
  };

  return (
    <aside className="border border-x p-6 shadow-md rounded-md">
      <div className="flex flex-col items-center gap-4">
        <FaUserCircle className="text-6xl" />
        <h4 className="font-semibold">{user?.name}</h4>
      </div>
      <ul className="flex flex-col">
        {navigation.map((item, index) => {
          return (
            <li key={index} className="p-4 ">
              <NavLink to={item.href} end>
                {({ isActive }) => {
                  return (
                    <Button
                      className="flex items-center gap-4"
                      variant={!isActive ? "text" : "filled"}
                    >
                      {item.icon}
                      <p>{item.label}</p>
                    </Button>
                  );
                }}
              </NavLink>
            </li>
          );
        })}
        <li className="p-4 ">
          <Button onClick={handleLogout} className="flex gap-4 items-center">
            <IoIosLogOut /> <p>{"Đăng xuất"}</p>
          </Button>
        </li>
      </ul>
    </aside>
  );
};

export default SlideBarAccount;
