export interface IDiscountEventInput {
  id?: string;
  name: string;
  description: string;
}

export interface IDiscountEvent {
  id: string;
  name: string;
  description: string;
}

export interface IDiscountEventTable extends IDiscountEvent {
  index: number;
}

export interface IDiscountEventPage {
  data: IDiscountEvent[];
  pageIndex: number;
  pageSize: number;
  totalCount: number;
}

export interface IDiscountEventParams {
  Keyword?: string;
  PageIndex?: string;
  PageSize?: number;
  Status?: DiscountEventStatus;
}

export interface IDiscountEventChangeStatus {
  id: string;
  status: DiscountEventStatus;
}

export type DiscountEventStatus = "Created" | "Effecting" | "Expired";
