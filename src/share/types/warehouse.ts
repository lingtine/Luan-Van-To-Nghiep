export interface IWarehouseInput {
  id?: string;
  name: string;
  description: string;
  email: string;
  address: string;
  fax: string;
  hotLine: string;
  warehouseType: "Distribution" | "Retail";
}
export interface IWarehouse {
  id: string;
  name: string;
  description: string;
  email: string;
  address: string;
  fax: string;
  hotLine: string;
  type: string;
}

export interface IWarehousePage {
  data: IWarehouse[];
  pageIndex: number;
  pageSize: number;
  totalCount: number;
}

export interface IWarehouseParam {
  WarehouseType?: "Distribution" | "Retail";
  Address?: string;
  Fax?: string;
  HotLine?: string;
  Keyword?: string;
  PageIndex?: number;
  PageSize?: number;
}
