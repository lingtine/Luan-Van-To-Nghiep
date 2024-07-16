import { Card } from "@material-tailwind/react";
import { IProductOrder } from "share/types/product";
import { useFormatPrice } from "hooks/use-format-price";

interface TableProductsProps {
  products: IProductOrder[];
}

const TableProducts: React.FC<TableProductsProps> = ({ products }) => {
  const [formPrice] = useFormatPrice();

  return (
    <Card>
      <table className="table">
        <thead className="text-xs text-gray-700 uppercase border-b">
          <tr>
            <th scope="col" className="px-6 py-3 whitespace-nowrap ">
              Sản phẩm
            </th>
            <th scope="col" className="px-6 py-3 whitespace-nowrap">
              Tên sản phẩm
            </th>
            <th scope="col" className="px-6 py-3 whitespace-nowrap">
              Số lượng
            </th>
            <th scope="col" className="px-6 py-3">
              Giá
            </th>
          </tr>
        </thead>
        <tbody className="text-xs text-gray-700">
          {products.map((item) => (
            <tr key={item.id}>
              <th className="px-6 py-3">
                <img
                  src={
                    item.imageUrl ??
                    "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:80/plain/https://cellphones.com.vn/media/catalog/product/t/e/text_ng_n_13__3_29.png"
                  }
                  alt={"Hình ảnh sản phẩm"}
                  className="h-[64px] w-[64px] object-cover"
                />
              </th>
              <th className="px-6 py-3">{item.name}</th>
              <th className="px-6 py-3">{item.quantity}</th>
              <th className="px-6 py-3">
                {formPrice.format(item.unitPrice * item.quantity)}
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};

export default TableProducts;
