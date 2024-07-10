import { useGetFilterByGroupIdQuery } from "redux/api/catalog/filter";
import { useAppSelector, useAppDispatch } from "redux/store";
import { handleChangeFilter } from "redux/features/products/product-filter-slice";

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
      const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        dispatch(
          handleChangeFilter({ specificationId: filter.specificationId, value })
        );
      };

      const renderFilterValue = filter.values.map((value) => (
        <li
          key={filter.specificationId + "/" + value}
          className="flex items-center"
        >
          <input
            id={filter.specificationId + "/" + value}
            type="checkbox"
            value={value}
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            onChange={handleChange}
            checked={filterValues.some(
              (specification) =>
                specification.specificationId === filter.specificationId &&
                specification.value === value
            )}
          />
          <label
            htmlFor={filter.specificationId + "/" + value}
            className="ml-3 min-w-0 flex-1 text-gray-500 overflow-hidden"
          >
            {value}
          </label>
        </li>
      ));

      return (
        <li key={filter.id} className="px-2 py-3 font-medium text-gray-900">
          <h2>{filter.filterName}</h2>
          <div className="px-2 py-3 font-medium text-gray-900">
            <ul className="space-y-4">{renderFilterValue}</ul>
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
