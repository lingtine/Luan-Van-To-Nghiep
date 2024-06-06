import { ICategoryGroup } from "./category-group";

export interface ICategoryParams {
  GroupId?: string;
  Keyword?: string;
  PageIndex?: string;
  PageSize?: number;
}

export interface ICategoryInput {
  categoryGroupId: string;
  name: string;
  description: string;
  categoryGroup?: ICategoryGroup; // Add category group
}
export interface ICategory extends ICategoryInput {
  id: string;
}

export interface ICategoryPage {
  data: ICategory[];
  pageIndex: number;
  pageSize: number;
  totalCount: number;
}
