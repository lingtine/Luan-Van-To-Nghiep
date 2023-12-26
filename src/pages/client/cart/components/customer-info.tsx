import React, { useState, useEffect } from "react";
import { ICustomerDetail, IDeliveryInfo, ICoupon } from "redux/api/types";
import { Link } from "react-router-dom";
import { Button, Input, Radio, Textarea } from "@material-tailwind/react";
import { useCreateOrderMutation } from "redux/api/order/order";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
interface CustomerInfoProps {
  user: ICustomerDetail;
  coupon: ICoupon | undefined;
  fn: Function;
}

const CustomerInfo: React.FC<CustomerInfoProps> = ({ user, fn, coupon }) => {
  const navigate = useNavigate();
  const [dataForm, setDataForm] = useState({
    ...user,
  });
  const [note, setNote] = useState("");
  const [address, setAddress] = useState<IDeliveryInfo | null>();
  const [delivery, setDelivery] = useState({
    id: "",
    city: "",
    number: "",
    district: "",
    street: "",
    ward: "",
    name: "",
    phoneNumber: "",
  });
  const [createOrder, result] = useCreateOrderMutation();

  useEffect(() => {
    if (result.isSuccess) {
      toast.success("Tạo đơn hàng thành công");
      fn();
      navigate("/");
    }
  }, [result]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setDelivery(() => ({
      ...delivery,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (address) {
      const { address: deliveryInfo, name, phoneNumber } = address;

      createOrder({
        couponId: coupon?.id,
        deliveryInfo: {
          fullName: name,
          phoneNumber: phoneNumber,
          email: user.email,
          address: {
            city: deliveryInfo.city,
            district: deliveryInfo.district,
            ward: deliveryInfo.ward,
            street: deliveryInfo.street,
            streetNumber: deliveryInfo.number,
          },
          note: note,
        },
      });
      setNote("");
    } else {
      if (
        delivery.city.trim().length === 0 ||
        delivery.district.trim().length === 0 ||
        delivery.name.trim().length === 0 ||
        delivery.number.trim().length === 0 ||
        delivery.phoneNumber.trim().length === 0 ||
        delivery.street.trim().length === 0 ||
        delivery.ward.trim().length === 0
      ) {
        toast.error("Vui lòng nhập đầy đủ thông tin");
      } else {
        const { id, city, district, name, number, phoneNumber, street, ward } =
          delivery;

        createOrder({
          couponId: coupon?.id,
          deliveryInfo: {
            fullName: name,
            phoneNumber: phoneNumber,
            email: user.email,
            address: {
              city: city,
              district: district,
              ward: ward,
              street: street,
              streetNumber: number,
            },
            note: "",
          },
        });
        setDelivery({
          id: "",
          city: "",
          number: "",
          district: "",
          street: "",
          ward: "",
          name: "",
          phoneNumber: "",
        });

        setNote("");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="px-6 flex flex-col ">
      <div>
        <div>
          <h2 className="text-lg lg:text-2xl mt-5 mb-[15px] font-semibold">
            Địa chỉ giao hàng
          </h2>
        </div>
        <div className="flex flex-col w-full gap-4">
          {dataForm.deliveryInfos.map((item) => {
            return (
              <div
                onClick={() => {
                  setAddress(item);
                }}
                className="flex items-center gap-4 p-2 rounded-md border border-primary-1 w-full"
              >
                <Radio
                  checked={item.id === address?.id}
                  crossOrigin={""}
                  name="address"
                />

                <p className="text-lg">{item.name}</p>
                <p className="text-gray-600">
                  {item.address.number +
                    " " +
                    item.address.street +
                    " " +
                    item.address.ward +
                    " " +
                    item.address.district +
                    " " +
                    item.address.city}
                </p>
              </div>
            );
          })}

          <div className="p-2 rounded-md border border-primary-1">
            <div
              onClick={() => {
                setAddress(null);
              }}
              className="flex items-center "
            >
              <Radio
                checked={address === null}
                crossOrigin={""}
                name="address"
              />
              <p>Thêm địa chỉ</p>
            </div>
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
                  value={delivery.number}
                />
              </div>
              <div className="flex-[0_0_50%] max-w-[50%] p-2">
                <Input
                  crossOrigin={""}
                  onChange={handleChange}
                  name="street"
                  label="Đường"
                  value={delivery.street}
                />
              </div>
              <div className="flex-[0_0_50%] max-w-[50%] p-2">
                <Input
                  crossOrigin={""}
                  onChange={handleChange}
                  name="ward"
                  label="Phường"
                  value={delivery.ward}
                />
              </div>
              <div className="flex-[0_0_50%] max-w-[50%] p-2">
                <Input
                  crossOrigin={""}
                  onChange={handleChange}
                  name="district"
                  label="Quận"
                  value={delivery.district}
                />
              </div>
              <div className="flex-[0_0_50%] max-w-[50%] p-2">
                <Input
                  crossOrigin={""}
                  onChange={handleChange}
                  name="city"
                  label="Thành phố"
                  value={delivery.city}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="my-4">
          <Textarea
            value={note}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              setNote(e.target.value);
            }}
            label="Note"
          ></Textarea>
        </div>
      </div>
      <div className="flex gap-3 justify-between items-center mt-8">
        <Link to="/">
          <Button variant="text">Tiếp tục mua hàng</Button>
        </Link>
        <Button type="submit">Thanh Toán</Button>
      </div>
    </form>
  );
};

export default CustomerInfo;
