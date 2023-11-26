import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import ProductDetailPage from "pages/products/ProductDetail";
import {
  AdminLayout,
  DefaultLayout,
  AboutPage,
  NotFoundPage,
  AddBrandPage,
  AddCategoryGroupPage,
  AddCategoryPage,
  AddProductPage,
  BrandPage,
  CartPage,
  CategoryAdminPage,
  CategoryGroupPage,
  CategoryPage,
  CheckOutPage,
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
  ProfilePage,
  RegisterPage,
  SearchPage,
  WishListPage,
  ResetPasswordPage,
  AddSpecificationPage,
  SpecificationsPage,
  InventoryPage,
  ReportPage,
  AddSupplierPage,
  AddWarehousePage,
  SuppliersPage,
  WarehousesPage,
  AddCouponPage,
  AddDiscountEventPage,
  CouponsPage,
  DiscountEventsPage,
  AddGoodsReceiptPage,
  AddGoodsIssuePage,
  ReportDetail,
} from "pages";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<DefaultLayout />}>
        <Route
          path="/products/detail/id"
          element={<ProductDetailPage />}
        ></Route>
        <Route index element={<HomePage />}></Route>
        <Route path="cart" element={<CartPage />}></Route>
        <Route path="about" element={<AboutPage />}></Route>
        <Route path="contact-us" element={<ContactPage />}></Route>

        <Route path="category/:categoryId" element={<CategoryPage />}></Route>

        <Route path="login" element={<LoginPage />}></Route>
        <Route path="register" element={<RegisterPage />}></Route>
        <Route path="forget-password" element={<ForgetPasswordPage />}></Route>
        <Route path="profile" element={<ProfilePage />}></Route>
        <Route path="wishlist" element={<WishListPage />}></Route>
        <Route path="search" element={<SearchPage />}></Route>

        <Route path="reset-password" element={<ResetPasswordPage />}></Route>

        {/* <Route
          path="category/:productDetail"
          element={<ProductDetailPage />}
        ></Route> */}
        <Route path="*" element={<NotFoundPage />}></Route>
      </Route>
      <Route path="/cart/check-out" element={<CheckOutPage />}></Route>

      <Route path="/login-admin" element={<LoginAdminPage />}></Route>
      <Route path="/admin/" element={<AdminLayout />}>
        <Route index element={<DashboardAdminPage />}></Route>
        <Route path="orders" element={<OrdersAdminPage />}></Route>
        <Route path="customers" element={<CustomersPage />}></Route>
        <Route path="products" element={<ProductsAdminPage />}></Route>
        <Route path="inventory" element={<InventoryPage />}></Route>

        <Route path="report" element={<ReportPage />}></Route>
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
          path="products/:productId"
          element={<ProductDetailAdminPage />}
        ></Route>

        <Route path="category" element={<CategoryAdminPage />} />
        <Route path="category/:numberPage" element={<CategoryAdminPage />} />

        <Route path="category/add-category" element={<AddCategoryPage />} />
        <Route path="category-group" element={<CategoryGroupPage />} />
        <Route
          path="category-group/add-category-group"
          element={<AddCategoryGroupPage />}
        />
        <Route path="brand" element={<BrandPage />} />
        <Route path="brand/add-brand" element={<AddBrandPage />} />
        <Route path="specifications" element={<SpecificationsPage />} />
        <Route
          path="specifications/add-specification"
          element={<AddSpecificationPage />}
        />

        <Route path="suppliers" element={<SuppliersPage />} />
        <Route path="suppliers/add-supplier" element={<AddSupplierPage />} />

        <Route path="warehouses" element={<WarehousesPage />} />
        <Route path="warehouses/add-warehouse" element={<AddWarehousePage />} />

        <Route path="discountEvents" element={<DiscountEventsPage />} />
        <Route
          path="discountEvents/add-discountEvent"
          element={<AddDiscountEventPage />}
        />

        <Route path="coupons" element={<CouponsPage />} />
        <Route path="coupons/add-coupon" element={<AddCouponPage />} />
      </Route>
    </Route>
  )
);
export default router;
