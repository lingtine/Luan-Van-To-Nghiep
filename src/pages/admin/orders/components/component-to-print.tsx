import { forwardRef } from "react";
import { IOrderDetail } from "share/types/order";
import React from "react";
import { useFormatPrice } from "hooks/use-format-price";

interface MyDivProps extends React.HTMLProps<HTMLDivElement> {
  data: any;
}

const ComponentToPrint = forwardRef<HTMLDivElement, MyDivProps>(
  (props: { data?: IOrderDetail }, ref) => {
    const [formatPrice] = useFormatPrice();
    if (props.data) {
      const { deliveryInfo, cart } = props.data;
      return (
        <div ref={ref}>
          <div className="max-w-4xl mx-auto bg-white p-8 border border-gray-200 rounded-lg shadow-lg">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold">Sales Invoice</h1>
            </div>
            <div className="mb-8">
              <h2 className="text-xl font-semibold">TechWave</h2>
              <p>123 Business St, Suite 100</p>
              <p>City, State, ZIP</p>
              <p>Phone: (123) 456-7890</p>
              <p>Email: info@company.com</p>
            </div>
            <div className="mb-8">
              <h2 className="text-xl font-semibold">Thông tin khách hàng</h2>
              <table className="w-full table-auto">
                <tbody>
                  <tr>
                    <td className="border px-4 py-2 font-semibold">
                      Họ và tên:
                    </td>
                    <td className="border px-4 py-2">
                      {deliveryInfo.fullName}
                    </td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2 font-semibold">Địa chỉ:</td>
                    <td className="border px-4 py-2">
                      {deliveryInfo.address.streetNumber +
                        " " +
                        deliveryInfo.address.street +
                        " " +
                        deliveryInfo.address.ward +
                        " " +
                        deliveryInfo.address.district +
                        " " +
                        deliveryInfo.address.city}
                    </td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2 font-semibold">Email</td>
                    <td className="border px-4 py-2">{deliveryInfo.email}</td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2 font-semibold">
                      Số điện thoại
                    </td>
                    <td className="border px-4 py-2">
                      {deliveryInfo.phoneNumber}
                    </td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2 font-semibold">Ghi chú</td>
                    <td className="border px-4 py-2">{deliveryInfo.note}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <table className="w-full table-auto mb-8">
              <thead>
                <tr>
                  <th className="border px-4 py-2 bg-gray-200">Sản phẩm</th>
                  <th className="border px-4 py-2 bg-gray-200">Số lượng</th>
                  <th className="border px-4 py-2 bg-gray-200">Giá</th>
                  <th className="border px-4 py-2 bg-gray-200">Tổng Tiền</th>
                </tr>
              </thead>
              <tbody>
                {cart.items.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td className="border px-4 py-2">{item.productName}</td>
                      <td className="border px-4 py-2">{item.quantity}</td>
                      <td className="border px-4 py-2">
                        {formatPrice.format(item.unitPrice)}
                      </td>
                      <td className="border px-4 py-2">
                        {formatPrice.format(item.quantity * item.unitPrice)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr>
                  <td
                    colSpan={3}
                    className="border px-4 py-2 text-right font-semibold"
                  >
                    Thành Tiền
                  </td>
                  <td className="border px-4 py-2">
                    {formatPrice.format(
                      cart.items.reduce((accumulator, currentValue) => {
                        return (
                          accumulator +
                          currentValue.quantity * currentValue.unitPrice
                        );
                      }, 0)
                    )}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      );
    }
    return <></>;
  }
);

export default ComponentToPrint;
