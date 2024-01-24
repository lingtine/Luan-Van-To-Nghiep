import React from "react";
import { FaRegUser } from "react-icons/fa";
import { useGetTotalCustomerQuery } from "redux/api/auth/customer-api";
interface TotalCustomerCartProps {}

const TotalCustomerCart: React.FC<TotalCustomerCartProps> = () => {
  const { data, isSuccess } = useGetTotalCustomerQuery(null);

  if (isSuccess) {
    return (
      <div className="flex-[0_0_20%] border-primary-1 border px-8 py-4 rounded-xl items-center gap-4 flex justify-center">
        <div className="text-4xl">
          <FaRegUser />
        </div>
        <div>
          <h4 className="text-lg font-semibold">{data.data}</h4>
          <p className="text-sm font-medium">Người dùng </p>
        </div>
      </div>
    );
  }

  return <></>;
};

export default TotalCustomerCart;
