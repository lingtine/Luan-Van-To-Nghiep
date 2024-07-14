import { ICartDetail } from "./../../redux/api/types";
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
  data: IOrderDetail[];
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
  cart: ICartDetail;
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

export interface ICustomerSale {
  id: string;
  name: string;
  soldCount: number;
  returnedCount: number;
  soldQuantity: number;
  soldAmount: number;
  returnedQuantity: number;
  returnedAmount: number;
  totalDiscount: number;
  totalProfit: number;
  totalQuantity: number;
  averageQuantity: number;
  lastSale: Date;
}

export type OrderStatus =
  | "Created"
  | "Processing"
  | "Delivering"
  | "Delivered"
  | "Returned"
  | "Canceled";
