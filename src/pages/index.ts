//admins page
import { lazy } from "react";

const BrandPage = lazy(() => import("./admin/product-management/brand/brand"));
const AddBrandPage = lazy(
  () => import("./admin/product-management/brand/add-brand")
);
const CategoryAdminPage = lazy(
  () => import("./admin/product-management/category/category")
);
const CategoryGroupPage = lazy(
  () => import("./admin/product-management/category-group/category-group")
);
const AddCategoryGroupPage = lazy(
  () => import("./admin/product-management/category-group/add-category-group")
);
const CustomersPage = lazy(() => import("./admin/customers/customers"));
const DashboardAdminPage = lazy(() => import("./admin/dashboard/dashboard"));
const LoginAdminPage = lazy(() => import("./admin/login/login-admin"));
const OrdersAdminPage = lazy(() => import("./admin/orders/orders"));
const OrderDetailAdminPage = lazy(() => import("./admin/orders/order-detail"));
const OrderReportPage = lazy(() => import("./admin/report/OrderReport"));
const FavoriteProductReportPage = lazy(
  () => import("./admin/report/FavoriteProductReport")
);

const AddProductPage = lazy(
  () => import("./admin/product-management/products/add-product")
);
const ProductDetailAdminPage = lazy(
  () => import("./admin/product-management/products/product-detail")
);
const ProductsAdminPage = lazy(
  () => import("./admin/product-management/products/products")
);
const SpecificationsPage = lazy(
  () => import("./admin/product-management/specification/specification")
);
const ReportPage = lazy(
  () => import("./admin/warehouse-management/InventoryReport/InventoryReport")
);
const InventoryPage = lazy(
  () => import("./admin/warehouse-management/inventory/inventory")
);
const WarehousesPage = lazy(
  () => import("./admin/warehouse-management/warehouse/warehouse")
);
const AddWarehousePage = lazy(
  () => import("./admin/warehouse-management/warehouse/add-warehouse")
);
const SuppliersPage = lazy(
  () => import("./admin/warehouse-management/supplier/supplier")
);
const AddSupplierPage = lazy(
  () => import("./admin/warehouse-management/supplier/add-supplier")
);
const AddGoodsReceiptPage = lazy(
  () => import("./admin/warehouse-management/InventoryReport/add-goods-receipt")
);
const AddGoodsIssuePage = lazy(
  () => import("./admin/warehouse-management/InventoryReport/add-goods-issue")
);

const InventoryReportDetailPage = lazy(
  () =>
    import("./admin/warehouse-management/InventoryReport/InventoryReportDetail")
);
const ReportDetail = lazy(() => import("./admin/report/report-detail"));
const StockReportPage = lazy(() => import("./admin/report/StockReport"));
const CustomerSaleReportPage = lazy(
  () => import("./admin/report/CustomerSaleReport")
);

const DiscountEventsPage = lazy(
  () => import("./admin/discount-management/discount-events/discount-events")
);
const AddDiscountEventPage = lazy(
  () => import("./admin/discount-management/discount-events/add-discount-event")
);
const CouponsPage = lazy(
  () => import("./admin/discount-management/coupon/coupon")
);
const AddCouponPage = lazy(
  () => import("./admin/discount-management/coupon/add-coupon")
);
const StatisticalPage = lazy(
  () => import("./admin/warehouse-management/statistical/statistical")
);
const ReportOrderPage = lazy(
  () => import("./admin/warehouse-management/statistical/report-product")
);
const ReportWarehousePage = lazy(
  () => import("./admin/warehouse-management/statistical/report-warehouse")
);

const FilterAdminPage = lazy(
  () => import("./admin/product-management/filter/Filter")
);
// clients page
const AboutPage = lazy(() => import("./client/about/about"));
const CartPage = lazy(() => import("./client/cart/cart"));
const CategoryPage = lazy(() => import("./client/category/category"));
const ContactPage = lazy(() => import("./client/contact/contact"));
const ForgetPasswordPage = lazy(
  () => import("./client/forget-password/forget-password")
);
const HomePage = lazy(() => import("./client/home/home"));
const LoginPage = lazy(() => import("./client/login/login"));
const RegisterPage = lazy(() => import("./client/register/register"));
const ProductDetailPage = lazy(
  () => import("./client/product-detail/product-detail")
);

// const WishListPage = lazy(() => import("./client/wish-list/wishlist"));
const ResetPasswordPage = lazy(
  () => import("./client/reset-password/reset-password")
);
const NotFoundPage = lazy(() => import("./client/not-found/not-found"));
const CheckOutPage = lazy(() => import("./client/check-out/check-out"));
const AccountPage = lazy(() => import("./client/account/account"));
const AccountOrderDetailPage = lazy(
  () => import("./client/account/components/CustomerOrderDetail")
);
const AccountAddressPage = lazy(
  () => import("./client/account/account-delivery")
);
const AccountOrderPage = lazy(() => import("./client/account/account-order"));
const CustomerWishlistPage = lazy(
  () => import("./client/account/CustomerWishlist")
);

// layouts page
const DefaultLayout = lazy(() => import("./layouts/default-layout"));
const AdminLayout = lazy(() => import("./layouts/admin-layout"));
const AccountLayout = lazy(() => import("./layouts/account-layout"));

export {
  AboutPage,
  AccountAddressPage,
  AccountOrderDetailPage,
  AccountLayout,
  AccountOrderPage,
  AccountPage,
  AddBrandPage,
  AddCategoryGroupPage,
  AddCouponPage,
  AddDiscountEventPage,
  AddGoodsIssuePage,
  AddGoodsReceiptPage,
  AddProductPage,
  AddSupplierPage,
  AddWarehousePage,
  AdminLayout,
  BrandPage,
  CartPage,
  CategoryAdminPage,
  CategoryGroupPage,
  CategoryPage,
  CheckOutPage,
  ContactPage,
  CouponsPage,
  CustomerWishlistPage,
  CustomersPage,
  DashboardAdminPage,
  DefaultLayout,
  DiscountEventsPage,
  FavoriteProductReportPage,
  FilterAdminPage,
  ForgetPasswordPage,
  HomePage,
  InventoryPage,
  LoginAdminPage,
  LoginPage,
  NotFoundPage,
  OrderDetailAdminPage,
  OrderReportPage,
  OrdersAdminPage,
  ProductDetailAdminPage,
  ProductDetailPage,
  ProductsAdminPage,
  RegisterPage,
  ReportDetail,
  ReportOrderPage,
  ReportPage,
  ReportWarehousePage,
  ResetPasswordPage,
  SpecificationsPage,
  StatisticalPage,
  StockReportPage,
  CustomerSaleReportPage,
  SuppliersPage,
  WarehousesPage,
  InventoryReportDetailPage,
};
