import { useGetFilterByGroupIdQuery } from "redux/api/catalog/filter";
import { useAppSelector, useAppDispatch } from "redux/store";
import { handleChangeFilter } from "redux/features/products/product-filter-slice";
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

  let content;
  if (isSuccess) {
    const { filterModels } = data;

    content = filterModels.map((filter) => {
      const handleChange = (value: string) => {
        dispatch(
          handleChangeFilter({ specificationId: filter.specificationId, value })
        );
      };

      const renderFilterValue = filter.values.map((value) => (
        <ListItem
          onClick={() => {
            handleChange(value);
          }}
          className="p-0"
          key={filter.specificationId + "/" + value}
        >
          <label
            htmlFor={filter.specificationId + "/" + value}
            className="flex w-full cursor-pointer items-center px-3 py-2"
          >
            <ListItemPrefix className="mr-3">
              <Checkbox
                id={filter.specificationId + "/" + value}
                ripple={false}
                crossOrigin={""}
                className="hover:before:opacity-0"
                containerProps={{
                  className: "p-0",
                }}
                checked={filterValues.some(
                  (specification) =>
                    specification.specificationId === filter.specificationId &&
                    specification.value === value
                )}
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

  return (
    <div>
      <h1 className="font-bold">Thông số kỹ thuật</h1>
      <ul className="divide-y-2">{content}</ul>
    </div>
  );
};

export default SpecificationFilter;
