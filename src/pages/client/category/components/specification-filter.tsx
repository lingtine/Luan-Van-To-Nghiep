import { useGetFilterByGroupIdQuery } from "redux/api/catalog/filter";
import { useAppDispatch, useAppSelector } from "redux/store";
import { handleChangeFilter } from "redux/features/products/product-filter-slice";
import { useMemo } from "react";
import {
  Checkbox,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";
interface SpecificationFilterProps {
  groupId: string;
}

const SpecificationFilter: React.FC<SpecificationFilterProps> = ({
  groupId,
}) => {
  const dispatch = useAppDispatch();
  const { filterValues } = useAppSelector((state) => state.productFilterSlice);
  const { data, isSuccess } = useGetFilterByGroupIdQuery(groupId);

  const content = useMemo(() => {
    if (isSuccess) {
      const { filterModels } = data;

      return filterModels.map((filter) => {
        const handleChange = (value: string) => {
          dispatch(
            handleChangeFilter({
              specificationId: filter.specificationId,
              value,
            })
          );
        };

        const renderFilterValue = filter.values.map((value) => (
          <ListItem className="p-0" key={filter.specificationId + "/" + value}>
            <label
              htmlFor={filter.specificationId + "/" + value}
              className="flex w-full cursor-pointer items-center px-3 py-2"
            >
              <ListItemPrefix className="mr-3">
                <Checkbox
                  id={filter.specificationId + "/" + value}
                  ripple={false}
                  crossOrigin={""}
                  onChange={() => {
                    handleChange(value);
                  }}
                  checked={filterValues.some(
                    (specification) =>
                      specification.specificationId ===
                        filter.specificationId && specification.value === value
                  )}
                  className="hover:before:opacity-0"
                  containerProps={{
                    className: "p-0",
                  }}
                />
              </ListItemPrefix>
              <Typography color="blue-gray" className="font-medium">
                {value}
              </Typography>
            </label>
          </ListItem>
        ));

        return (
          <li key={filter.id} className="px-2 py-3 font-medium text-gray-900">
            <h2>{filter.filterName}</h2>
            <div className="px-2 py-3 font-medium text-gray-900">
              <List>{renderFilterValue}</List>
            </div>
          </li>
        );
      });
    }
    return [];
  }, [data, dispatch, isSuccess, filterValues]);

  return (
    <div>
      <h1 className="font-bold">Thông số kỹ thuật</h1>
      <ul className="divide-y-2">{content}</ul>
    </div>
  );
};

export default SpecificationFilter;
