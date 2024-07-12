import React, { ChangeEvent, FormEvent, useState } from "react";
import { Input, Button, Textarea } from "@material-tailwind/react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface IMessage {
  name: string;
  email: string;
  phoneNumber: string;
  message: string;
}

interface FormContactProps {}

const FormContact: React.FC<FormContactProps> = () => {
  const navigator = useNavigate();
  const [formData, setFormData] = useState<IMessage>({
    email: "",
    message: "",
    name: "",
    phoneNumber: "",
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      formData.name.trim().length === 0 ||
      formData.email.trim().length === 0 ||
      formData.message.trim().length === 0 ||
      formData.phoneNumber.trim().length === 0
    ) {
      toast.error("Vui lòng nhập đầy đủ thông tin");
    } else {
      toast.success("Cảm ơn bạn đã đóng góp ý kiến");
      navigator("/");
    }
  };
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex-[0_0_60%]  py-20 max-w-[60%] flex flex-col justify-between"
    >
      <div className="flex flex-col gap-4 flex-1">
        <div className="flex gap-4">
          <Input
            onChange={handleChange}
            value={formData.name}
            crossOrigin={""}
            name="name"
            label="Họ và Tên"
          />
          <Input
            value={formData.email}
            onChange={handleChange}
            name="email"
            crossOrigin={""}
            label="Email"
          />
          <Input
            value={formData.phoneNumber}
            onChange={handleChange}
            name="phoneNumber"
            crossOrigin={""}
            label="Số điện thoại"
          />
        </div>

        <Textarea
          onChange={handleChange}
          name="message"
          value={formData.message}
          className="flex-1 h-full"
          label="Lời nhắn"
        />
      </div>
      <div className="flex justify-end w-full">
        <Button type="submit" size="lg" className="bg-primary">
          Gửi góp ý
        </Button>
      </div>
    </form>
  );
};

export default FormContact;
