export interface IProductReport {
  sku: string;
  productName: string;
  warehouseName: string;
  isStockQuantity: number;
  beginningInventory: number;
  endingInventory: number;
}

export interface ITransportReport {
  goodsTransportId: string;
  goodsTransportName: string;
  form: string;
  to: string;
  productName: string;
  quantity: number;
  reportType: "GoodsReceiptReport" | "GoodsIssueReport";
}

export interface IReportInput {
  from?: string;
  to?: string;
  reportType: string;
  description: string;
  supplierId?: string;
  reportProducts: {
    productId: string;
    quantity: number;
  }[];
}
export interface IReport {
  id: string;
  from?: string;
  to?: string;
  reportType: string;
  description: string;
  supplierId?: string;
  reportStatus: ReportStatus;
  createAt: string;
  reportProducts: {
    productId: string;
    quantity: number;
  }[];
}

export interface IReportPage {
  data: IReport[];
  pageIndex: number;
  pageSize: number;
  totalCount: number;
}

export interface IReportPage {
  data: IReport[];
  pageIndex: number;
  pageSize: number;
  totalCount: number;
}

export interface IReportParam {
  status?: ReportStatus;
  orderBy?: OrderBy;
  Keyword?: string;
  PageIndex?: string;
  PageSize?: number;
}
export type OrderBy = "Status" | "CreateAt" | "ApproveAt" | "CreateAt";
export type ReportStatus = "Creative" | "Approved" | "Inspected" | "Cancelled";
