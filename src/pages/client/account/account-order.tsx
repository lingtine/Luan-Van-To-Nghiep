import React from "react";
import { useGetOrdersByCustomerQuery } from "redux/api/order/order";
import TableOrder from "./components/table-orders";

interface AccountOrderProps {}

const AccountOrder: React.FC<AccountOrderProps> = () => {
  const { data, isSuccess } = useGetOrdersByCustomerQuery(null);

  if (isSuccess) {
    console.log(data);
    return (
      <>
        {data.length !== 0 ? (
          <>
            <h2 className="text-2xl uppercase font-semibold ">Đơn hàng</h2>
            <div className="my-4">
              <TableOrder data={data} />
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full w-full my-4">
            <h3 className="text-2xl">Bạn chưa mua hàng</h3>
          </div>
        )}
      </>
    );
  }

  return <></>;
};

export default AccountOrder;
