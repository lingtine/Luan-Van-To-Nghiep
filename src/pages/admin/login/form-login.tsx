import React from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { useLoginMutation } from "redux/api/authApi";
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
  }, [isSuccess]);

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
    <div className="border px-12 py-8 border-primary-1 rounded-md shadow-xl">
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Đăng nhập
        </Typography>
        <form
          onSubmit={handleSubmit}
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        >
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Email
            </Typography>
            <Input
              crossOrigin={"use-credentials"}
              size="lg"
              name="email"
              value={dataForm.email}
              onChange={handleTyping}
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
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
          {/* <Checkbox
            crossOrigin={"use-credentials"}
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center font-normal"
              >
                I agree the
                <a
                  href="#"
                  className="font-medium transition-colors hover:text-gray-900"
                >
                  &nbsp;Terms and Conditions
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          /> */}
          <Button type="submit" className="mt-6" fullWidth>
            Đăng nhập
          </Button>
          {/* <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{" "}
            <a href="#" className="font-medium text-gray-900">
              Sign In
            </a>
          </Typography> */}
        </form>
      </Card>
    </div>
  );
};

export default FormLogin;
