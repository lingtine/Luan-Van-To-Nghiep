import Home from "pages/home/Home";
import Cart from "pages/Cart";
import About from "pages/Cart";

import { DefaultLayout } from "../pages/layouts";

const privateRouter = [{ path: "/", element: Home, layout: DefaultLayout }];
const publicRouters = [
  { path: "/", element: Home, layout: DefaultLayout },
  { path: "/Cart", element: Cart, layout: DefaultLayout },
  { path: "/About", element: About, layout: DefaultLayout },
];

export { publicRouters, privateRouter };
