import React from "react";
import { useAppSelector } from "redux/store";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
interface AuthClientGuardProps {
  children: React.ReactNode;
}

const AuthClientGuard: React.FC<AuthClientGuardProps> = ({ children }) => {
  const { accessToken } = useAppSelector((state) => state.authSlice);

  if (!accessToken) {
    return <Navigate to={"/login"} />;
  }

  return <>{children}</>;
};

export default AuthClientGuard;
