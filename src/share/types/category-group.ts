import { ICategory } from "./category";

export interface ICategoryGroupInput {
  id?: string;
  name: string;
  description: string;
}

export interface ICategoryGroup {
  id: string;
  description: string;
  categories: ICategory[];
  name: string;
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

export interface ICategoryGroupTable extends ICategoryGroup {
  index: number;
}
