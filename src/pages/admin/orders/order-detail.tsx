import React, { useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetOrderQuery,
  useOrderProcessingMutation,
} from "redux/api/order/order";

import { Button } from "@material-tailwind/react";
import TableProductOrder from "./table-product-order";
import InForAddressOrder from "./infor-address-order";
import OrderInfo from "./order-infor";
import { useReactToPrint } from "react-to-print";
import ComponentToPrint from "./components/component-to-print";

interface OrderDetailProps {}

const OrderDetail: React.FC<OrderDetailProps> = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const [changeOrderProcess] = useOrderProcessingMutation();
  const { data, isSuccess } = useGetOrderQuery(orderId || "");

  let renderButtonOrderProcessing: React.ReactNode;

  if (isSuccess) {
    const { status, id } = data;

    if (status === "Created") {
      renderButtonOrderProcessing = (
        <Button
          color="yellow"
          onClick={async () => {
            await changeOrderProcess(id);
            navigate(-1);
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
  const componentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className="container px-8">
      <div className="flex-[0_0_100%] max-w-[100%]">
        <div className="hidden">
          <ComponentToPrint ref={componentRef} />
        </div>
        <div className="flex justify-between items-center px-8">
          <h3 className="text-3xl font-bold my-8">Đơn hàng chi tiết</h3>
          <div className="flex gap-4">
            <Button onClick={handlePrint}>In Hoá Đơn</Button>
            {renderButtonOrderProcessing}{" "}
          </div>
        </div>
      </div>
      <div className="flex-[0_0_100%] max-w-[100%] flex">
        <div className="flex-[0_0_66.66666%] max-w-[66.66666%] flex flex-col ">
          {isSuccess && (
            <>
              <TableProductOrder data={data.cart.items} />
              <InForAddressOrder deliveryInfo={data.deliveryInfo} />
            </>
          )}
          {}
        </div>
        <div className="flex-[0_0_33.33333%] max-w-[33.33333%]">
          {isSuccess && (
            <OrderInfo timeCreate={data.createAt} amount={data.amount} />
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
