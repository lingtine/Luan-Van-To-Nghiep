import { IBrand } from "./brand";
import { ICategory } from "./category";
import { IReviewUser } from "redux/api/types";

export interface IProductDetail {
  brand: IBrand;
  category: ICategory;
  id: string;
  isActive: boolean;
  isInStock: boolean;
  likeCount: number;
  name: string;
  numberOfStar: number;
  productImages: string[];
  description: string;
  unitPrice: number;
  imageUrl: string;
  productSpecifications: IProductSpecification[];
  rateCount: number;
  viewCount: number;
  relatedProducts?: IProductDetail[];
}
export interface IProductPage {
  data: IProductDetail[];
  pageIndex: number;
  pageSize: number;
  totalCount: number;
}

export interface IProductSpecificationInput {
  specificationId: string;
  specificationName: string;
  specificationValue: string;
}
export interface IProductSpecification extends IProductSpecificationInput {
  id: string;
  productId: string;
}

export interface IProductInput {
  id?: string;
  name: string;
  description: string;
  unitPrice: number;
  image: File;
  categoryId: string;
  brandId: string;
  sku: string;
  relatedImages?: FileList;
  specifications?: IProductSpecificationInput[];
}

export interface IProductWarehouse {
  id: string;
  name: string;
  quantity: number;
  sku: string;
  status: string;
}

export interface IProductAddToCart {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
}
export interface IProductOrder extends IProductAddToCart {
  id: string;
}
export interface IProductReview {
  id: string;
  productId: string;
  customerId: string;
  numberOfStar: number;
  comment: string;
  imageUrls: any[];
  createdAt: Date;
  lastModifiedAt: Date;
  reviewUser: IReviewUser;
  children?: IProductReview[];
}

export interface IProductParams {
  OrderBy?: OrderBy;
  IsOrderDesc?: boolean;
  CategoryGroupId?: string;
  Category?: string;
  BrandId?: string;
  MinPrice?: number;
  MaxPrice?: number;
  IsInStock?: boolean;
  CategoryIds?: string[];
  Keyword?: string;
  PageIndex?: string;
  PageSize?: number;
}

export interface IProductReport {
  date: null;
  productId: string;
  productName: string;
  revenue: number;
}

export interface IDateReport {
  start: string;
  end: string;
}
export interface IProductReportInput {
  start: string;
  end: string;
}

export type OrderBy = "Id" | "Name" | "Price";
