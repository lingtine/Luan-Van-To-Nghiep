import React from "react";
import { TbCoins } from "react-icons/tb";
import { useFormatPrice } from "hooks/use-format-price";
import { useGetTotalRevenueQuery } from "redux/api/order/order";
import SimpleCard from "./simple-card";

interface TotalRevenueCardProps {}

const TotalRevenueCard: React.FC<TotalRevenueCardProps> = () => {
  const { data, isSuccess, isLoading } = useGetTotalRevenueQuery();
  const [format] = useFormatPrice();

  if (isSuccess) {
    return (
      <SimpleCard
        icon={<TbCoins className="text-xl" />}
        subTitle="Doanh thu ngày"
        content={format.format(data.data)}
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

export default TotalRevenueCard;
