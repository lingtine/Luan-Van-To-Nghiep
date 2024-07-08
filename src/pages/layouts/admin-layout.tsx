import React from "react";
import SideBar from "./components/side-bar/side-bar";
import { Outlet } from "react-router-dom";

import HeaderAdmin from "./components/header/header-admin";
interface AdminLayoutProps {}

const AdminLayout: React.FC<AdminLayoutProps> = () => {
  return (
    <div className="bg-blue-gray-50/50 min-h-screen">
      <SideBar />
      <div className="ml-[350px] py-4">
        <HeaderAdmin />
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
