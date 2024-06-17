import { IProductOrder } from "share/types/product";

export interface IAccessToken {
  name: string;
  email: string;
  role: string | string[];
  createdAt: Date;
  updatedAt: Date;
}
export interface IUserDetail {
  id: string;
  name: string;
  email: string;
  address?: string;
  department?: IDepartment;
  imageUrl?: string;
  phone?: string;
}

export interface ICustomerDetail {
  id: string;
  name: string;
  email: string;
  deliveryInfos: IDeliveryInfo[];
  purchases: [];
  wishlists: [];
}

export interface IDepartment {
  id: string;
  name: string;
  description: string;
}

interface IAddress {
  number: string;
  street: string;
  ward: string;
  district: string;
  city: string;
}

export interface IDeliveryInfo {
  id: string;
  name: string;
  address: IAddress;
  phoneNumber: string;
}

export interface IDeliveryInput {
  name: string;
  address: IAddress;
  phoneNumber: string;
}

export interface IWishlistProduct {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  isActive: boolean;
  isInStock: boolean;
  likeCount: number;
  numberOfStar: number;
  unitPrice: number;
  viewCount: number;
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
  specifications?: IProductSpecification[];
}

export interface IProductSpecification {
  specificationId: string;
  specificationName: string;
  specificationValue: string;
}

export interface IProductType {
  id: string;
  name: string;
  description?: string;
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

export interface IGenericResponse {
  status: string;
  message: string;
}

export interface ICartDetail {
  id: string;
  customerId: string;
  status: string;
  items: IProductOrder[];
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
