export interface IUser {
  name: string;
  email: string;
  role: string;
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface IGenericResponse {
  status: string;
  message: string;
}

export interface ICategoryGroup {
  id: string;
  name: string;
  description: string;
}

export interface ICategory {
  id: string;
  categoryGroupId: string;
  name: string;
  description: string;
}
export interface IBrand {
  id: string;
  name: string;
  description: string;
  image: File;
}

export interface IProductType {
  id: string;
  name: string;
  description: string;
  unitPrice: number;
  image: File;
  categoryId: string;
  brandId: string;
}
export interface IProductSpecifications {
  id: string;
  productId: string;
  specificationId: string;
  specificationName: string;
  specificationValue: string;
}

export interface IProductDetailType {
  brand: IBrand;
  category: ICategory;
  id: string;
  isActive: boolean;
  isInStock: boolean;
  likeCount: number;
  name: string;
  numberOfStar: number;
  productImages: [];
  description: string;
  unitPrice: number;
  imageUrl: string;
  productSpecifications: IProductSpecifications[];
  rateCount: number;
  viewCount: number;
}
