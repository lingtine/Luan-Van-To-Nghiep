import React from "react";
import FormRegister from "./form-register";
interface RegisterPageProps {}

const RegisterPage: React.FC<RegisterPageProps> = () => {
  return (
    <div className="flex">
      <div className="hidden lg:block max-w-[50%] flex-[0_0_50%]">
        <img
          className="w-full h-full"
          src="http://ecommerce.quochao.id.vn/images/login/login-image.png"
          alt="register"
        />
      </div>
      <FormRegister />
    </div>
  );
};

export default RegisterPage;
