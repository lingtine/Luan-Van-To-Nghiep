import React, { useEffect } from "react";
import MenuSection from "./sidebar-menu/menu-section";
import { FaUserCircle } from "react-icons/fa";
import { useLogoutMutation } from "redux/api/auth/authApi";
import { useAppSelector } from "redux/store";
import { useNavigate } from "react-router-dom";
import { IoExitOutline } from "react-icons/io5";
import { Card, Typography } from "@material-tailwind/react";
interface SideBarProps {}

const SideBar: React.FC<SideBarProps> = () => {
  const { user } = useAppSelector((state) => state.userSlice);
  const [logout, { isSuccess }] = useLogoutMutation();
  const navigate = useNavigate();

  const { refreshToken } = useAppSelector((state) => state.authSlice);

  useEffect(() => {
    if (isSuccess) {
      navigate("/login-admin");
    }
  }, [isSuccess, navigate]);
  const handleLogout = () => {
    if (refreshToken) logout({ refreshToken });
  };

  return (
    <Card className="h-[calc(100vh-2rem)] my-4 ml-4 fixed w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 text-black">
      <div className="mb-2 flex items-center gap-4 p-4">
        <FaUserCircle className="text-5xl text-blue-gray-500" />
        <div>
          <Typography variant="h5" color="blue-gray">
            {user?.name || "user"}
          </Typography>
          <Typography
            variant="small"
            color="blue-gray"
            className="font-semibold"
          >
            Employee
          </Typography>
        </div>
      </div>
      <hr className="my-2 border-blue-gray-50" />

      <div className="flex-1">
        <MenuSection />
      </div>
      <div className="px-4">
        <button
          className="text-blue-gray-500 flex w-full  gap-3 items-center p-3 hover:bg-blue-gray-50 rounded hover:text-blue-gray-900"
          onClick={handleLogout}
        >
          <IoExitOutline />
          <span>Logout</span>
        </button>
      </div>
    </Card>
  );
};

export default SideBar;
