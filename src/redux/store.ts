import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import authApi from "./api/auth/authApi";
import productApi from "./api/catalog/product";
import categoryApi from "./api/catalog/category";
import categoryGroupApi from "./api/catalog/category-group";
import brandApi from "./api/catalog/brand";
import customerApi from "./api/auth/customer-api";
import userSlide from "./features/auth/userSlice";
import authSlice from "./features/auth/authSlice";
import employeeApi from "./api/auth/employeeApi";
import specificationsApi from "./api/catalog/specification";
import orderApi from "./api/order/order";

import goodsIssueApi from "./api/warehouse/goodsIssue";
import goodsReceiptApi from "./api/warehouse/goodsReceipt";
import productWarehouseApi from "./api/warehouse/product";
import reportApi from "./api/warehouse/report";
import stockApi from "./api/warehouse/stock";
import supplierApi from "./api/warehouse/supplier";
import warehouseApi from "./api/warehouse/warehouse";
import discountEventApi from "./api/discount/discount-event";
import couponApi from "./api/discount/coupon";
import cartApi from "./api/cart/cart";
import orderInternalApi from "./api/order/order-internal";
import reportingApi from "./api/warehouse/reporting";

export const store = configureStore({
  reducer: {
    authSlice: authSlice,
    [userSlide.name]: userSlide.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [orderInternalApi.reducerPath]: orderInternalApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [discountEventApi.reducerPath]: discountEventApi.reducer,
    [couponApi.reducerPath]: couponApi.reducer,

    [customerApi.reducerPath]: customerApi.reducer,
    [employeeApi.reducerPath]: employeeApi.reducer,
    [brandApi.reducerPath]: brandApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [categoryGroupApi.reducerPath]: categoryGroupApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [specificationsApi.reducerPath]: specificationsApi.reducer,
    [reportingApi.reducerPath]: reportingApi.reducer,
    [goodsIssueApi.reducerPath]: goodsIssueApi.reducer,
    [goodsReceiptApi.reducerPath]: goodsReceiptApi.reducer,
    [productWarehouseApi.reducerPath]: productWarehouseApi.reducer,
    [reportApi.reducerPath]: reportApi.reducer,
    [stockApi.reducerPath]: stockApi.reducer,
    [warehouseApi.reducerPath]: warehouseApi.reducer,
    [supplierApi.reducerPath]: supplierApi.reducer,
  },
  devTools: process.env.NODE_ENV === "development",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({})
      .concat(cartApi.middleware)
      .concat(goodsReceiptApi.middleware)
      .concat(productWarehouseApi.middleware)
      .concat(discountEventApi.middleware)
      .concat(couponApi.middleware)
      .concat(orderInternalApi.middleware)
      .concat(reportingApi.middleware)
      .concat(goodsIssueApi.middleware)
      .concat(reportApi.middleware)
      .concat(stockApi.middleware)
      .concat(warehouseApi.middleware)
      .concat(supplierApi.middleware)
      .concat(authApi.middleware)
      .concat(employeeApi.middleware)
      .concat(categoryApi.middleware)
      .concat(categoryGroupApi.middleware)
      .concat(brandApi.middleware)
      .concat(orderApi.middleware)
      .concat(productApi.middleware)
      .concat(customerApi.middleware)
      .concat(specificationsApi.middleware),
});
setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
