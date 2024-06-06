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

export interface IUserDetail {
  address: string | null;
  department: IDepartment | null;
  email: string;
  id: string;
  imageUrl: string | null;
  name: string;
  phone: string | null;
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
  categoryGroup?: ICategoryGroup; // Add category group
}

export interface ICategoryInput {
  categoryGroupId: string;
  name: string;
  description: string;
  categoryGroup?: ICategoryGroup; // Add category group
}
export interface IBrandInput {
  id?: string;
  name: string;
  description: string;
  image: File;
}

export interface IBrand {
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
  unitPrice: number;
  image: File;
  categoryId: string;
  brandId: string;
  sku: string;
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
  productImages: string[];
  description: string;
  unitPrice: number;
  imageUrl: string;
  productSpecifications: IProductSpecifications[];
  rateCount: number;
  viewCount: number;
  relatedProducts?: IProductDetailType[];
}

export interface ISpecification {
  id: string;
  name: string;
  description: string;
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

export interface IWarehouseInput {
  name: string;
  description: string;
  email: string;
  address: string;
  fax: string;
  hotLine: string;
  warehouseType: string;
}
export interface IWarehouse {
  id: string;
  name: string;
  description: string;
  email: string;
  address: string;
  fax: string;
  hotLine: string;
  type: string;
}

export interface ISupplier {
  id: string;
  name: string;
  description: string;
  address: string;
  phoneNumber: string;
  email: string;
}
export interface IStock {
  id: string;
  productId: string;
  warehouseId: string;
  quantity: number;
  isReceipt: boolean;
}

export interface IReportInput {
  from?: string;
  to?: string;
  reportType: string;
  description: string;
  supplierId?: string;
  reportProducts: {
    productId: string;
    quantity: number;
  }[];
}
export interface IReport {
  id: string;
  from?: string;
  to?: string;
  reportType: string;
  description: string;
  supplierId?: string;
  reportStatus: "Creative" | "Approved" | "Inspected" | "Cancelled";
  createAt: string;
  reportProducts: {
    productId: string;
    quantity: number;
  }[];
}

export interface IProductWarehouse {
  id: string;
  name: string;
  quantity: number;
  sku: string;
  status: string;
}

export interface IGoodsReceipt {
  id: string;
  name: string;
  description: string;
  supplierId: string;
  warehouseId: string;
  items: {
    productId: string;
    quantity: number;
  }[];
}
export interface IGoodsIssue {
  id: string;
  name: string;
  description: string;
  supplierId: string;
  warehouseId: string;
  items: {
    productId: string;
    quantity: number;
  }[];
}

export interface IDiscountEvent {
  id: string;
  name: string;
  description: string;
}

export interface ICoupon {
  id: string;
  name: string;
  description: string;
  reducedPrice: number;
  quantity: number;
  discountEventId: string;
}

export interface IProductInOrder {
  id: string;
  productId: string;
  name: string;
  unitPrice: number;
  quantity: number;
}

export interface ICartDetail {
  id: string;
  customerId: string;
  status: string;
  items: IProductInOrder[];
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
    items: IProductInOrder[];
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

export interface IProductReport {
  date: null;
  productId: string;
  productName: string;
  revenue: number;
}

export interface IReviewUser {
  id: string;
  name: string;
  imageUrl: string;
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

export interface IReviewRequest {
  productId: string;
  numberOfStar: number;
  comment: string;
  attachments?: FileList;
}

export interface IDepartmentInput {
  name: string;
  description: string;
  employeeIds: string[];
}

export interface IProductCart {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
}

export interface ICategoryGroupInput {
  name: string;
  description: string;
}
