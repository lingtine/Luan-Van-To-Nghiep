import React from "react";
import { TbCoins } from "react-icons/tb";
import { useFormatPrice } from "hooks/use-format-price";
import { useGetTotalRevenueQuery } from "redux/api/order/order";
interface TotalRevenueCardProps {}

const TotalRevenueCard: React.FC<TotalRevenueCardProps> = () => {
  const { data, isSuccess } = useGetTotalRevenueQuery(null);
  const [format] = useFormatPrice();

  if (isSuccess) {
    return (
      <div className="flex-[0_0_20%] border-primary-1 border px-8 py-4 rounded-xl items-center gap-4 flex justify-center">
        <div className="text-4xl">
          <TbCoins />
        </div>
        <div>
          <h4 className="text-lg font-semibold">{format.format(data.data)}</h4>
          <p className="text-sm font-medium">Doanh thu</p>
        </div>
      </div>
    );
  }

  return <></>;
};

export default TotalRevenueCard;
