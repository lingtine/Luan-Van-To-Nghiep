export interface IBrandInput {
  id?: string;
  name: string;
  description: string;
  image: File;
}

export interface IBrand {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

export interface IBrandPage {
  data: IBrand[];
  pageIndex: number;
  pageSize: number;
  totalCount: number;
}
export interface IBrandParams {
  Keyword?: string;
  PageIndex?: string;
  PageSize?: number;
}
