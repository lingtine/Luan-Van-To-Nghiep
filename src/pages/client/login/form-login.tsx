import React from "react";
import { Input, Button } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLoginMutation } from "redux/api/auth/authApi";
interface IDataForm {
  email: string;
  password: string;
}

interface FormLoginProps {}

const FormLogin: React.FC<FormLoginProps> = () => {
  const [login, result] = useLoginMutation();
  const navigate = useNavigate();
  const [dataForm, setDataForm] = useState<IDataForm>({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (result.isSuccess) {
      navigate("/");
      toast.success("Đăng nhập thành công");
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
      dataForm.password.trim().length === 0
    ) {
      toast.error("Thông tin không hợp lệ");
    } else {
      login(dataForm);
    }
  };

  return (
    <div className="flex justify-center my-20 lg:my-0 max-w-full flex-[0_0_100%] lg:max-w-[50%] lg:flex-[0_0_50%]">
      <form
        onSubmit={handleSubmit}
        className=" flex items-center justify-center"
      >
        <div className="min-w-[370px] flex flex-col gap-4">
          <h4 className="text-4xl font-medium ">Đăng nhập</h4>
          <span className="text-sm">
            Bạn mới biết đến Techwave?
            <Link className="text-primary" to={"/register"}>
              Đăng kí
            </Link>
          </span>
          <Input
            onChange={handleChange}
            value={dataForm.email}
            name="email"
            variant="standard"
            label="Email"
            crossOrigin={""}
          />
          <Input
            onChange={handleChange}
            value={dataForm.password}
            name="password"
            variant="standard"
            label="Password"
            type="password"
            crossOrigin={""}
          />
          <div className="my-4 flex justify-between items-center">
            <Button type="submit" size="lg" className="bg-primary">
              Đăng nhập
            </Button>
            {/* <Link className="text-primary" to={"/forget-password"}>
              Quên Mật Khẩu?
            </Link> */}
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormLogin;
