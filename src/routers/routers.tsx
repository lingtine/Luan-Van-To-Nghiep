import Home from "pages/home/Home";
import Cart from "pages/Cart";
import About from "pages/Cart";
import DashboardAdmin from "pages/admin/dashboard/dashboard";
import Orders from "pages/admin/orders/orders";
import Products from "pages/admin/products/products";
import Customers from "pages/admin/customers/customers";
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
      <Route path="/admin/" element={<AdminLayout />}>
        <Route index element={<DashboardAdmin />}></Route>
        <Route path="orders" element={<Orders />}></Route>
        <Route path="products" element={<Products />}></Route>
        <Route path="customers" element={<Customers />}></Route>
      </Route>
    </Route>
  )
);
export default router;
