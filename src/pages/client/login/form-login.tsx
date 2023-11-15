import React from "react";
import { Input, Button } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLoginMutation } from "redux/api/authApi";
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
        <h4 className="text-4xl font-medium my-2">Đăng nhập</h4>
        <Input
          onChange={handleChange}
          value={dataForm.email}
          name="name"
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
          <Link className="text-primary" to={"/forget-password"}>
            Quên Mật Khẩu?
          </Link>
        </div>
      </div>
    </form>
  );
};

export default FormLogin;
