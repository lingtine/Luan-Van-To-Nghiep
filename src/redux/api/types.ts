import { IProductOrder } from "share/types/product";
export interface IUser {
  name: string;
  email: string;
  role: string;
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface IEmployee {
  address?: string;
  department?: string;
  email: string;
  id: string;
  imageUrl?: null;
  name: string;
  phone?: string;
}

export interface IDepartment {
  id: string;
  name: string;
  description: string;
}

export interface IDeliveryInput {
  name: string;
  address: {
    number: string;
    street: string;
    ward: string;
    district: string;
    city: string;
  };
  phoneNumber: string;
}

export interface IDeliveryInfo {
  id: string;
  name: string;
  address: {
    number: string;
    street: string;
    ward: string;
    district: string;
    city: string;
  };
  phoneNumber: string;
}

export interface ICustomerDetail {
  deliveryInfos: IDeliveryInfo[];
  email: string;
  id: string;
  purchases: [];
  name: string;
  wishlists: [];
}

export interface IWishlistProduct {
  id: string;
  name: string;

  description: string;
  imageUrl: string;
}

export interface IAddProductType {
  name: string;
  description: string;
  unitPrice: number;
  image: File;
  categoryId: string;
  brandId: string;
  sku: string;
  relatedImages?: FileList;
  specifications?: IProductAddSpecification[];
}

export interface IProductAddSpecification {
  specificationId: string;
  specificationName: string;
  specificationValue: string;
}

export interface IProductType {
  id: string;
  name: string;
  description: string;

  description?: string,

  unitPrice: number;
  isActive: boolean;
  isInStock: boolean;
  likeCount: number;
  viewCount: number;
  numberOfStar: number;
  imageUrl?: string;
}
export interface IWishlistItem {
  customerId: string;
  items: IWishlistProduct[];
}

export interface IUserDetail {
  address?: string;
  department?: IDepartment;
  email: string;
  id: string;
  imageUrl?: string;
  name: string;
  phone?: string;
}

export interface IGenericResponse {
  status: string;
  message: string;
}

export interface IOrder {
  id?: string;
  couponId: string;
  deliveryInfo: {
    fullName: string;
    phoneNumber: string;
    email: string;
    address: {
      city: string;
      district: string;
      ward: string;
      street: string;
      streetNumber: string;
    };
    note: string;
  };
}

export interface IOrderAdmin {
  id?: string;
  couponId: string;
  deliveryInfo: {
    fullName: string;
    phoneNumber: string;
    email: string;
    address: {
      city: string;
      district: string;
      ward: string;
      street: string;
      streetNumber: string;
    };
    note: string;
  };
  status:
    | "Created"
    | "Processing"
    | "Delivering"
    | "Delivered"
    | "Returned"
    | "Canceled";
}

export interface ICartDetail {
  id: string;
  customerId: string;
  status: string;
  items: IProductOrder[];
}

export interface IOrderDetail {
  id: string;
  cartId: string;
  deliveryInfo: {
    fullName: string;
    phoneNumber: string;
    email: string;
    address: {
      city: string;
      district: string;
      ward: string;
      street: string;
      streetNumber: string;
    };
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
    items: IProductOrder[];
  };
  status: string;
}

export interface IOrderReport {
  revenue: number;
  status: string;
  totalAmount: number;
  totalDiscount: number;
  totalOrder: number;
  totalProduct: number;
}

export interface IReviewUser {
  id: string;
  name: string;
  imageUrl: string;
}

export interface IReviewRequest {
  productId: string;
  numberOfStar: number;
  comment: string;
  attachments?: FileList;
}

export interface IFilter {
  id: string;
  filterName: string;
  specificationId: string;
  specificationName: string;
  categoryGroupId: string;
  categoryGroupName: string;
  values: string[];
}

export interface IFilterOfGroup {
  categoryGroupId: string;
  filterModels: IFilter[];
}

export interface IAddFilter {
  filterName: string;
  specificationId: string;
  categoryGroupId: string;
  values: string[];
}

export interface IFilterProduct {
  specificationId: string;
  value: string;
}
export interface IFilterProductParameter {
  pageSize?: number;
  pageIndex?: number;
  brandIds: string[];
  categoryIds: string[];
  filterValues: IFilterProduct[];
}
