import React from "react";
import { useGetOrdersByCustomerQuery } from "redux/api/order/order";

interface AccountOrderProps {}

const AccountOrder: React.FC<AccountOrderProps> = () => {
  const { data, isSuccess } = useGetOrdersByCustomerQuery(null);

  if (isSuccess) {
    console.log(data);
  }

  return (
    <>
      {data?.length !== 0 ? (
        <> </>
      ) : (
        <div className="flex items-center justify-center h-full w-full">
          <h3 className="text-2xl">Bạn chưa mua hàng</h3>
        </div>
      )}
    </>
  );
};

export default AccountOrder;
