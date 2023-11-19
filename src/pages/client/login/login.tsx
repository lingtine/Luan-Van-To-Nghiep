import React from "react";
import FormLogin from "./form-login";
interface LoginPageProps {}

const LoginPage: React.FC<LoginPageProps> = () => {
  return (
    <div className="flex">
      <img
        className="flex[0_0_50%] max-w-[50%]"
        src="images/login/login-image.png"
        alt="login"
      />
      <FormLogin />
    </div>
  );
};

export default LoginPage;
