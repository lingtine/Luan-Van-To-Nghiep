export interface IWarehouseInput {
  id?: string;
  name: string;
  description: string;
  email: string;
  address: string;
  fax: string;
  hotLine: string;
  warehouseType: WarehouseType;
}
export interface IWarehouse {
  id: string;
  name: string;
  description: string;
  email: string;
  address: string;
  fax: string;
  hotLine: string;
  type: WarehouseType;
}

export interface IWarehouseTable extends IWarehouse {
  index: number;
}

export interface IWarehousePage {
  data: IWarehouse[];
  pageIndex: number;
  pageSize: number;
  totalCount: number;
}

export interface IWarehouseParam {
  WarehouseType?: WarehouseType;
  Address?: string;
  Fax?: string;
  HotLine?: string;
  Keyword?: string;
  PageIndex?: string;
  PageSize?: number;
}

export interface IStockReportRequest {
  Start: Date;
  End: Date;
}

export interface IStockReportResponse {
  data: IStockReportItem[];
}

export interface IStockReportItem {
  productId: string;
  name: string;
  sku: string;
  openingStock: number;
  inwardStock: number;
  outwardStock: number;
  closingStock: number;
}

export interface IStockReportTable extends IStockReportItem{
  index : number
}
export type WarehouseType = "Distribution" | "Retail";
