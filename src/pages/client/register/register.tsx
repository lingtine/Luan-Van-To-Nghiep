import React from "react";
import FormRegister from "./form-register";
interface RegisterPageProps {}

const RegisterPage: React.FC<RegisterPageProps> = () => {
  return (
    <div className="flex">
      <img
        className="hidden lg:block max-w-[50%] flex-[0_0_50%]"
        src="images/login/login-image.png"
        alt="register"
      />
      <FormRegister />
    </div>
  );
};

export default RegisterPage;
