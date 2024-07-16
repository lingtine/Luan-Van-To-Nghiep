import React, { useEffect, useState } from "react";
import InputQuantity from "components/input/input-quantity";
import { IProductOrder } from "share/types/product";

import { useUpdateProductQualityMutation } from "redux/api/cart/cart";
import useDebounce from "hooks/use-debounce";
interface CartInputQuantityProps {
  data: IProductOrder;
}

const CartInputQuantity: React.FC<CartInputQuantityProps> = ({ data }) => {
  const [updateQuality] = useUpdateProductQualityMutation();
  const [value, setValue] = useState<number>(data.quantity);
  const debounceValue = useDebounce(value, 3000);
  const handleChange = (quantity: number) => {
    setValue(quantity);
  };

  useEffect(() => {
    if (debounceValue !== data.quantity) {
      updateQuality([
        {
          productId: data.productId,
          productName: data?.name || "",
          quantity: +debounceValue,
          unitPrice: data.unitPrice,
        },
      ]);
    }
  }, [
    debounceValue,
    data?.name,
    data.productId,
    data.quantity,
    data.unitPrice,
    updateQuality,
  ]);

  return (
    <InputQuantity
      minQuantity={1}
      maxQuantity={99}
      onChange={handleChange}
      quantity={value}
    />
  );
};

export default CartInputQuantity;
