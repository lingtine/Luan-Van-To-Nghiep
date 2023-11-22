import React from "react";
import FormLogin from "./form-login";
import { useAppSelector } from "redux/store";
import { useNavigate } from "react-router-dom";

interface LoginAdminProps {}
const LoginAdmin: React.FC<LoginAdminProps> = () => {
  const navigate = useNavigate();
  const { accessToken } = useAppSelector((state) => state.authSlice);

  return (
    <div className="fixed w-full h-full flex">
      <section className="flex-[0_0_50%] relative before:absolute before:bg-black before:w-full before:h-full before:opacity-40">
        <img
          className="object-fill w-full"
          src="/images/login/city.jpg"
          alt="city"
        />
      </section>
      <section className="flex-[0_0_50%] flex justify-center items-center">
        <FormLogin />
      </section>
    </div>
  );
};

export default LoginAdmin;
