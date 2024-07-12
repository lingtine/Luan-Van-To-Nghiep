import React from "react";
import { Input, Button } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useRegisterMutation } from "redux/api/auth/authApi";

interface IDataForm {
  email: string;
  password: string;
  name: string;
}

const FormRegister = () => {
  const [register, result] = useRegisterMutation();
  const navigate = useNavigate();
  const [dataForm, setDataForm] = useState<IDataForm>({
    email: "",
    password: "",
    name: "",
  });

  useEffect(() => {
    if (result.isSuccess) {
      navigate("/login");
      toast.success("Đăng kí thành công");
    }
    if (result.isError) {
      toast.success("Đăng kí thất bại");
    }
  }, [result, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDataForm(() => ({ ...dataForm, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      dataForm.email.trim().length === 0 ||
      dataForm.password.trim().length === 0 ||
      dataForm.name.trim().length === 0
    ) {
      toast.error("Thông tin không hợp lệ");
    } else {
      register(dataForm);
    }
  };

  return (
    <div className="flex justify-center my-20 lg:my-0 max-w-full flex-[0_0_100%] lg:max-w-[50%] lg:flex-[0_0_50%]">
      <form
        onSubmit={handleSubmit}
        className=" flex items-center justify-center"
      >
        <div className="min-w-[370px] flex flex-col gap-4">
          <h4 className="text-4xl font-semibold ">Đăng Ký</h4>
          <span className="text-sm">
            Bạn đã có tài khoản?
            <Link
              className="text-black underline hover:no-underline mx-2 "
              to={"/login"}
            >
              Đăng nhập
            </Link>
          </span>
          <Input
            onChange={handleChange}
            value={dataForm.name}
            name="name"
            label="Name"
            crossOrigin={""}
          />
          <Input
            onChange={handleChange}
            value={dataForm.email}
            name="email"
            label="Email"
            crossOrigin={""}
          />
          <Input
            onChange={handleChange}
            value={dataForm.password}
            name="password"
            label="Password"
            type="password"
            crossOrigin={""}
          />
          <div className="my-4 flex justify-between items-center">
            <Button type="submit" size="lg" className="bg-primary w-full">
              Đăng Kí
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormRegister;
