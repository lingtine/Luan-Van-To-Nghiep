import React from "react";
import SlideBar from "./components/slide-bar/slide-bar";
import { AiOutlineUser } from "react-icons/ai";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "redux/store";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
interface AdminLayoutProps {}

const AdminLayout: React.FC<AdminLayoutProps> = () => {
  const { accessToken } = useAppSelector((state) => {
    return state.authSlice;
  });
  const { user } = useAppSelector((state) => {
    return state.userSlice;
  });

  if (!accessToken) {
    return <Navigate to={"/login-admin"} />;
  }

  const jwtValue = jwtDecode(accessToken) as { role: [] | string };
  if (!Array.isArray(jwtValue.role)) {
    toast.warning("Bạn không có quyền truy cập");
    return <Navigate to={"/"} />;
  }

  return (
    <div className="flex ">
      <SlideBar />
      <div className=" flex flex-col w-full ml-[20%]">
        <header className="w-full bg-secondary flex justify-end p-4 mb-8 shadow-lg">
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
  );
};

export default AdminLayout;
