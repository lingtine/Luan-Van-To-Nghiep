import React from "react";

import { Button } from "@material-tailwind/react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useLogoutMutation } from "redux/api/auth/authApi";
import { useAppSelector } from "redux/store";
import { useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import { navigationAccount } from "share/constant/navigator";
interface SlideBarAccountProps {}

const SlideBarAccount: React.FC<SlideBarAccountProps> = () => {
  const [logout, { isSuccess }] = useLogoutMutation();

  const navigate = useNavigate();
  const { refreshToken } = useAppSelector((state) => state.authSlice);
  const { user } = useAppSelector((state) => state.userSlice);

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
        <img
          className="rounded-sm h-40"
          src={user?.avatar ? user.avatar : "images/avatar-none-user.png"}
          alt=""
        />
        <h4 className="font-semibold">{user?.name}</h4>
      </div>
      <ul className="flex flex-col w-full">
        {navigationAccount.map((item, index) => {
          return (
            <li key={index} className="p-4 ">
              <NavLink to={item.href || ""} end>
                {({ isActive }) => {
                  return (
                    <Button
                      className="flex items-center gap-4 w-full"
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
          <Button
            onClick={handleLogout}
            className="flex gap-4 items-center "
            fullWidth
            variant="text"
          >
            <IoIosLogOut /> <p>{"Đăng xuất"}</p>
          </Button>
        </li>
      </ul>
    </aside>
  );
};

export default SlideBarAccount;
