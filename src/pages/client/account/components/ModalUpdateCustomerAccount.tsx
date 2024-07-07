import Button from "@material-tailwind/react/components/Button";
import Input from "@material-tailwind/react/components/Input";
import UploadImage from "components/upload-image/upload-image";
import React, { useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useUpdateProfileMutation } from "redux/api/auth/customer-api";
import { ICustomerDetail, IUpdateCustomer, IUserDetail } from "redux/api/types";

interface IModalUpdateCustomerAccountProps {
  customer: IUserDetail | ICustomerDetail;
  onToggle: () => void;
}

const ModalUpdateCustomerAccount = ({
  customer,
  onToggle,
}: IModalUpdateCustomerAccountProps) => {
  console.log("🚀 ~ customer:", customer)
  const [formData, setFormData] = useState<IUpdateCustomer>({
    id: customer.id,
    name: customer.name,
    email: customer.email,
    image: new DataTransfer().files[0],
  } as IUpdateCustomer);

  const [updateCustomerInfo] = useUpdateProfileMutation();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    updateCustomerInfo(formData);
    console.log("Submitted Customer: ", formData);
  };

  return (
    <div className="px-8">
      <div className="flex gap-4 border-y py-3  items-center">
        <Link to={"/account"}>
          <Button variant="text" className="text-lg" onClick={onToggle}>
            <AiOutlineArrowLeft />
          </Button>
        </Link>
        <div>
          <p className="text-sm">Trở về</p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex justify-between gap-10 p-10"
      >
        <section className="flex-[0_0_50%]">
          <UploadImage
            onChange={(file) => {
              setFormData(() => {
                return { ...formData, image: file };
              });
            }}
          />
        </section>
        <section className=" flex-[0_0_50%]">
          <header className="text-2xl my-4 font-bold ">
            Thông tin khách hàng
          </header>
          <div className="flex flex-col gap-4">
            <Input
              onChange={(event) => {
                setFormData(() => {
                  return { ...formData, name: event.target.value };
                });
              }}
              value={formData.name}
              name="name"
              crossOrigin={"use-credentials"}
              variant="outlined"
              label="Họ và tên"
            />

            <Input
              onChange={(event) => {
                setFormData(() => {
                  return { ...formData, email: event.target.value };
                });
              }}
              value={formData.email}
              name="name"
              crossOrigin={"use-credentials"}
              variant="outlined"
              label="Email"
            />
          </div>
          <div className="flex justify-end my-4">
            <Button type="submit">Cập nhật</Button>
          </div>
        </section>
      </form>
    </div>
  );
};

export default ModalUpdateCustomerAccount;
