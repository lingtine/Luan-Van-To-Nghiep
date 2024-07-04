import React from "react";
import { useAppSelector } from "redux/store";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { logout } from "redux/features/auth/authSlice";
import { IAccessToken } from "redux/api/types";
interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { accessToken } = useAppSelector((state) => state.authSlice);
  if (accessToken) {
    const jwtValue = jwtDecode(accessToken) as IAccessToken;
    if (jwtValue.role === "Customer") {
      toast.warning("Bạn không có quyền truy cập");
      logout();
      return <Navigate to={"/"} replace />;
    } else {
      return <>{children}</>;
    }
  }
  return <Navigate to={"/login-admin"} />;
};

export default AuthGuard;
