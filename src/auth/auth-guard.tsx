import React from "react";
import { useAppSelector } from "redux/store";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { logout } from "redux/features/auth/authSlice";
interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { accessToken } = useAppSelector((state) => state.authSlice);
  const { user } = useAppSelector((state) => state.userSlice);

  if (!user && accessToken) {
    const jwtValue = jwtDecode(accessToken) as { role: [] | string };
    if (jwtValue.role === "Customer") {
      toast.warning("Bạn không có quyền truy cập");
      logout();
      return <Navigate to={"/"} />;
    } else {
      return <Navigate to={"/admin/"} />;
    }
  }

  return <>{children}</>;
};

export default AuthGuard;
