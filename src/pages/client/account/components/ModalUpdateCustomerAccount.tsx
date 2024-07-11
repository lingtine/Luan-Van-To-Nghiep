import Button from "@material-tailwind/react/components/Button";
import Input from "@material-tailwind/react/components/Input";
import Modal from "components/modal/modal";
import UploadImage from "components/upload-image/upload-image";
import React, { useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useUpdateProfileMutation } from "redux/api/auth/customer-api";
import { ICustomerDetail, IUpdateCustomer, IUserDetail } from "redux/api/types";
import moment from "moment";
import SelectBox, { ISelected } from "components/select-box/select-box";

interface IModalUpdateCustomerAccountProps {
  customer: IUserDetail | ICustomerDetail;
  onToggle: () => void;
}

const ModalUpdateCustomerAccount = ({
  customer,
  onToggle,
}: IModalUpdateCustomerAccountProps) => {
  const moment = require("moment");
  const genderOptions: ISelected[] = [
    { id: "Male", label: "Nam" },
    { id: "Female", label: "Nữ" },
    { id: "Other", label: "Khác" },
  ];
  const defaultGender = genderOptions.find(
    (x: ISelected) => x.id === customer.gender
  );
  const [gender, setGender] = useState<ISelected | undefined>(defaultGender);
  const [birthday, setBirthday] = useState(customer.birthDay);

  const [formData, setFormData] = useState<IUpdateCustomer>({
    id: customer.id,
    name: customer.name,
    email: customer.email,
    birthDay: customer.birthDay,
    gender: customer.gender,
    phone: customer.phone,
    image: new DataTransfer().files[0],
  } as IUpdateCustomer);

  const [updateCustomerInfo] = useUpdateProfileMutation();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    updateCustomerInfo(formData);
  };
  return (
    <div>
      <Modal onClose={onToggle}>
        <form
          onSubmit={handleSubmit}
          className="flex-col justify-between gap-10"
        >
          <div>
            <header className="text-2xl my-4 font-bold">
              Thông tin khách hàng
            </header>
          </div>
          <div className="flex justify-between gap-4">
            <section className="w-full">
              <UploadImage
                onChange={(file) => {
                  setFormData(() => {
                    return { ...formData, image: file };
                  });
                }}
              />
            </section>
            <section className="">
              <div className="flex flex-col gap-6">
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
                      return { ...formData, phone: event.target.value };
                    });
                  }}
                  value={formData.phone}
                  name="name"
                  crossOrigin={"use-credentials"}
                  variant="outlined"
                  label="Số điện thoại"
                />
                <SelectBox
                  onChange={(option: ISelected) => {
                    setGender(option);
                    setFormData(() => {
                      return { ...formData, gender: option.id };
                    });
                  }}
                  options={genderOptions}
                  selected={gender}
                  label="Giới tính"
                />
                <Input
                  onChange={(event) => {
                    setFormData(() => {
                      if (event.target.value) {
                        console.log(
                          "🚀 ~ setFormData ~ event.target.value:",
                          event.target.value
                        );
                        return {
                          ...formData,
                          birthDay: moment(event.target.value).toDate(),
                        };
                      }
                      return formData;
                    });
                  }}
                  // value={moment(formData.birthDay).format("dd/mm/yyyy")}
                  crossOrigin={"use-credentials"}
                  type="date"
                  label="Ngày sinh"
                />
              </div>
            </section>
          </div>
          <div className="w-full mt-4">
            <Button className="w-full" type="submit">
            Lưu
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ModalUpdateCustomerAccount;
