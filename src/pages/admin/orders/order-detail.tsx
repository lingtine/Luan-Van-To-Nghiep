import Table from "components/table/table";
import React from "react";
import { useParams } from "react-router-dom";
import {
  useGetOrderQuery,
  useOrderProcessingMutation,
} from "redux/api/order/order";

import { Button } from "@material-tailwind/react";
import TableProductOrder from "./table-product-order";
import InForAddressOrder from "./infor-address-order";
import OrderInfo from "./order-infor";

interface OrderDetailProps {}

const OrderDetail: React.FC<OrderDetailProps> = () => {
  const { orderId } = useParams();
  const [changeOrderProcess, result] = useOrderProcessingMutation();
  const { data, isSuccess } = useGetOrderQuery(orderId || "");

  let renderButtonOrderProcessing: React.ReactNode;

  if (isSuccess) {
    const { status, id } = data;

    if (status === "Created") {
      renderButtonOrderProcessing = (
        <Button
          color="yellow"
          onClick={() => {
            changeOrderProcess(id);
          }}
        >
          Xử lý
        </Button>
      );
    } else if (status === "Delivered") {
      renderButtonOrderProcessing = (
        <Button color="blue" ripple={false}>
          Đã giao hàng thành công
        </Button>
      );
    }
  }

  return (
    <>
      <div className="flex justify-between items-center px-8">
        <h3 className="text-3xl font-bold my-8">Đơn hàng chi tiết</h3>
        <div>{renderButtonOrderProcessing} </div>
      </div>
      <div className="flex ">
        <div className="flex flex-col flex-[0_0_60%]">
          {isSuccess && (
            <>
              <TableProductOrder data={data.cart.items} />{" "}
              <InForAddressOrder deliveryInfo={data.deliveryInfo} />
            </>
          )}
          {}
        </div>
        <div className="flex-[0_0_40%] px-6">
          {isSuccess && (
            <OrderInfo timeCreate={data.createAt} amount={data.amount} />
          )}
        </div>
      </div>
    </>
  );
};

export default OrderDetail;
