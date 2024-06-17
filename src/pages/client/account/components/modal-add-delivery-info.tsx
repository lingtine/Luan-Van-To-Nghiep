import React, { useEffect, useState } from "react";
import { Input, Button } from "@material-tailwind/react";
import Modal from "components/modal/modal";
import { IDeliveryInput } from "redux/api/types";
import { toast } from "react-toastify";
import { useAddDeliveryInfoMutation } from "redux/api/auth/customer-api";
function ModalAddDeliveryInfo({ onClose }: { onClose: () => void }) {
  const [addDelivery, { isSuccess }] = useAddDeliveryInfoMutation();

  const [delivery, setDelivery] = useState<IDeliveryInput>({
    address: { city: "", number: "", district: "", street: "", ward: "" },
    name: "",
    phoneNumber: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (
      name === "city" ||
      name === "number" ||
      name === "district" ||
      name === "street" ||
      name === "ward"
    ) {
      const { address } = delivery;
      setDelivery(() => ({
        ...delivery,
        address: {
          ...address,
          [name]: value,
        },
      }));
    } else {
      setDelivery(() => ({
        ...delivery,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    if (isSuccess) {
      onClose();
    }
  }, [isSuccess, onClose]);

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
      <Button onClick={onClose} color="red">
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

      setDelivery(() => ({
        address: { city: "", number: "", district: "", street: "", ward: "" },
        name: "",
        phoneNumber: "",
      }));
    }
  };

  return (
    <Modal onClose={onClose} actions={actions}>
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
    </Modal>
  );
}

export default ModalAddDeliveryInfo;
