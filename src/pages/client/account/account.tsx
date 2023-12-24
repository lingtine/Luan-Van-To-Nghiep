import React from "react";
import { useAppSelector } from "redux/store";
import { Input } from "@material-tailwind/react";
import { useGetOrdersByCustomerQuery } from "redux/api/order/order";
interface AccountPageProps {}

const AccountPage: React.FC<AccountPageProps> = () => {
  const { data, isSuccess } = useGetOrdersByCustomerQuery(null);
  const { user } = useAppSelector((state) => state.userSlice);

  if (user) {
    return (
      <div>
        <h3 className="text-xl font-semibold mb-8">Thông tin khách hàng</h3>
        <div className="flex gap-4">
          <div className="flex-[0_0_50%] max-w-[50%]">
            <Input crossOrigin={""} label="Họ và tên" value={user.name}></Input>
          </div>

          <div className="flex-[0_0_50%] max-w-[50%]">
            <Input crossOrigin={""} label="Email" value={user.email}></Input>
          </div>
        </div>
      </div>
    );
  }

  return <></>;
};

export default AccountPage;
