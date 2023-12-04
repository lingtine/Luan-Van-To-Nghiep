import Table from "components/table/table";
import React from "react";
import { useParams } from "react-router-dom";
import {
  useGetOrderQuery,
  useOrderProcessingMutation,
} from "redux/api/order/order";
import { format } from "date-fns";
import { Button } from "@material-tailwind/react";

interface OrderDetailProps {}

const OrderDetail: React.FC<OrderDetailProps> = () => {
  const { orderId } = useParams();
  const [changeOrderProcess, result] = useOrderProcessingMutation();
  const { data, isSuccess } = useGetOrderQuery(orderId || "");
  const configTableProduct = [
    {
      label: "STT",
      render: (data: any) => {
        return data.index;
      },
    },
    {
      label: "Tên sản phẩm",
      render: (data: any) => {
        return data.name;
      },
    },
    {
      label: "Số lượng",
      render: (data: any) => {
        return data.quantity;
      },
    },

    {
      label: "Giá Bán",
      render: (data: any) => {
        return data.unitPrice;
      },
    },

    {
      label: "Tổng giá",
      render: (data: any) => {
        return (
          <div className="text-right">{data.quantity * data.unitPrice}</div>
        );
      },
    },
  ];
  let contentDataProducts: React.ReactNode;
  let contentDataInfo: React.ReactNode;
  let contentDataOrder: React.ReactNode;

  if (isSuccess) {
    const updateData = data.cart.items.map((item, index) => ({
      ...item,
      index: index + 1,
    }));
    contentDataProducts = (
      <Table config={configTableProduct} data={updateData}></Table>
    );
  }
  if (isSuccess) {
    const { deliveryInfo } = data;
    contentDataInfo = (
      <div className="my-4 p-6 border border-primary-1 rounded-xl">
        <h3 className="text-xl font-semibold pb-4">Thông tin giao hàng</h3>
        <div className="flex justify-between py-4 border-t border-teal-400">
          <div className=" font-semibold">Tên Người Nhận</div>
          <p>{deliveryInfo.fullName}</p>
        </div>
        <div className="flex justify-between py-4 border-t border-teal-400">
          <div className=" font-semibold">Số điện thoại</div>
          <p>{deliveryInfo.phoneNumber}</p>
        </div>
        <div className="flex justify-between py-4 border-t border-teal-400">
          <div className=" font-semibold">Email </div>
          <p>{deliveryInfo.email}</p>
        </div>

        <div className="flex justify-between py-4 border-t border-teal-400">
          <div className=" font-semibold">Địa chỉ</div>
          <p>
            {deliveryInfo.address.streetNumber +
              " " +
              deliveryInfo.address.street +
              " " +
              deliveryInfo.address.ward +
              " " +
              deliveryInfo.address.district +
              " " +
              deliveryInfo.address.city}
          </p>
        </div>
        <div className="flex justify-between pt-4 border-t border-teal-400">
          <div className=" font-semibold">Note</div>
          <p>{deliveryInfo.note}</p>
        </div>
      </div>
    );
  }
  if (isSuccess) {
    const { createAt, amount } = data;
    var date = new Date(createAt);
    contentDataOrder = (
      <div className="px-8 py-6 border bg-blue-50 rounded-xl shadow-xl">
        <h3 className="text-xl font-semibold pb-4">Thông tin đơn hàng</h3>
        <div className="flex justify-between my-2">
          <h5 className="font-semibold">Ngày đặt đặt</h5>
          <p>{format(date, "P")}</p>
        </div>
        <div className="flex justify-between my-2">
          <h5 className="font-semibold">Thời gian đặt</h5>
          <p>{format(date, "p")}</p>
        </div>
        <div className="flex justify-between my-2">
          <h5 className="font-semibold">Tổng đơn hàng</h5>
          <p>{amount}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between items-center px-8">
        <h3 className="text-3xl font-bold my-8">Đơn hàng chi tiết</h3>
        <div>
          <Button
            color="blue"
            onClick={() => {
              changeOrderProcess(data?.id || "");
            }}
          >
            xử lý
          </Button>
        </div>
      </div>
      <div className="flex ">
        <div className="flex flex-col flex-[0_0_60%]">
          {contentDataProducts}
          {contentDataInfo}
        </div>
        <div className="flex-[0_0_40%] px-6">{contentDataOrder}</div>
      </div>
    </>
  );
};

export default OrderDetail;
