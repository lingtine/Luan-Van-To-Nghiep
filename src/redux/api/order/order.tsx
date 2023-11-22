import { createApi } from "@reduxjs/toolkit/query/react";

import customFetchBase from "redux/api/customFetchBase";
import { IOrder } from "../types";

const orderApi = createApi({
  reducerPath: "order",
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => ({
        url: "orders/orders",
        method: "GET",
      }),

      transformResponse: (response: { data: IOrder[] }) => response.data,
    }),
    createOrder: builder.mutation({
      query: ({ id, ...ref }: IOrder) => ({
        url: "orders/orders",
        method: "POST",
        data: ref,
      }),
    }),
    orderProcessing: builder.mutation({
      query: (orderId: string) => ({
        url: `orders/orders/process/${orderId}`,
        method: "POST",
      }),
    }),
    getOrdersByCustomer: builder.query({
      query: () => ({
        url: "orders/orders/customer",
        method: "GET",
      }),
      transformResponse: (response: { data: IOrder[] }) => response.data,
    }),
  }),
});
export const {
  useCreateOrderMutation,
  useGetOrdersByCustomerQuery,
  useGetOrdersQuery,
  useOrderProcessingMutation,
} = orderApi;

export default orderApi;
