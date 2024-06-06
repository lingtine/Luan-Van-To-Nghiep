export interface ICouponInput {
  name: string;
  description: string;
  reducedPrice: number;
  quantity: number;
  discountEventId: string;
}

export interface ICoupon extends ICouponInput {
  id: string;
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
  CouponStatus?: "Created" | "Effecting" | "Expired";
}
