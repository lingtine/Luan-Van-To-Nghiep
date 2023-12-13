import React from "react";
import { useAppSelector } from "redux/store";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { accessToken } = useAppSelector((state) => state.authSlice);

  if (accessToken) {
    const jwtValue = jwtDecode(accessToken) as { role: [] | string };
    if (Array.isArray(jwtValue.role)) {
      return <Navigate to={"/admin"} />;
    } else {
      toast.warning("Bạn không có quyền truy cập");
      return <Navigate to={"/"} />;
    }
  }

  return <>{children}</>;
};

export default AuthGuard;
