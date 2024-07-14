import React, { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetOrderQuery,
  useOrderProcessingMutation,
} from "redux/api/order/order";

import Button from "@mui/material/Button";
import { useReactToPrint } from "react-to-print";
import InForAddressOrder from "../infor-address-order";
import TableProductOrder from "../table-product-order";
import ComponentToPrint from "./component-to-print";
import OrderInfoDetail from "../order-infor";
import { dataInfo } from "share/constant/data-about";

interface IOrderInfoProps {
  isCustomer?: boolean;
}

const OrderInfo = ({ isCustomer }: IOrderInfoProps) => {
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
          color="warning"
          variant="contained"
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
        <Button color="success" variant="contained">
          Hoàn tất
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
          <ComponentToPrint data={data} ref={componentRef} />
        </div>

        <div className="flex justify-between items-center px-8">
          <h3 className="text-3xl font-bold my-8">Chi tiết đơn hàng</h3>
          <div className="flex gap-4">
            {!isCustomer && (
              <Button variant="contained" onClick={handlePrint}>
                In Hoá Đơn
              </Button>
            )}
            {isCustomer ? (
              <Button color="success" variant="contained">
                Hoàn tất
              </Button>
            ) : (
              renderButtonOrderProcessing
            )}
          </div>
        </div>
      </div>
      <div className="flex-col flex-[0_0_100%] max-w-[100%] flex gap-4">
        <div>{isSuccess && <OrderInfoDetail order={data} />}</div>

        <div>
          {isSuccess && <InForAddressOrder deliveryInfo={data.deliveryInfo} />}
        </div>
        <div>{isSuccess && <TableProductOrder order={data} />}</div>
      </div>
    </div>
  );
};

export default OrderInfo;
