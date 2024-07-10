import { Card } from "@material-tailwind/react";
import { ISort } from "share/types";
import { sortOption } from "share/constant/sort";
import { useAppSelector, useAppDispatch } from "redux/store";

import SelectBox from "components/select-box/select-box";

import { handleSort } from "redux/features/products/product-filter-slice";

interface ProductSortProps {}

const ProductSort: React.FC<ProductSortProps> = () => {
  const dispatch = useAppDispatch();
  const { sort } = useAppSelector((state) => state.productFilterSlice);
  const handleChangeSort = (option: ISort) => {
    dispatch(handleSort(option));
  };
  return (
    <Card className="flex justify-end w-full mb-8 p-4 bg-blue-gray-50 shadow-none">
      <div className="bg-white w-fit">
        <SelectBox
          label="Sắp xếp"
          onChange={handleChangeSort}
          selected={sort}
          options={sortOption}
        />
      </div>
    </Card>
  );
};

export default ProductSort;
