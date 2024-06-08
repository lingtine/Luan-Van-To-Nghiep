export interface ISpecificationInput {
  name: string;
  description: string;
}

export interface ISpecification extends ISpecificationInput {
  id: string;
}
export interface ISpecificationPage {
  data: ISpecification[];
  pageIndex: number;
  pageSize: number;
  totalCount: number;
}
