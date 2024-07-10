import { useGetAllBrandsQuery } from "redux/api/catalog/brand";
import { useAppSelector, useAppDispatch } from "redux/store";
import { handleChangeBrand } from "redux/features/products/product-filter-slice";

interface BrandFilterProps {}

const BrandFilter: React.FC<BrandFilterProps> = () => {
  const { data, isSuccess } = useGetAllBrandsQuery();
  const dispatch = useAppDispatch();
  const { brandIds } = useAppSelector((state) => state.productFilterSlice);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    dispatch(handleChangeBrand(value));
  };

  let content;
  if (isSuccess) {
    content = data.map((brand) => (
      <li className="flex items-center" key={brand.id}>
        <input
          id={brand.id}
          type="checkbox"
          value={brand.id}
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          onChange={handleChange}
          checked={brandIds.some((brandId) => brandId === brand.id)}
        />
        <label
          htmlFor={brand.id}
          className="ml-3 min-w-0 flex-1 text-gray-500 overflow-hidden"
        >
          {brand.name}
        </label>
      </li>
    ));
  }
  return (
    <div>
      <h1 className="font-bold">Thương hiệu</h1>
      <ul className="px-2 py-3 font-medium text-gray-900 space-y-4">
        {content}
      </ul>
    </div>
  );
};

export default BrandFilter;
