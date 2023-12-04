import React, { useState } from "react";
import { formatVND } from "utils/formatVND";
import { IoIosInformationCircleOutline } from "react-icons/io";

export default function TableOrder({ data }: any) {
  const [toggle, setToggle] = useState(false);
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full w-full table-fixed text-left text-sm font-light border border-white-500">
              <thead className=" bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
                <tr className="text-center">
                  <th scope="col" className="px-6 w-[3%] py-4">
                    STT
                  </th>
                  <th scope="col" className="px-6 w-[20%] py-4">
                    Mã đơn
                  </th>

                  <th scope="col" className="px-6 py-4">
                    Số Lượng
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Tổng đơn
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Trạng thái
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Thông tin
                  </th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.map((order: any, index: number) => (
                    <>
                      <tr key={order.id} className="text-center">
                        <th scope="col" className="px-6 w-[3%] py-4">
                          {index + 1}
                        </th>
                        <th scope="col" className="px-6 w-[20%] py-4">
                          {order.cartId}
                        </th>

                        <th scope="col" className="px-6 py-4">
                          {order.totalItems}
                        </th>
                        <th scope="col" className="px-6 py-4">
                          {formatVND(order.amount)}
                        </th>
                        <th scope="col" className="px-6 py-4 text-primary">
                          {order.status}
                        </th>
                        <th scope="col" className="px-6 py-4">
                          <div onClick={() => setToggle(!toggle)}>
                            <IoIosInformationCircleOutline />
                          </div>
                        </th>
                      </tr>
                      {toggle && (
                        <>
                          {" "}
                          <tr>
                            <th scope="col" className="px-6 w-[3%] py-4"></th>
                            <th scope="col" className="px-6 w-[20%] py-4">
                              Người Nhận
                            </th>
                            <th scope="col" className="px-6 py-4">
                              Số điện thoại
                            </th>
                            <th scope="col" className="px-6 py-4">
                              Email
                            </th>
                            <th scope="col" className="px-6 py-4">
                              Địa chỉ
                            </th>
                          </tr>
                          <tr>
                            <th scope="col" className="px-6 w-[3%] py-4"></th>
                            <th scope="col" className="px-6 w-[20%] py-4">
                              {order.deliveryInfo.fullName}
                            </th>
                            <th scope="col" className="px-6 py-4">
                              {order.deliveryInfo.phoneNumber}
                            </th>
                            <th scope="col" className="px-6 py-4">
                              {order.deliveryInfo.email}
                            </th>
                            <th scope="col" className="px-6 py-4">
                              {order.deliveryInfo.address.streetNumber +
                                " " +
                                order.deliveryInfo.address.street +
                                " Quận: " +
                                order.deliveryInfo.address.district +
                                " Thành phố " +
                                order.deliveryInfo.address.city}
                            </th>
                          </tr>
                        </>
                      )}
                    </>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
