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
  IconButton,
} from "@material-tailwind/react";
import { useAppSelector } from "redux/store";
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
import { IoIosMenu } from "react-icons/io";

interface NavigationProps {
  onShowHeaderBottom: () => void;
  scrollOverFlow: boolean;
}

const Navigation: React.FC<NavigationProps> = ({
  scrollOverFlow,
  onShowHeaderBottom,
}) => {
  const { user } = useAppSelector((state) => state.userSlice) as {
    user: ICustomerDetail;
  };
  const { cart } = useAppSelector((state) => state.cartSlice);

  const { refreshToken } = useAppSelector((state) => state.authSlice);
  const navigate = useNavigate();
  const [logout, status] = useLogoutMutation();

  useEffect(() => {
    console.log(cart, user);
  }, [user, cart]);
  useEffect(() => {
    if (status.isSuccess) {
      navigate("/");
    }
  }, [status.isSuccess, navigate]);
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
        {scrollOverFlow && (
          <IconButton className="rounded-full" onClick={onShowHeaderBottom}>
            <IoIosMenu className="text-white text-2xl" />
          </IconButton>
        )}

        {/* user */}
        {user ? (
          <Menu>
            <MenuHandler>
              <Avatar
                className="cursor-pointer w-12 h-12"
                size="sm"
                src={
                  user.avatar
                    ? user.avatar
                    : "http://ecommerce.quochao.id.vn/images/avatar-none-user.png"
                }
              />
            </MenuHandler>
            <MenuList className="z-[999999999]">
              <MenuItem>
                <Link to={"/account"} className="flex gap-2">
                  <CiSquareAlert />
                  <p>Thông tin tài khoản</p>
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to={"/account/wishlist"} className="flex gap-2">
                  <CiHeart />
                  <p>Yêu thích</p>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <div className="flex gap-2">
                  <CiLogout />
                  <p> Đăng xuất</p>
                </div>
              </MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <Link to={"/login"}>
            <Avatar
              className="cursor-pointer w-12"
              size="sm"
              src="http://ecommerce.quochao.id.vn/images/avatar-none-user.png"
            />
          </Link>
        )}
        {/* Cart */}
        <Badge className="bg-success" content={cart ? cart.items.length : "0"}>
          <Link
            to={user ? "/cart" : "/login"}
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
