import React, { useEffect } from "react";
import { SearchBar } from "components";
import { Link } from "react-router-dom";
import {
  Badge,
  Avatar,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { useAppSelector } from "redux/store";
import { useGetDetailCartQuery } from "redux/api/cart/cart";
import { ICustomerDetail } from "redux/api/types";
import { useLogoutMutation } from "redux/api/auth/authApi";
import { useNavigate } from "react-router-dom";

import MenuMobile from "./menu-mobile";
import {
  CiHeart,
  CiSquareAlert,
  CiLogout,
  CiShoppingCart,
} from "react-icons/ci";

interface NavigationProps {}

const Navigation: React.FC<NavigationProps> = () => {
  const { user } = useAppSelector((state) => state.userSlice) as {
    user: ICustomerDetail;
  };
  const { refreshToken } = useAppSelector((state) => state.authSlice);
  const navigate = useNavigate();
  const [logout, status] = useLogoutMutation();
  const { data, isSuccess } = useGetDetailCartQuery();

  useEffect(() => {
    if (status.isLoading) {
      navigate("/login-admin");
    }
  }, [status.isLoading, navigate]);
  const handleLogout = () => {
    if (refreshToken) {
      logout({ refreshToken });
    }
  };
  return (
    <div className="container mx-auto px-8 gap-10 h-full  flex justify-between items-center py-6">
      <MenuMobile />
      {/* Logo */}
      <p className="font-bold text-white uppercase text-lg lg:text-2xl xl:text-4xl">
        <Link to="/">TechWave</Link>
      </p>
      {/* <HeaderCategory /> */}
      <div className="relative w-full">
        <SearchBar />
      </div>
      <div className="flex gap-4 items-center">
        {/* user */}
        {user ? (
          <Menu>
            <MenuHandler>
              <Avatar
                className="cursor-pointer w-32"
                size="sm"
                src="images/avatar-none-user.png"
              />
            </MenuHandler>
            <MenuList>
              <MenuItem>
                <div className="flex gap-2">
                  <CiSquareAlert />
                  <p>Thông tin tài khoản</p>
                </div>
              </MenuItem>
              <MenuItem>
                <div className="flex gap-2">
                  <CiHeart />
                  <p>Yêu thích</p>
                </div>
              </MenuItem>
              <MenuItem>
                <button className="flex gap-2" onClick={handleLogout}>
                  <CiLogout />
                  <p> Đăng xuất</p>
                </button>
              </MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <Link to={"/login"}>
            <Avatar
              className="cursor-pointer w-12"
              size="sm"
              src="images/avatar-none-user.png"
            />
          </Link>
        )}
        {/* Cart */}
        <Badge
          className="bg-success"
          content={isSuccess ? data.items.length : "0"}
        >
          <Link
            to={user ? "/cart-client" : "/login"}
            className="flex items-center relative p-2.5 rounded-full bg-light-text-emphasis text-secondary-border-subtle hover:text-white cursor-pointer"
          >
            <CiShoppingCart className="text-xl" />
          </Link>
        </Badge>
      </div>
    </div>
  );
};

export default Navigation;
