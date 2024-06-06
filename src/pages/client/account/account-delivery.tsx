import React, { useState, useEffect } from "react";
import { useAppSelector } from "redux/store";
import { Button, Input } from "@material-tailwind/react";
import { ICustomerDetail } from "redux/api/types";
import Modal from "components/modal/modal";
import { toast } from "react-toastify";
import { useAddDeliveryInfoMutation } from "redux/api/auth/customer-api";
import TableDeliveryInfo from "./components/table-deliveryInfo";
import { IDeliveryInput } from "redux/api/types";

interface AccountDeliveryProps {}

const AccountDelivery: React.FC<AccountDeliveryProps> = () => {
  const [addDelivery, { isSuccess }] = useAddDeliveryInfoMutation();
  const [isOpen, setIsOpen] = useState(false);

  const [delivery, setDelivery] = useState<IDeliveryInput>({
    address: { city: "", number: "", district: "", street: "", ward: "" },
    name: "",
    phoneNumber: "",
  });
  const user = useAppSelector(
    (state) => state.userSlice.user
  ) as ICustomerDetail;
  useEffect(() => {
    if (isSuccess) {
      setIsOpen(false);
    }
  }, [isSuccess]);
  if (!user) {
    return <></>;
  }

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const actions = (
    <div className=" flex gap-4">
      <Button
        type={"submit"}
        color="blue"
        onClick={() => {
          handleSubmit();
        }}
      >
        Thêm địa chỉ
      </Button>
      <Button onClick={handleClose} color="red">
        Huỷ
      </Button>
    </div>
  );

  const handleSubmit = () => {
    if (
      delivery.address.city.trim().length === 0 ||
      delivery.address.district.trim().length === 0 ||
      delivery.name.trim().length === 0 ||
      delivery.address.number.trim().length === 0 ||
      delivery.phoneNumber.trim().length === 0 ||
      delivery.address.street.trim().length === 0 ||
      delivery.address.ward.trim().length === 0
    ) {
      toast.error("Vui lòng nhập đầy đủ thông tin");
    } else {
      addDelivery(delivery);

      setDelivery({
        address: { city: "", number: "", district: "", street: "", ward: "" },
        name: "",
        phoneNumber: "",
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setDelivery(() => ({
      ...delivery,
      [name]: value,
    }));
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
          <Button onClick={handleOpen}>Thêm địa chỉ</Button>
        </div>
        {isOpen && (
          <Modal onClose={handleClose} actions={actions}>
            <div>
              <h4 className="text-xl font-semibold">Địa chỉ giao hàng</h4>
              <div className="flex flex-wrap -mx-2">
                <div className="flex-[0_0_50%] max-w-[50%] p-2">
                  <Input
                    crossOrigin={""}
                    onChange={handleChange}
                    name="name"
                    label="Họ và tên"
                    value={delivery.name}
                  />
                </div>
                <div className="flex-[0_0_50%] max-w-[50%] p-2">
                  <Input
                    crossOrigin={""}
                    onChange={handleChange}
                    name="phoneNumber"
                    label="Số điện thoại"
                    value={delivery.phoneNumber}
                  />
                </div>

                <div className="flex-[0_0_50%] max-w-[50%] p-2">
                  <Input
                    crossOrigin={""}
                    onChange={handleChange}
                    name="number"
                    label="Số nhà"
                    value={delivery.address.number}
                  />
                </div>
                <div className="flex-[0_0_50%] max-w-[50%] p-2">
                  <Input
                    crossOrigin={""}
                    onChange={handleChange}
                    name="street"
                    label="Đường"
                    value={delivery.address.street}
                  />
                </div>
                <div className="flex-[0_0_50%] max-w-[50%] p-2">
                  <Input
                    crossOrigin={""}
                    onChange={handleChange}
                    name="ward"
                    label="Phường"
                    value={delivery.address.ward}
                  />
                </div>
                <div className="flex-[0_0_50%] max-w-[50%] p-2">
                  <Input
                    crossOrigin={""}
                    onChange={handleChange}
                    name="district"
                    label="Quận"
                    value={delivery.address.district}
                  />
                </div>
                <div className="flex-[0_0_50%] max-w-[50%] p-2">
                  <Input
                    crossOrigin={""}
                    onChange={handleChange}
                    name="city"
                    label="Thành phố"
                    value={delivery.address.city}
                  />
                </div>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default AccountDelivery;
