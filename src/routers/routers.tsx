import Home from "pages/home/Home";
import Cart from "pages/Cart";
import About from "pages/Cart";
import DashboardAdmin from "pages/admin/dashboard/dashboard";
import Orders from "pages/admin/orders/orders";
import Products from "pages/admin/products/products";
import Customers from "pages/admin/customers/customers";
import LoginAdmin from "pages/admin/login/login-admin";
import AddProduct from "pages/admin/products/add-product";
import AddBrand from "pages/admin/brand/add-brand";
import AddCategory from "pages/admin/category/add-category";
import AddCategoryGroup from "pages/admin/category-group/add-category-group";
import Category from "pages/admin/category/category";
import CategoryGroup from "pages/admin/category-group/category-group";
import Brand from "pages/admin/brand/brand";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import { DefaultLayout, AdminLayout } from "../pages/layouts";

const privateRouter = [{ path: "/", element: Home, layout: DefaultLayout }];
const publicRouters = [
  { path: "/", element: Home, layout: DefaultLayout },
  { path: "/Cart", element: Cart, layout: DefaultLayout },
  { path: "/About", element: About, layout: DefaultLayout },
  { path: "/admin/dashboard", element: DashboardAdmin, layout: AdminLayout },
  { path: "/admin/orders", element: Orders, layout: AdminLayout },
  { path: "/admin/products", element: Products, layout: AdminLayout },
  { path: "/admin/customers", element: Customers, layout: AdminLayout },
];

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<Home />}></Route>
        <Route path="cart" element={<Cart />}></Route>
        <Route path="about" element={<About />}></Route>
      </Route>
      <Route path="/admin/login" element={<LoginAdmin />}></Route>
      <Route path="/admin/" element={<AdminLayout />}>
        <Route index element={<DashboardAdmin />}></Route>
        <Route path="orders" element={<Orders />}></Route>
        <Route path="customers" element={<Customers />}></Route>
        <Route path="products" element={<Products />}></Route>
        <Route path="products/add-product" element={<AddProduct />}></Route>

        <Route path="category" element={<Category />} />
        <Route path="category/:numberPage" element={<Category />} />

        <Route path="category/add-category" element={<AddCategory />} />
        <Route path="category-group" element={<CategoryGroup />} />
        <Route
          path="category-group/add-category-group"
          element={<AddCategoryGroup />}
        />
        <Route path="brand" element={<Brand />} />
        <Route path="brand/add-brand" element={<AddBrand />} />
      </Route>
    </Route>
  )
);
export default router;
