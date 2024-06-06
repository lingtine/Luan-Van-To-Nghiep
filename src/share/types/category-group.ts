import { ICategory } from "./category";

export interface ICategoryGroupInput {
  name: string;
  description: string;
}

export interface ICategoryGroup extends ICategoryGroupInput {
  id: string;
  description: string;
  categories: ICategory[];
}

export interface ICategoryGroupPage {
  data: ICategoryGroup[];
  pageIndex: number;
  pageSize: number;
  totalCount: number;
}
export interface ICategoryGroupParams {
  Keyword?: string;
  PageIndex?: string;
  PageSize?: number;
}
