export interface ISupplierInput {
  id?: string;
  name: string;
  description: string;
  address: string;
  phoneNumber: string;
  email: string;
}

export interface ISupplier {
  id: string;
  name: string;
  description: string;
  address: string;
  phoneNumber: string;
  email: string;
}
export interface ISupplierPage {
  data: ISupplier[];
  pageIndex: number;
  pageSize: number;
  totalCount: number;
}

export interface ISupplierTable extends ISupplier {
  index: number;
}
