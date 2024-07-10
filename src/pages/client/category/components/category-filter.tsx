import { useGetCategoriesQuery } from "redux/api/catalog/category";
import { useAppSelector, useAppDispatch } from "redux/store";
import { handleChangeCategory } from "redux/features/products/product-filter-slice";
import {
  Checkbox,
  Card,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";

interface CategoryFilterProps {
  groupId: string;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ groupId }) => {
  const { categoryIds } = useAppSelector((state) => state.productFilterSlice);
  const dispatch = useAppDispatch();
  const { data, isSuccess } = useGetCategoriesQuery({
    GroupId: groupId,
    PageSize: 1000,
  });

  const handleChange = (categoryId: string) => {
    dispatch(handleChangeCategory(categoryId));
  };

  let content;

  if (isSuccess) {
    const { data: listCategory } = data;

    content = listCategory.map((category) => (
      <ListItem className="p-0" key={category.id}>
        <label
          htmlFor={category.id}
          onClick={() => {
            handleChange(category.id);
          }}
          className="flex w-full cursor-pointer items-center px-3 py-2"
        >
          <ListItemPrefix className="mr-3">
            <Checkbox
              crossOrigin={""}
              id={category.id}
              ripple={false}
              className="hover:before:opacity-0"
              containerProps={{
                className: "p-0",
              }}
              checked={categoryIds.some(
                (categoryId) => categoryId === category.id
              )}
            />
          </ListItemPrefix>
          <Typography color="blue-gray" className="font-medium">
            {category.name}
          </Typography>
        </label>
      </ListItem>
    ));
  }

  return (
    <Card>
      <h1 className="font-bold">Loại sản phẩm</h1>
      <List className="px-2 py-3 font-medium text-gray-900 space-y-4">
        {content}
      </List>
    </Card>
  );
};

export default CategoryFilter;
