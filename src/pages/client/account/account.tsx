import React from "react";
import { useAppSelector } from "redux/store";
import { Input, Button } from "@material-tailwind/react";
import { IoIosArrowBack } from "react-icons/io";
import ModalUpdateCustomerAccount from "./components/ModalUpdateCustomerAccount";
import { ICustomerDetail } from "redux/api/types";

interface AccountPageProps {}

const AccountPage: React.FC<AccountPageProps> = () => {
  const { user } = useAppSelector((state) => state.userSlice);

  if (user) {
    return (
      <>
        {/* <h3 className="text-xl font-semibold mb-8">Thông tin khách hàng</h3>
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
          <div className="flex gap-4 my-4 items-center justify-end">
            <Button
              onClick={() => {}}
              color="blue"
              className="flex gap-2 items-center"
            >
              Đổi mật khẩu
            </Button>
            <Button
              onClick={() => {}}
              color="blue"
              className="flex gap-2 items-center"
            >
              Cập nhật thông tin
            </Button>
          </div>
        </div> */}
        <ModalUpdateCustomerAccount
          customer={user}
          onToggle={() => {
            console.log("first");
          }}
        ></ModalUpdateCustomerAccount>
      </>
    );
  }

  return <></>;
};

export default AccountPage;
