import { useFormatPrice } from "hooks/use-format-price";
import { IProductOrder } from "share/types/product";

interface TableSummaryProps {
  coupon?: any;
  products: IProductOrder[];
}

const TableSummary: React.FC<TableSummaryProps> = ({ coupon, products }) => {
  const [formPrice] = useFormatPrice();
  const total = products.reduce((total, currValue) => {
    return total + currValue.unitPrice * currValue.quantity;
  }, 0);
  return (
    <div className="border p-4 rounded-md border-primary-1 w-full">
      <h5 className="text-lg font-semibold my-4">Tổng quan đơn hàng</h5>

      <ul className="flex flex-col gap-4 w-full">
        <li className="flex justify-between">
          <p>Tổng phụ</p>
          <p>{formPrice.format(total)}</p>
        </li>
        {coupon && (
          <li className="flex justify-between">
            <p>Phiếu giảm giá</p>
            <p>{formPrice.format(coupon.reducedPrice)}</p>
          </li>
        )}
      </ul>
      <div className="flex justify-between  my-4">
        <p className="text-lg font-semibold">Tổng</p>
        <p className="font-semibold">
          {coupon
            ? formPrice.format(total - coupon.reducedPrice)
            : formPrice.format(total)}
        </p>
      </div>
    </div>
  );
};

export default TableSummary;
