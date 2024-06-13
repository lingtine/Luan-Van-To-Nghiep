export interface ICouponInput {
  id?: string;
  name: string;
  description: string;
  reducedPrice: number;
  quantity: number;
  discountEventId: string;
}

export interface ICoupon {
  id: string;
  name: string;
  description: string;
  reducedPrice: number;
  quantity: number;
  discountEventId: string;
}

export interface ICouponTable extends ICoupon {
  index: number;
}

export interface ICouponPage {
  data: ICoupon[];
  pageIndex: number;
  pageSize: number;
  totalCount: number;
}

export interface ICouponParams {
  Keyword?: string;
  PageIndex?: string;
  PageSize?: number;
  CouponStatus?: CouponStatus;
}

export type CouponStatus = "Created" | "Effecting" | "Expired";
