import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import AuthGuard from "auth/auth-guard";
import AuthClientGuard from "auth/auth-client-guard";

import {
  AdminLayout,
  DefaultLayout,
  AboutPage,
  NotFoundPage,
  AddProductPage,
  BrandPage,
  CartPage,
  CategoryAdminPage,
  CategoryGroupPage,
  CategoryPage,
  ContactPage,
  CustomersPage,
  DashboardAdminPage,
  ForgetPasswordPage,
  HomePage,
  LoginAdminPage,
  LoginPage,
  OrdersAdminPage,
  ProductDetailAdminPage,
  ProductsAdminPage,
  RegisterPage,
  SearchPage,
  ResetPasswordPage,
  SpecificationsPage,
  InventoryPage,
  ReportPage,
  SuppliersPage,
  WarehousesPage,
  CouponsPage,
  DiscountEventsPage,
  AddGoodsReceiptPage,
  AddGoodsIssuePage,
  ReportDetail,
  StatisticalPage,
  OrderDetailAdminPage,
  CartClientPage,
  ReportOrderPage,
  AccountLayout,
  AccountAddressPage,
  AccountOrderPage,
  AccountPage,
  ProductDetailPage,
  ReportWarehousePage,
  FilterAdminPage,
  CustomerWishlistPage,
} from "pages";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<HomePage />}></Route>
        <Route path="about" element={<AboutPage />}></Route>
        <Route path="contact-us" element={<ContactPage />}></Route>
        <Route path="category/:categoryId" element={<CategoryPage />}></Route>
        <Route
          path="category/:categoryId/:index"
          element={<CategoryPage />}
        ></Route>
        <Route path="login" element={<LoginPage />}></Route>
        <Route path="register" element={<RegisterPage />}></Route>
        <Route path="forget-password" element={<ForgetPasswordPage />}></Route>
        <Route path="search" element={<SearchPage />}></Route>
        <Route path="reset-password" element={<ResetPasswordPage />}></Route>
        <Route
          path="product-detail/:productId"
          element={<ProductDetailPage />}
        ></Route>

        <Route element={<AuthClientGuard />}>
          <Route path="account" element={<AccountLayout />}>
            <Route index element={<AccountPage />}></Route>
            <Route path="orders" element={<AccountOrderPage />}></Route>
            <Route path="address" element={<AccountAddressPage />}></Route>
            <Route path="wishlist" element={<CustomerWishlistPage />}></Route>
          </Route>

          <Route path="cart" element={<CartPage />}></Route>

          <Route path="cart-client" element={<CartClientPage />}></Route>
        </Route>
      </Route>

      <Route path="/login-admin" element={<LoginAdminPage />}></Route>
      <Route
        path="/admin/"
        element={
          <AuthGuard>
            <AdminLayout />
          </AuthGuard>
        }
      >
        <Route index element={<DashboardAdminPage />}></Route>
        <Route path="orders" element={<OrdersAdminPage />}></Route>
        <Route path="orders/:index" element={<OrdersAdminPage />}></Route>
        <Route
          path="orders/order-detail/:orderId"
          element={<OrderDetailAdminPage />}
        ></Route>

        <Route path="customers" element={<CustomersPage />}></Route>
        <Route path="customers/:index" element={<CustomersPage />}></Route>

        <Route path="products" element={<ProductsAdminPage />}></Route>
        <Route path="products/:index" element={<ProductsAdminPage />}></Route>

        <Route path="inventory" element={<InventoryPage />}></Route>
        <Route path="inventory/:index" element={<InventoryPage />}></Route>

        <Route path="report" element={<ReportPage />}></Route>
        <Route path="reports/:index" element={<ReportPage />}></Route>

        <Route
          path="report/addGoodsReceipt"
          element={<AddGoodsReceiptPage />}
        ></Route>
        <Route
          path="report/addGoodsIssue"
          element={<AddGoodsIssuePage />}
        ></Route>
        <Route path="report/:reportId" element={<ReportDetail />}></Route>

        <Route path="products/add-product" element={<AddProductPage />}></Route>
        <Route
          path="products/product-detail/:productId"
          element={<ProductDetailAdminPage />}
        ></Route>
        <Route path="products/:index" element={<ProductsAdminPage />}></Route>

        <Route path="category" element={<CategoryAdminPage />} />
        <Route path="category/:index" element={<CategoryAdminPage />} />

        <Route path="category-group" element={<CategoryGroupPage />} />
        <Route path="category-group/:index" element={<CategoryGroupPage />} />

        <Route path="brand" element={<BrandPage />} />
        <Route path="brand/:index" element={<BrandPage />} />

        <Route path="specifications" element={<SpecificationsPage />} />
        <Route path="specifications/:index" element={<SpecificationsPage />} />

        <Route path="suppliers" element={<SuppliersPage />} />
        <Route path="suppliers/:index" element={<SuppliersPage />} />

        <Route path="warehouses" element={<WarehousesPage />} />
        <Route path="warehouses/:index" element={<WarehousesPage />} />
        <Route path="statistical" element={<StatisticalPage />} />

        <Route path="discountEvents" element={<DiscountEventsPage />} />
        <Route path="discountEvents/:index" element={<DiscountEventsPage />} />

        <Route path="coupons" element={<CouponsPage />} />
        <Route path="coupons/:index" element={<CouponsPage />} />
        <Route path="report-order" element={<StatisticalPage />} />
        <Route path="report-product" element={<ReportOrderPage />} />
        <Route path="report-warehouse" element={<ReportWarehousePage />} />

        <Route path="filters" element={<FilterAdminPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />}></Route>
    </Route>
  )
);
export default router;
