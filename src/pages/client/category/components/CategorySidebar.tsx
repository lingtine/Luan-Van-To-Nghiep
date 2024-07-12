import { Card, Button } from "@material-tailwind/react";

import { useAppSelector, useAppDispatch } from "redux/store";
import { handleClearFilter } from "redux/features/products/product-filter-slice";

import SpecificationFilter from "./specification-filter";
import CategoryFilter from "./category-filter";

import BrandFilter from "./brand-filter";
import { useEffect } from "react";
interface ICategorySidebarProps {
  groupId: string;
  onFilter: () => void;
}

const CategorySidebar = ({ groupId, onFilter }: ICategorySidebarProps) => {
  const { isFilter } = useAppSelector((state) => state.productFilterSlice);
  const dispatch = useAppDispatch();
  const handleClear = () => {
    dispatch(handleClearFilter());
  };
  return (
    <>
      <Card className="flex-col gap-4 w-full p-4 shadow-lg">
        <CategoryFilter groupId={groupId} />
        <BrandFilter />
        <SpecificationFilter groupId={groupId} />
        <Button onClick={onFilter} disabled={!isFilter} fullWidth>
          Tim kiếm
        </Button>
      </Card>
      <Button
        onClick={handleClear}
        className="mt-4"
        disabled={isFilter}
        fullWidth
      >
        Xoá bộ lọc
      </Button>
    </>
  );
};

export default CategorySidebar;
