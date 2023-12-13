import React from "react";

interface InForAddressOrderProps {
  deliveryInfo: any;
}

const InForAddressOrder: React.FC<InForAddressOrderProps> = ({
  deliveryInfo,
}) => {
  return (
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
};

export default InForAddressOrder;
