import { useGetCategoriesQuery } from "redux/api/catalog/category";
import { useAppSelector, useAppDispatch } from "redux/store";
import { handleChangeCategory } from "redux/features/products/product-filter-slice";
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    dispatch(handleChangeCategory(value));
  };

  let content;

  if (isSuccess) {
    const { data: listCategory } = data;

    content = listCategory.map((category) => (
      <li className="flex items-center" key={category.id}>
        <input
          type="checkbox"
          value={category.id}
          id={category.id}
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          onChange={handleChange}
          checked={categoryIds.some((categoryId) => categoryId === category.id)}
        />
        <label
          htmlFor={category.id}
          className="ml-3 min-w-0 flex-1 text-gray-500 overflow-hidden"
        >
          {category.name}
        </label>
      </li>
    ));
  }

  return (
    <div>
      <h1 className="font-bold">Loại sản phẩm</h1>
      <ul className="px-2 py-3 font-medium text-gray-900 space-y-4">
        {content}
      </ul>
    </div>
  );
};

export default CategoryFilter;
