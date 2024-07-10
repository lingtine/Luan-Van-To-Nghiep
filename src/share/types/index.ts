import { ISelected } from "components/select-box/select-box";
import { ProductSort } from "redux/api/types";

export interface ISort extends ISelected {
  value: ProductSort;
}
