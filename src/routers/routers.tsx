import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import {
  AdminLayout,
  DefaultLayout,
  AboutPage,
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
  ProductDetailPage,
  ProductsAdminPage,
  ProfilePage,
  RegisterPage,
  SearchPage,
  WishListPage,
  ResetPasswordPage,
} from "pages";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<HomePage />}></Route>
        <Route path="cart" element={<CartPage />}></Route>
        <Route path="about" element={<AboutPage />}></Route>
        <Route path="contact-us" element={<ContactPage />}></Route>

        <Route path=":categoryId" element={<CategoryPage />}></Route>

        <Route path="login" element={<LoginPage />}></Route>
        <Route path="register" element={<RegisterPage />}></Route>
        <Route path="forget-password" element={<ForgetPasswordPage />}></Route>
        <Route path="profile" element={<ProfilePage />}></Route>
        <Route path="wishlist" element={<WishListPage />}></Route>

        <Route path="reset-password" element={<ResetPasswordPage />}></Route>

        <Route
          path="category/:productDetail"
          element={<ProductDetailPage />}
        ></Route>
      </Route>
      <Route path="check-out" element={<CheckOutPage />}></Route>

      <Route path="/admin/login" element={<LoginAdminPage />}></Route>
      <Route path="/admin/" element={<AdminLayout />}>
        <Route index element={<DashboardAdminPage />}></Route>
        <Route path="orders" element={<OrdersAdminPage />}></Route>
        <Route path="customers" element={<CustomersPage />}></Route>
        <Route path="products" element={<ProductsAdminPage />}></Route>
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
        <Route path="brand/add-brand" element={<AboutPage />} />
      </Route>
    </Route>
  )
);
export default router;
