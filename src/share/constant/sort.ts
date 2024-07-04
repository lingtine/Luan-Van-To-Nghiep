import { ISort } from "share/types";

const sortOption: ISort[] = [
  {
    id: "1",
    label: "Giá từ thấp tới cao",
    IsOrderDesc: false,
    OrderBy: "Price",
  },
  {
    id: "2",
    label: "Giá từ cao tới thấp",
    IsOrderDesc: true,
    OrderBy: "Price",
  },
  {
    id: "3",
    label: "A đến Z",
    IsOrderDesc: false,
    OrderBy: "Name",
  },
  {
    id: "4",
    label: "Z đến A",
    IsOrderDesc: true,
    OrderBy: "name",
  },
];

export { sortOption };
