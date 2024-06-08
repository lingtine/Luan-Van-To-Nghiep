import { ICategoryGroup } from "./category-group";

export interface ICategoryParams {
  GroupId?: string;
  Keyword?: string;
  PageIndex?: string;
  PageSize?: number;
}

export interface ICategoryInput {
  id?: string;
  categoryGroupId: string;
  name: string;
  description: string;
  categoryGroup?: ICategoryGroup; // Add category group
}
export interface ICategory {
  id: string;
  categoryGroupId: string;
  name: string;
  description: string;
  categoryGroup?: ICategoryGroup;
}

export interface ICategoryPage {
  data: ICategory[];
  pageIndex: number;
  pageSize: number;
  totalCount: number;
}

export interface ICategoryTable extends ICategory {
  index: number;
}
