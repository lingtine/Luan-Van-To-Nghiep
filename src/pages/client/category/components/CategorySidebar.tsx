import { Button } from "@material-tailwind/react";
import { useState } from "react";
import { useGetAllBrandsQuery } from "redux/api/catalog/brand";
import { useGetCategoriesQuery } from "redux/api/catalog/category";
import { useGetFilterByGroupIdQuery } from "redux/api/catalog/filter";
import { IBrand, ICategory, IFilter, IFilterProduct } from "redux/api/types";

interface ICategorySidebarProps {
  groupId: string;
  onFilter: Function;
}

const CategorySidebar = ({ groupId, onFilter }: ICategorySidebarProps) => {
  const [filters, setFilters] = useState<IFilterProduct[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [brands, setBrands] = useState<IBrand[]>([]);
  const [parameters, setParameters] = useState<{
    brands: IBrand[];
    categories: ICategory[];
    filters: IFilter[];
  }>({
    brands: [],
    categories: [],
    filters: [],
  });
  const [isEnable, setIsEnable] = useState(true);

  const { data: categoryData } = useGetCategoriesQuery({
    GroupId: groupId,
    PageSize: 1000,
  });

  const { data: filterData } = useGetFilterByGroupIdQuery(groupId);

  const { data: brandData } = useGetAllBrandsQuery([]);

  const handleChangeCategory = (
    event: React.ChangeEvent<HTMLInputElement>,
    category: ICategory
  ) => {
    if (event.target.checked) {
      setCategories((prev) => [...prev, category]);
    } else {
      setCategories((prev) => prev.filter((x) => x.id !== category.id));
    }
  };

  const handleChangeBrand = (
    event: React.ChangeEvent<HTMLInputElement>,
    brand: IBrand
  ) => {
    if (event.target.checked) {
      setBrands((prev) => [...prev, brand]);
    } else {
      setBrands((prev) => prev.filter((x) => x.id !== brand.id));
    }
  };

  const handleChangeFilter = (
    event: React.ChangeEvent<HTMLInputElement>,
    filter: IFilterProduct
  ) => {
    if (event.target.checked) {
      setFilters((prev) => [...prev, filter]);
    } else {
      setCategories((prev) =>
        prev.filter((x) => x.id !== filter.specificationId)
      );
    }
  };

  const handleFilter = () => {
    console.log("🚀 ~ handleFilter ~ brands:", brands);
    console.log("🚀 ~ handleFilter ~ categories:", categories);
    console.log("🚀 ~ handleFilter ~ filters:", filters);

    onFilter({
      brands: brands,
      categories: categories,
      filters: filters,
    });
  };

  return (
    <div className="flex-col gap-4 w-full">
      <div>
        <h1 className="font-bold">Loại sản phẩm</h1>
        <ul className="px-2 py-3 font-medium text-gray-900 space-y-4">
          {categoryData?.data.map((category) => (
            <div className="flex items-center" key={category.id}>
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                onChange={(event) => handleChangeCategory(event, category)}
              />
              <label className="ml-3 min-w-0 flex-1 text-gray-500 overflow-hidden">
                {category.name}
              </label>
            </div>
          ))}
        </ul>
      </div>

      <div>
        <h1 className="font-bold">Thương hiệu</h1>
        <ul className="px-2 py-3 font-medium text-gray-900 space-y-4">
          {brandData?.map((brand) => (
            <div className="flex items-center" key={brand.id}>
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                onChange={(event) => handleChangeBrand(event, brand)}
              />
              <label className="ml-3 min-w-0 flex-1 text-gray-500 overflow-hidden">
                {brand.name}
              </label>
            </div>
          ))}
        </ul>
      </div>

      <div>
        <h1 className="font-bold">Thông số kỹ thuật</h1>
        <div className=" divide-y-2">
          {filterData?.data.filterModels.map((filter) => (
            <div className="px-2 py-3 font-medium text-gray-900">
              <h2>{filter.filterName}</h2>
              <div className="px-2 py-3 font-medium text-gray-900">
                <div className="space-y-4">
                  {filter.values.map((value) => (
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        onChange={(event) =>
                          handleChangeFilter(event, {
                            specificationId: filter.specificationId,
                            value: value,
                          })
                        }
                      />
                      <label className="ml-3 min-w-0 flex-1 text-gray-500 overflow-hidden">
                        {value}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isEnable && (
        <Button onClick={handleFilter} fullWidth>
          Tim kiếm
        </Button>
      )}
    </div>
  );
};

export default CategorySidebar;
