import React from "react";
import { useGetTotalCustomerQuery } from "redux/api/auth/customer-api";
import SimpleCard from "./simple-card";
import { HiUsers } from "react-icons/hi2";
interface TotalCustomerCartProps {}

const TotalCustomerCart: React.FC<TotalCustomerCartProps> = () => {
  const { data, isSuccess, isLoading } = useGetTotalCustomerQuery();

  if (isSuccess) {
    return (
      <SimpleCard
        icon={<HiUsers className="text-xl" />}
        subTitle="Số lượng truy cập"
        content={data.data}
        comparisonTime="last month"
        isGrowing={true}
        percent={3}
      />
    );
  } else if (isLoading) {
    return (
      <div className="w-full min-h-[116px] animate-pulse place-items-center rounded-lg bg-gray-300"></div>
    );
  }

  return <></>;
};

export default TotalCustomerCart;
