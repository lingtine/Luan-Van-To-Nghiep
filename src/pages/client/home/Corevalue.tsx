import React from "react";
import { TbTruckDelivery } from "react-icons/tb";
import { BsHeadset } from "react-icons/bs";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { v4 as uuid } from 'uuid'
interface CoreValueProps {}

const CoreValue: React.FC<CoreValueProps> = () => {
  const data = [
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

  const renderData = data.map((item) => {
    return (
      <div
        key={item.id}
        className="px-8 max-w-full flex-[0_0_100%] lg:max-w-[33.33333%] lg:flex-[0_0_33.33333%] mb-36 flex flex-col items-center"
      >
        <div className="border-10 border-[#959496] p-2 text-4xl w-fit rounded-full bg-black text-secondary">
          {item.icon}
        </div>
        <div className="mt-6">
          <h4 className="text-center text-xl font-medium ">{item.title}</h4>
          <p className="text-center text-sm">{item.subtitle}</p>
        </div>
      </div>
    );
  });

  return <div className="flex flex-wrap  mt-20 ">{renderData}</div>;
};

export default CoreValue;
