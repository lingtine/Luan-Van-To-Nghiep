import React, { useState } from "react";
import { useAppSelector } from "redux/store";
import { Input, Button } from "@material-tailwind/react";
import { IoIosArrowBack } from "react-icons/io";
import ModalUpdateCustomerAccount from "./components/ModalUpdateCustomerAccount";
import { ICustomerDetail } from "redux/api/types";
import ModalChangePassword from "./components/ModalChangePassword";

interface AccountPageProps {}

const AccountPage: React.FC<AccountPageProps> = () => {
  const moment = require("moment");

  const { user } = useAppSelector((state) => state.userSlice);
  const [isOpenUpdateProfile, setIsOpenUpdateProfile] = useState<boolean>(false);
  const [isOpenChangePassword, setIsOpenChangePassword] = useState<boolean>(false);
  if (user) {
    return (
      <>
        <h3 className="text-xl font-semibold mb-8">Thông tin khách hàng</h3>
        <div>
          <div className="flex gap-4">
            <div className="flex-[0_0_50%] max-w-[50%]">
              <Input
                crossOrigin={""}
                readOnly
                label="Họ và tên"
                value={user.name}
              ></Input>
            </div>
            <div className="flex-[0_0_50%] max-w-[50%]">
              <Input
                crossOrigin={""}
                readOnly
                label="Email"
                value={user.email}
              ></Input>
            </div>
          </div>
          <div className="flex gap-4 mt-4">
            <div className="flex-[0_0_50%] max-w-[50%]">
              <Input
                crossOrigin={""}
                readOnly
                label="Ngày sinh"
                value={
                  user.birthDay
                    ? moment(user.birthDay).format("DD/MM/YYYY")
                    : ""
                }
              ></Input>
            </div>
            <div className="flex-[0_0_50%] max-w-[50%]">
              <Input
                crossOrigin={""}
                readOnly
                label="Giới tính"
                value={user.gender}
              ></Input>
            </div>
          </div>
          <div className="flex gap-4 my-4 items-center justify-end">
            <Button
              onClick={() => setIsOpenChangePassword(true)}
              color="blue"
              className="flex gap-2 items-center"
            >
              Đổi mật khẩu
            </Button>
            <Button
              onClick={() => setIsOpenUpdateProfile(true)}
              color="blue"
              className="flex gap-2 items-center"
            >
              Cập nhật thông tin
            </Button>
          </div>
        </div>
        {isOpenUpdateProfile && (
          <ModalUpdateCustomerAccount
            customer={user}
            onToggle={() => {
              setIsOpenUpdateProfile(false);
            }}
          ></ModalUpdateCustomerAccount>
        )}
        {isOpenChangePassword && (
          <ModalChangePassword
            onToggle={() => {
              setIsOpenChangePassword(false);
            }}
          ></ModalChangePassword>
        )}
        
      </>
    );
  }

  return <></>;
};

export default AccountPage;
