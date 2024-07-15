import { useGetAllBrandsQuery } from "redux/api/catalog/brand";
import { useAppSelector, useAppDispatch } from "redux/store";
import { handleChangeBrand } from "redux/features/products/product-filter-slice";
import { useMemo } from "react";
import {
  Checkbox,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";
interface BrandFilterProps {}

const BrandFilter: React.FC<BrandFilterProps> = () => {
  const { data, isSuccess } = useGetAllBrandsQuery();
  const dispatch = useAppDispatch();
  const { brandIds } = useAppSelector((state) => state.productFilterSlice);

  const content = useMemo(() => {
    if (isSuccess) {
      return data.map((brand) => (
        <ListItem className="p-0" key={brand.id}>
          <ListItemPrefix className="mr-3">
            <Checkbox
              id={brand.id}
              crossOrigin=""
              onChange={() => {
                dispatch(handleChangeBrand(brand.id));
              }}
              checked={brandIds.includes(brand.id)}
              ripple={false}
              value={brand.id}
              className="hover:before:opacity-0"
              containerProps={{
                className: "p-0",
              }}
            />
          </ListItemPrefix>
          <label
            htmlFor={brand.id}
            className="flex w-full cursor-pointer items-center px-3 py-2"
          >
            <Typography color="blue-gray" className="font-medium">
              {brand.name}
            </Typography>
          </label>
        </ListItem>
      ));
    }
    return [];
  }, [isSuccess, data, brandIds]);

  return (
    <div>
      <h1 className="font-bold">Thương hiệu</h1>
      <List className="px-2 py-3 font-medium text-gray-900 space-y-4">
        {content}
      </List>
    </div>
  );
};

export default BrandFilter;
