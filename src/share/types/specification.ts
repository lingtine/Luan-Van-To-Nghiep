export interface ISpecificationInput {
  id?: string;
  name: string;
  description: string;
}

export interface ISpecification {
  id: string;
  name: string;
  description: string;
}
export interface ISpecificationPage {
  data: ISpecification[];
  pageIndex: number;
  pageSize: number;
  totalCount: number;
}

export interface ISpecificationParams {
  Keyword?: string;
  PageIndex?: string;
  PageSize?: number;
}

export interface ISpecificationTable extends ISpecification {
  index: number;
}
