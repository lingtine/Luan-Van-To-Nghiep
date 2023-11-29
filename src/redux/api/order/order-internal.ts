import { createApi } from "@reduxjs/toolkit/query/react";

import customFetchBase from "redux/api/customFetchBase";

const orderInternalApi = createApi({
  reducerPath: "orderInternal",
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    getForReport: builder.mutation({
      query: (data: { start: string; end: string }) => ({
        url: "/orders/OrderInternal/GetForReport",
        method: "POST",
        body: data,
      }),
    }),
    getProductRevenueById: builder.mutation({
      query: (data: { productId: string; start: string; end: string }) => ({
        url: "/orders/OrderInternal/GetProductRevenueById",
        method: "POST",
        body: data,
      }),
    }),
  }),
});
export const { useGetForReportMutation, useGetProductRevenueByIdMutation } =
  orderInternalApi;

export default orderInternalApi;
