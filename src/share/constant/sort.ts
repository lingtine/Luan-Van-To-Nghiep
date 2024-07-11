import { ISort } from "share/types";

const sortOption: ISort[] = [
  {
    id: "1",
    label: "Giá từ thấp tới cao",
    value: "PriceAscending",
  },
  {
    id: "2",
    label: "Giá từ cao tới thấp",
    value: "PriceDescending",
  },
  {
    id: "3",
    label: "A đến Z",
    value: "NameAscending",
  },
  {
    id: "4",
    label: "Z đến A",
    value: "NameDescending",
  },
  {
    id: "5",
    label: "Sản phẩm yêu thích",
    value: "Favorite",
  },
  {
    id: "6",
    label: "Xem nhiều nhất",
    value: "MostView",
  },
];

export { sortOption };
