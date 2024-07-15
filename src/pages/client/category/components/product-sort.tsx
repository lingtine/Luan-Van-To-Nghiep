import { Card, IconButton } from "@material-tailwind/react";
import { ISort } from "share/types";
import { RiFilterOffLine } from "react-icons/ri";

import { sortOption } from "share/constant/sort";
import { useAppSelector, useAppDispatch } from "redux/store";

import SelectBox from "components/select-box/select-box";

import {
  handleSort,
  handleClearSort,
} from "redux/features/products/product-filter-slice";

interface ProductSortProps {
  onSort: (pageIndex?: number, sortOption?: ISort) => void;
}

const ProductSort: React.FC<ProductSortProps> = ({ onSort }) => {
  const dispatch = useAppDispatch();
  const { sort } = useAppSelector((state) => state.productFilterSlice);
  const handleChangeSort = (option: ISort) => {
    dispatch(handleSort(option));
    onSort(undefined, option);
  };

  const handleClear = () => {
    dispatch(handleClearSort());
    onSort();
  };

  return (
    <Card className="flex justify-end w-full mb-8 p-4 bg-blue-gray-50 shadow-none">
      <div className="flex gap-4 items-center">
        <div className="bg-white w-fit">
          <SelectBox
            label=""
            onChange={handleChangeSort}
            placeholder="Sắp xếp theo"
            selected={sort}
            options={sortOption}
          />
        </div>
        {sort && (
          <IconButton onClick={handleClear} variant="text">
            <RiFilterOffLine />
          </IconButton>
        )}
      </div>
    </Card>
  );
};

export default ProductSort;
