import React from "react";
import { Input, Button } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLoginMutation } from "redux/api/authApi";

interface IDataForm {
  email: string;
  password: string;
  name: string;
  code: number;
}

interface FormRegisterProps {}

const FormRegister: React.FC<FormRegisterProps> = () => {
  const [login, result] = useLoginMutation();
  const navigate = useNavigate();
  const [dataForm, setDataForm] = useState<IDataForm>({
    email: "",
    password: "",
    code: 0,
    name: "",
  });

  useEffect(() => {
    if (result.isSuccess) {
      navigate("/");
      toast.success("Đăng kí thành công");
    }
  }, [result]);

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
    <form
      onSubmit={handleSubmit}
      className=" flex items-center justify-center flex-[0_0_50%]"
    >
      <div className="min-w-[370px] flex flex-col gap-4">
        <h4 className="text-4xl font-medium ">Đăng Ký</h4>

        <Input
          onChange={handleChange}
          value={dataForm.name}
          name="name"
          variant="standard"
          label="Name"
          crossOrigin={""}
        />
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
            Đăng Kí
          </Button>
          <span className="text-sm">
            Bạn đã có tài khoản?{" "}
            <Link className="text-primary" to={"/login"}>
              Đăng nhập
            </Link>
          </span>
        </div>
      </div>
    </form>
  );
};

export default FormRegister;
