export interface IDiscountEventInput {
  id: string;
  name: string;
  description: string;
}

export interface IDiscountEvent extends IDiscountEventInput {
  id: string;
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

export type DiscountEventStatus = "Created" | "Effecting" | "Expired";
