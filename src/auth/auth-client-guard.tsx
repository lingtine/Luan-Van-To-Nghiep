import React from "react";
import { useAppSelector } from "redux/store";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
interface AuthClientGuardProps {}

const AuthClientGuard: React.FC<AuthClientGuardProps> = () => {
  const { accessToken } = useAppSelector((state) => state.authSlice);

  if (!accessToken) {
    return <Navigate to={"/login"} />;
  }

  return <Outlet />;
};

export default AuthClientGuard;
