import React from "react";
import { Input, Button, Textarea } from "@material-tailwind/react";
interface FormContactProps {}

const FormContact: React.FC<FormContactProps> = () => {
  return (
    <form
      className="flex-[0_0_60%]  py-20 max-w-[60%] flex flex-col justify-between"
      action=""
    >
      <div className="flex flex-col gap-4 flex-1">
        <div className="flex gap-4">
          <Input crossOrigin={""} label="Họ và Tên" />
          <Input crossOrigin={""} label="Email" />
          <Input crossOrigin={""} label="Số điện thoại" />
        </div>

        <Textarea className="flex-1 h-full" label="Họ và Tên" />
      </div>
      <div className="flex justify-end w-full">
        <Button size="lg" className="bg-primary">
          Gửi góp ý
        </Button>
      </div>
    </form>
  );
};

export default FormContact;
