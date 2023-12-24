import React from "react";

import { HiOutlineDocumentReport } from "react-icons/hi";
import { useGetTotalOrderCreateQuery } from "redux/api/order/order";
interface TotalOrderCreateCardProps {}

const TotalOrderCreateCard: React.FC<TotalOrderCreateCardProps> = () => {
  const { data, isSuccess } = useGetTotalOrderCreateQuery(null);

  if (isSuccess) {
    return (
      <div className="flex-[0_0_20%] border-primary-1 border px-8 py-4 rounded-xl items-center gap-4 flex justify-center">
        <div className="text-4xl">
          <HiOutlineDocumentReport />
        </div>
        <div>
          <h4 className="text-lg font-semibold">{data.data}</h4>
          <p className="text-sm font-medium">Đơn hàng mới</p>
        </div>
      </div>
    );
  }

  return <></>;
};

export default TotalOrderCreateCard;
