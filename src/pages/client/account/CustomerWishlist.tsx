import { useGetWishlistQuery } from "redux/api/auth/customer-api";
import { formatVND } from "utils/formatVND";
import { useNavigate } from "react-router-dom";

const CustomerWishlist = () => {
  const { data, isSuccess } = useGetWishlistQuery({
    refetchOnFocus: true,
  });
  const navigate = useNavigate();
  const handleClick = (productId: string) => {
    navigate(`/product-detail/${productId}`);
  };
  return (
    <div className="max-h-[500px] overflow-y-scroll">
      <table className="table-fixed w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="w-1/6 px-6 py-3">
              Hình ảnh
            </th>
            <th scope="col" className="w-1/3 px-6 py-3">
              Tên sản phẩm
            </th>
            <th scope="col" className="w-1/6 px-6 py-3">
              Giá
            </th>
            <th scope="col" className="w-1/6 px-6 py-3">
              Còn hàng
            </th>
          </tr>
        </thead>
        <tbody className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
          {isSuccess &&
            data.map((item) => (
              <tr
                key={item.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 cursor-pointer"
                onClick={() => handleClick(item.id)}
              >
                <td className="px-6 py-4">
                  <img src={item.imageUrl} alt="" className="w-10 h-10" />
                </td>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.name}
                </th>
                <td className="px-6 py-4">{formatVND(item.unitPrice)}</td>
                <td className="px-6 py-4">
                  {item.isInStock ? (
                    <p className="text-green-400">Còn hàng</p>
                  ) : (
                    <p className="text-red-400">Hết hàng</p>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerWishlist;
