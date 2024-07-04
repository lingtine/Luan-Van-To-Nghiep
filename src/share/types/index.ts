import { ISelected } from "components/select-box/select-box";
export interface ISort extends ISelected {
  IsOrderDesc: boolean;
  OrderBy: string;
}
