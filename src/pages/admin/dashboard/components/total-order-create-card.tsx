import React from "react";

import { HiOutlineDocumentReport } from "react-icons/hi";
import { useGetTotalOrderCreateQuery } from "redux/api/order/order";
import SimpleCard from "./simple-card";

interface TotalOrderCreateCardProps {}

const TotalOrderCreateCard: React.FC<TotalOrderCreateCardProps> = () => {
  const { data, isSuccess, isLoading } = useGetTotalOrderCreateQuery();

  if (isSuccess) {
    return (
      <SimpleCard
        icon={<HiOutlineDocumentReport className="text-xl" />}
        subTitle="Đơn hàng mới"
        content={data.data}
        comparisonTime="last month"
        isGrowing={true}
        percent={0}
      />
    );
  } else if (isLoading) {
    return (
      <div className="w-full min-h-[116px] animate-pulse place-items-center rounded-lg bg-gray-300"></div>
    );
  }
  return <></>;
};

export default TotalOrderCreateCard;
