import React from "react";
import SlideBarAccount from "./components/side-bar/slide-bar-account";

import { Outlet } from "react-router-dom";
import { useGetCustomerDetailQuery } from "redux/api/auth/customer-api";
interface AccountLayoutProps {}

const AccountLayout: React.FC<AccountLayoutProps> = () => {
  const { isSuccess } = useGetCustomerDetailQuery(null);

  if (isSuccess) {
    return (
      <div className="container flex my-20 gap-10">
        <div className="flex">
          <SlideBarAccount />
        </div>
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    );
  }
  return <></>;
};

export default AccountLayout;
