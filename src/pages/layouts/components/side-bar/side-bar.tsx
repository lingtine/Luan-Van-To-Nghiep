import React, { useEffect } from "react";
import MenuSection from "./sidebar-menu/menu-section";
import { FaUserCircle } from "react-icons/fa";
import { useLogoutMutation } from "redux/api/auth/authApi";
import { Typography } from "@material-tailwind/react";
import { useAppSelector } from "redux/store";
import { useNavigate } from "react-router-dom";
import { IoExitOutline } from "react-icons/io5";

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
    <div className="fixed w-80 bg-[#22345e] h-full py-4 p-2 flex flex-col">
      <div className="mb-2 p-4 flex items-center gap-4">
        {/* <Avatar
            src="https://docs.material-tailwind.com/img/face-2.jpg"
            alt="avatar"
          /> */}
        <FaUserCircle className="text-5xl text-white" />
        <div>
          <Typography variant="h6" color="white">
            {user?.name}
          </Typography>
          <Typography variant="small" color="white" className="font-semibold">
            Employee
          </Typography>
        </div>
      </div>
      <hr />
      <div className="flex-1">
        <MenuSection />
      </div>
      <div className="px-4">
        <button
          className="text-white flex w-full  gap-3 items-center p-3 hover:bg-blue-gray-50 rounded hover:text-blue-gray-900"
          onClick={handleLogout}
        >
          <IoExitOutline />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default SideBar;
