import React from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { useLoginMutation } from "redux/api/auth/authApi";
import { useNavigate } from "react-router-dom";
interface FormLoginProps {}

const FormLogin: React.FC<FormLoginProps> = () => {
  const [login, { isSuccess }] = useLoginMutation();
  const navigate = useNavigate();
  const [dataForm, setDataForm] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    if (isSuccess) {
      navigate("/admin/");
    }
  }, [isSuccess, navigate]);

  const handleTyping = (e: React.ChangeEvent<EventTarget>) => {
    const { name, value } = e.target as HTMLInputElement;

    setDataForm(() => {
      return { ...dataForm, [name]: value };
    });
  };

  const handleSubmit = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    login(dataForm);
  };

  return (
    <Card color="white" shadow={false} className="px-12 py-8 shadow">
      <Typography variant="h4" color="black" className="py-2 text-center">
        Đăng nhập
      </Typography>
      <Typography variant="small" color="black" className="text-center">
        Chào mừng bạn đến trang admin
      </Typography>
      <form
        onSubmit={handleSubmit}
        className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
      >
        <div className="mb-1 flex flex-col gap-6">
          <Typography variant="h6" color="black" className="-mb-3">
            Email
          </Typography>
          <Input
            crossOrigin={"use-credentials"}
            size="lg"
            name="email"
            value={dataForm.email}
            onChange={handleTyping}
            placeholder="name@gmail.com"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="black" className="-mb-3">
            Mật khẩu
          </Typography>
          <Input
            crossOrigin={"use-credentials"}
            type="password"
            size="lg"
            name="password"
            value={dataForm.password}
            onChange={handleTyping}
            placeholder="********"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
        </div>

        <Button type="submit" className="mt-6" fullWidth>
          Đăng nhập
        </Button>
      </form>
    </Card>
  );
};

export default FormLogin;
