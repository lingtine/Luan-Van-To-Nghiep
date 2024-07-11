import { useGetCouponsQuery } from "redux/api/discount/coupon";
import SelectBox, { ISelected } from "components/select-box/select-box";

interface CouponSelectBoxProps {
  coupon?: ISelected;
  setCoupon: Function;
}

const CouponSelectBox: React.FC<CouponSelectBoxProps> = ({
  coupon,
  setCoupon,
}) => {
  const { data, isSuccess } = useGetCouponsQuery({});

  let content;
  if (isSuccess) {
    const options = data.data.map((item) => ({
      ...item,
      label: item.name,
    }));

    content = (
      <SelectBox
        label=""
        selected={coupon}
        onChange={setCoupon}
        options={options}
      />
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <label className="text-lg font-semibold">Mã giảm giá</label>
      {content}
    </div>
  );
};

export default CouponSelectBox;
