import React, { useState } from "react";
import SideBar from "./components/side-bar/side-bar";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "redux/store";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { IoMenu } from "react-icons/io5";
import SlideBarAdmin from "./components/side-bar/side-bar-mobile";

interface AdminLayoutProps {}

const AdminLayout: React.FC<AdminLayoutProps> = () => {
  const location = useLocation();
  const pageName = location.pathname.split("/")[2] || "Dashboard";
  const { accessToken } = useAppSelector((state) => {
    return state.authSlice;
  });

  const [isOpen, setIsOpen] = useState(false);

  if (!accessToken) {
    return <Navigate to={"/login-admin"} />;
  }

  const readerHeader = (
    <header className="w-full bg-secondary flex justify-between items-center  p-4 mb-8 shadow-lg">
      <button
        title="menu"
        className="lg:hidden cursor-pointer"
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
            <SideBar />
          </div>
        </SlideBarAdmin>
      )}

      <div className="text-xl font-semibold uppercase text-primary-1 flex items-center gap-4">
        {pageName}
      </div>
    </header>
  );

  return (
    <>
      <SideBar />
      <div className="ml-80">
        {readerHeader}
        <Outlet />
      </div>
    </>
  );
};

export default AdminLayout;
