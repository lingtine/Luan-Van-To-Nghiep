import OrderTable from "pages/admin/orders/components/OrderTable";
import React from "react";
import { useGetOrdersByCustomerQuery } from "redux/api/order/order";
import CustomerOrderTable from "./components/CustomerOrderTable";
import TableOrder from "./components/table-orders";

interface AccountOrderProps {}

const AccountOrder: React.FC<AccountOrderProps> = () => {
  const { data, isSuccess } = useGetOrdersByCustomerQuery();
  console.log("🚀 ~ TableOrder data:", data);

  if (isSuccess) {
    const isHadOrder = data.length > 0;
    console.log("🚀 ~ isHadOrder:", isHadOrder);

    return (
      <>
        {isHadOrder ? (
          <>
            <h2 className="text-2xl uppercase font-semibold ">Đơn hàng</h2>
            <div className="my-4">
              <CustomerOrderTable rows={data} />
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
