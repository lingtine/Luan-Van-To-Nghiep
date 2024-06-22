import React, { useState } from "react";
import { useAppSelector } from "redux/store";
import { Button } from "@material-tailwind/react";
import { ICustomerDetail } from "redux/api/types";

import TableDeliveryInfo from "./components/table-deliveryInfo";
import ModalAddDeliveryInfo from "./components/modal-add-delivery-info";

interface AccountDeliveryProps {}

const AccountDelivery: React.FC<AccountDeliveryProps> = () => {
  const [isOpen, setIsOpen] = useState(false);

  const user = useAppSelector(
    (state) => state.userSlice.user
  ) as ICustomerDetail;

  if (!user) {
    return <></>;
  }

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-8">Địa chỉ giao hàng</h3>
      <div className="flex gap-4 flex-col">
        {user.deliveryInfos.length === 0 ? (
          <>
            <h4>Bạn chưa thêm địa chỉ giao hàng</h4>
          </>
        ) : (
          <>
            <TableDeliveryInfo data={user.deliveryInfos} />
          </>
        )}
        <div>
          <Button onClick={handleToggle}>Thêm địa chỉ</Button>
        </div>
        {isOpen && <ModalAddDeliveryInfo onClose={handleToggle} />}
      </div>
    </div>
  );
};

export default AccountDelivery;
