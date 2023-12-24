import React, { useState } from "react";
import SlideBar from "./components/slide-bar/slide-bar";
import { AiOutlineUser } from "react-icons/ai";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "redux/store";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { IoMenu } from "react-icons/io5";

import SlideBarAdmin from "./components/slide-bar/slide-bar-admin";
interface AdminLayoutProps {}

const AdminLayout: React.FC<AdminLayoutProps> = () => {
  const { accessToken } = useAppSelector((state) => {
    return state.authSlice;
  });
  const { user } = useAppSelector((state) => {
    return state.userSlice;
  });
  const [isOpen, setIsOpen] = useState(false);

  if (!accessToken) {
    return <Navigate to={"/login-admin"} />;
  }

  const jwtValue = jwtDecode(accessToken) as { role: [] | string };
  if (!Array.isArray(jwtValue.role)) {
    toast.warning("Bạn không có quyền truy cập");
    return <Navigate to={"/"} />;
  }

  return (
    <div className="container max-w-full flex overflow-hidden  ">
      <div className="hidden lg:block w-[320px] flex-shrink-0 overflow-y-auto">
        <div className="rounded-none h-full flex-[0_0_auto] fixed w-[320px]    bg-[#22345e]  z-10  p-4 shadow-xl shadow-blue-gray-900/5">
          <SlideBar />
        </div>
      </div>

      <div className="lg:w-[calc(100%-320px)] w-full ">
        <div className=" flex flex-col w-full  ">
          <header className="w-full bg-secondary flex justify-between items-center  lg:justify-end p-4 mb-8 shadow-lg">
            <button
              title="menu"
              className=" lg:hidden cursor-pointer"
              onClick={() => {
                setIsOpen(true);
              }}
            >
              <IoMenu />
            </button>
            {isOpen && (
              <SlideBarAdmin
                onClose={() => {
                  setIsOpen(false);
                }}
                status={isOpen}
              >
                <div className="bg-[#22345e] h-full overflow-y-auto">
                  <SlideBar />
                </div>
              </SlideBarAdmin>
            )}

            <div className="text-xl text-primary-1 flex items-center gap-4">
              <AiOutlineUser />
              <p className="text-base">{user?.name}</p>
            </div>
          </header>
          <div>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
