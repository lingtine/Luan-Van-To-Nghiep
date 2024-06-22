export interface IFilter {
  id: string;
  filterName: string;
  specificationId: string;
  specificationName: string;
  categoryGroupId: string;
  categoryGroupName: string;
  values: string[];
}

export interface IFilterOfGroup {
  categoryGroupId: string;
  filterModels: IFilter[];
}

export interface IAddFilter {
  filterName: string;
  specificationId: string;
  categoryGroupId: string;
  values: string[];
}

export interface IParamsFilter {
  Keyword?: string;
  PageIndex?: number | string;
  PageSize?: number;
}
export interface IFilterPage {
  data: IFilter[];
  pageIndex: number;
  pageSize: number;
  totalCount: number;
}

export interface IFilterTable extends IFilter {
  index: number;
}
