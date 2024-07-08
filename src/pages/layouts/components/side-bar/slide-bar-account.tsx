import React from "react";

import { Button } from "@material-tailwind/react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useLogoutMutation } from "redux/api/auth/authApi";
import { useAppSelector } from "redux/store";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
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
          src={
            user?.avatar
              ? user.avatar
              : "data:image/jpeg;base64,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"
          }
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
