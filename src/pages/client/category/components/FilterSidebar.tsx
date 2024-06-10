import { Fragment } from "react";
import { IFilter } from "redux/api/types";

export interface IFilterProps {
  filters: IFilter[];
}

const FilterSidebar = ({ filters }: IFilterProps) => {
  return (
    <div>
      {filters.map((item) => (
        <div className="ml-4" key={item.id}>
          <h1>{item.filterName}</h1>
          <ul className="ml-4  border-4 grid grid-cols-2 gap-2">
            {item.values.map((value) => (
              <li className="w-full overflow-hidden" key={value}>{value}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default FilterSidebar;
