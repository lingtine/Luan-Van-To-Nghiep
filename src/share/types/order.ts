import { IProductOrder } from "share/types/product";

export interface IOrderInfo {
  couponId?: string;
  deliveryInfo: {
    fullName: string;
    phoneNumber: string;
    email: string;
    address: IAddressOrder;
    note: string;
  };
}

export interface IOrderAdmin extends IOrderInfo {
  id?: string;
  status: OrderStatus;
}
export interface IOrder extends IOrderInfo {
  id: string;
}

export interface IOrderPage {
  data: IOrderAdmin[];
  pageIndex: number;
  pageSize: number;
  totalCount: number;
}
export interface IOrderTable extends IOrderAdmin {
  index: number;
}

export interface IOrderDetail {
  id: string;
  cartId: string;
  deliveryInfo: {
    fullName: string;
    phoneNumber: string;
    email: string;
    address: IAddressOrder;
    note: string;
  };
  totalItems: number;
  amount: number;
  cost: number;
  couponId: string;
  createAt: string;
  cart: {
    id: string;
    customerId: string;
    status: string;
    items: {
      id: string;
      isActive: false;
      isInStock: false;
      likeCount: number;
      name: string;
      numberOfStar: number;
      productId: string;
      quantity: number;
      unitPrice: number;
      viewCount: number;
    }[];
  };
  status: string;
}
export interface IOrderParams {
  CreateAt?: string;
  OrderStatus?: OrderStatus;
  PageIndex?: string | number;
  PageSize?: number;
}

export interface IOrderReport {
  revenue: number;
  status: string;
  totalAmount: number;
  totalDiscount: number;
  totalOrder: number;
  totalProduct: number;
}

interface IAddressOrder {
  city: string;
  district: string;
  ward: string;
  street: string;
  streetNumber: string;
}

export type OrderStatus =
  | "Created"
  | "Processing"
  | "Delivering"
  | "Delivered"
  | "Returned"
  | "Canceled";
