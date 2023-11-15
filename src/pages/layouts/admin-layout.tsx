import React from "react";
import SlideBar from "./components/slide-bar/slide-bar";
import { AiOutlineUser } from "react-icons/ai";
import { Outlet } from "react-router-dom";

interface AdminLayoutProps {}

const AdminLayout: React.FC<AdminLayoutProps> = () => {
  return (
    <div className="flex ">
      <SlideBar />
      <div className=" flex flex-col w-full">
        <header className="w-full bg-secondary flex justify-end p-4 mb-8 shadow-lg">
          <div className="text-xl text-primary-1 flex items-center gap-4">
            <AiOutlineUser />
            <p className="text-base">Nguyễn Hùng Anh</p>
          </div>
        </header>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
