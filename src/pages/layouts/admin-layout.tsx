import React from "react";
import SideBar from "./components/side-bar/side-bar";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "redux/store";
import HeaderAdmin from "./components/header-admin";
interface AdminLayoutProps {}

const AdminLayout: React.FC<AdminLayoutProps> = () => {
  const { accessToken } = useAppSelector((state) => {
    return state.authSlice;
  });

  if (!accessToken) {
    return <Navigate to={"/login-admin"} />;
  }

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
