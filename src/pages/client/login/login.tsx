import React from "react";
import FormLogin from "./form-login";
interface LoginPageProps {}

const LoginPage: React.FC<LoginPageProps> = () => {
  return (
    <div className="flex">
      <FormLogin />
      <div className="hidden lg:block max-w-[60%] flex-[0_0_60%]">
        <img
          className="w-full h-full bg-gradient-to-l  from-[#ADCCEE] to-[#E6F0FD]"
          src="http://ecommerce.quochao.id.vn/http://ecommerce.quochao.id.vn/images/login/account-cover.png"
          alt="login"
        />
      </div>
    </div>
  );
};

export default LoginPage;
