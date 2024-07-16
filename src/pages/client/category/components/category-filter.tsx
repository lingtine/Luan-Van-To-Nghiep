import { useGetCategoriesQuery } from "redux/api/catalog/category";
import { useAppDispatch, useAppSelector } from "redux/store";
import { handleChangeCategory } from "redux/features/products/product-filter-slice";
import { useMemo, useCallback } from "react";
import {
  Checkbox,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";

import FilterSkeleton from "components/skeleton/filter-skeleton";
interface CategoryFilterProps {
  groupId: string;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ groupId }) => {
  const dispatch = useAppDispatch();
  const { categoryIds } = useAppSelector((state) => state.productFilterSlice);
  const { data, isSuccess, isLoading } = useGetCategoriesQuery({
    GroupId: groupId,
    PageSize: 1000,
  });

  const handleChange = useCallback(
    (categoryId: string) => {
      dispatch(handleChangeCategory(categoryId));
    },
    [dispatch]
  );

  const content = useMemo(() => {
    if (isSuccess) {
      const { data: listCategory } = data;

      return listCategory.map((category) => (
        <ListItem className="p-0" key={category.id}>
          <label
            htmlFor={category.id}
            className="flex w-full cursor-pointer items-center px-3 py-2"
          >
            <ListItemPrefix className="mr-3">
              <Checkbox
                crossOrigin={""}
                id={category.id}
                onChange={() => {
                  handleChange(category.id);
                }}
                checked={categoryIds.includes(category.id)}
                ripple={false}
                className="hover:before:opacity-0"
                containerProps={{
                  className: "p-0",
                }}
              />
            </ListItemPrefix>
            <Typography color="blue-gray" className="font-medium">
              {category.name}
            </Typography>
          </label>
        </ListItem>
      ));
    } else if (isLoading) {
      return <FilterSkeleton />;
    }
    return [];
  }, [data, isSuccess, categoryIds, isLoading, handleChange]);

  return (
    <div>
      <h1 className="font-bold">Loại sản phẩm</h1>
      <List className="px-2 py-3 font-medium text-gray-900 space-y-4">
        {content}
      </List>
    </div>
  );
};

export default CategoryFilter;
