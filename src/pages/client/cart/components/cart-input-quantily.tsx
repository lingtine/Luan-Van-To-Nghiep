import React, { useEffect, useState } from "react";
import InputQuantity from "components/input/input-quantity";
import { IProductOrder } from "share/types/product";

import {
  useUpdateProductQualityMutation,
  useDeleteItemsMutation,
} from "redux/api/cart/cart";
import useDebounce from "hooks/use-debounce";
interface CartInputQuantityProps {
  data: IProductOrder;
}

const CartInputQuantity: React.FC<CartInputQuantityProps> = ({ data }) => {
  const [updateQuality] = useUpdateProductQualityMutation();
  const [value, setValue] = useState<number>(data.quantity);
  const [deleteProduct] = useDeleteItemsMutation();
  const debounceValue = useDebounce(value, 3000);
  const handleChange = (quantity: number) => {
    setValue(quantity);
  };

  useEffect(() => {
    if (debounceValue !== data.quantity) {
      if (debounceValue !== 0) {
        updateQuality([
          {
            productId: data.productId,
            productName: data?.name || "",
            quantity: +debounceValue,
            unitPrice: data.unitPrice,
          },
        ]);
      } else {
        deleteProduct(data.productId);
      }
    }
  }, [
    debounceValue,
    data.productName,
    data.productId,
    data.unitPrice,
    data.quantity,
    updateQuality,
    deleteProduct,
  ]);

  return (
    <InputQuantity maxQuantity={99} onChange={handleChange} quantity={value} />
  );
};

export default CartInputQuantity;
