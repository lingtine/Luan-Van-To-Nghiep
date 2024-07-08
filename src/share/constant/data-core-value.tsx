import React from "react";
import { TbTruckDelivery } from "react-icons/tb";
import { BsHeadset } from "react-icons/bs";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { v4 as uuid } from "uuid";

const dataCoreValue = [
  {
    id: uuid(),
    title: "Giao hàng miễn phí và nhanh chóng",
    subtitle: "Miễn phí giao hàng cho đơn hàng trên 500k",
    icon: <TbTruckDelivery />,
  },
  {
    id: uuid(),
    title: "DỊCH VỤ KHÁCH HÀNG 24/7",
    subtitle: "Hỗ trợ khách hàng thân thiện 24/7",
    icon: <BsHeadset />,
  },
  {
    id: uuid(),
    title: "THỦ TỤC ĐỔI TRẢ",
    subtitle: "Chúng tôi trả lại tiền trong vòng 30 ngày",
    icon: <AiOutlineSafetyCertificate />,
  },
];

export { dataCoreValue };
