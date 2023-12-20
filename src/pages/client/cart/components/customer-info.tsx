import React, { useState } from "react";
import { ICustomerDetail } from "redux/api/types";
import { Link } from "react-router-dom";
import { Input, Radio } from "@material-tailwind/react";

interface CustomerInfoProps {
  user: ICustomerDetail;
}

const CustomerInfo: React.FC<CustomerInfoProps> = ({ user }) => {
  const [dataForm, setDataForm] = useState({
    ...user,
  });

  return (
    <form className="px-8 flex flex-col border-r-2 h-full basis-1/2">
      <div>
        <div>
          <h2 className="text-[32px] mt-5 mb-[15px] font-semibold">
            Thông tin đặt hàng
          </h2>
        </div>
        <div className="flex">
          <div className="flex-[0_0_50%] max-w-[50%]">
            <Input crossOrigin={""} label="Họ và tên" value={dataForm.name} />
          </div>
          <div className="flex-[0_0_50%] max-w-[50%]">
            <Input crossOrigin={""} label="Email" value={dataForm.email} />
          </div>
        </div>
      </div>
      <div>
        <div>
          <h2 className="text-[32px] mt-5 mb-[15px] font-semibold">
            Địa chỉ giao hàng
          </h2>
        </div>
        <div className="flex">
          {dataForm.deliveryInfos.map((item) => {
            return (
              <div className="flex items-center gap-4 p-8 border border-primary-1">
                <Radio crossOrigin={""} name="address" />

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
        </div>
      </div>
      <div className="flex gap-3 justify-between items-center">
        <Link to="/">
          <span className="text-sm text-primary-200 hover:underline cursor-pointer">
            Tiếp tục mua hàng
          </span>
        </Link>
        <button
          type="submit"
          className="h-14 px-6 py-2 font-semibold rounded-xl bg-primary-1 text-white hover:text-black hover:bg-white border hover:border-primary-1"
        >
          Thanh Toán
        </button>
      </div>
    </form>
  );
};

export default CustomerInfo;
