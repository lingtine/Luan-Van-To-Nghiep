import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import authApi from "./api/authApi";
import productApi from "./api/catalog/product";
import categoryApi from "./api/catalog/category";
import categoryGroupApi from "./api/catalog/category-group";
import brandApi from "./api/catalog/brand";

import userSlide from "./features/auth/userSlice";
import authSlice from "./features/auth/authSlice";
import employeeApi from "./api/employeeApi";
export const store = configureStore({
  reducer: {
    authSlice: authSlice,
    [userSlide.name]: userSlide.reducer,
    [authApi.reducerPath]: authApi.reducer,

    [employeeApi.reducerPath]: employeeApi.reducer,
    [brandApi.reducerPath]: brandApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [categoryGroupApi.reducerPath]: categoryGroupApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  devTools: process.env.NODE_ENV === "development",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({})
      .concat(authApi.middleware)
      .concat(employeeApi.middleware)
      .concat(categoryApi.middleware)
      .concat(categoryGroupApi.middleware)
      .concat(brandApi.middleware)
      .concat(productApi.middleware),
});
setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
