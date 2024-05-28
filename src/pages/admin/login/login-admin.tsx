import React from "react";
import FormLogin from "./form-login";

interface LoginAdminProps {}
const LoginAdmin: React.FC<LoginAdminProps> = () => {
  return (
    <div className="fixed h-full w-full flex justify-center items-center bg-gradient-to-r from-blue-500 to-indigo-500">
      <FormLogin />
    </div>
  );
};

export default LoginAdmin;
