import { createApi } from "@reduxjs/toolkit/query/react";

import customFetchBase from "redux/api/customFetchBase";
import { IOrder, IOrderDetail } from "../types";
import { IOrderReport } from "../types";
const orderApi = createApi({
  reducerPath: "order",
  baseQuery: customFetchBase,
  tagTypes: ["processing-Order", "create-order"],
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: (params) => ({
        url: "/orders/orders",
        method: "GET",
        params,
      }),

      providesTags: ["processing-Order"],
      transformResponse: (response: {
        data: IOrder[];
        pageIndex: number;
        pageSize: number;
        totalCount: number;
      }) => response,
    }),
    getOrdersCustomer: builder.query({
      query: (params) => ({
        url: "/orders/orders/customer",
        method: "GET",
        params,
      }),

      transformResponse: (response: {
        data: IOrder[];
        pageIndex: number;
        pageSize: number;
        totalCount: number;
      }) => response,
    }),
    createOrder: builder.mutation({
      query: (data) => ({
        url: "/orders/orders",
        method: "POST",
        body: data,
      }),
    }),
    getOrder: builder.query({
      query: (orderId: string) => ({
        url: `/orders/orders/GetOrderDetail/${orderId}`,
        method: "GET",
      }),
      transformResponse: (response: { data: IOrderDetail }) => response.data,
    }),
    orderProcessing: builder.mutation({
      query: (orderId: string) => ({
        url: `orders/orders/process/${orderId}`,
        method: "POST",
      }),
      invalidatesTags: ["processing-Order"],
    }),
    getOrderReportByStatus: builder.mutation({
      query: (data: { start: string; end: string }) => ({
        url: "/orders/orders/GetOrderReportByStatus",
        method: "POST",
        body: data,
      }),

      transformResponse: (response: { data: { data: IOrderReport[] } }) =>
        response.data.data,
      invalidatesTags: ["processing-Order"],
    }),
    exportOrderReportByStatus: builder.mutation({
      query: (data: { start: string; end: string }) => ({
        url: "/orders/orders/ExportOrderReportByStatus",
        method: "POST",
        body: data,
      }),
    }),
    exportOrderReportByStatusFile: builder.mutation({
      query: (data: { start: string; end: string }) => ({
        url: "/orders/orders/ExportOrderReportByStatusFile",
        method: "POST",
        body: data,
      }),
    }),
    getOrderReport: builder.mutation({
      query: (data: { start: string; end: string; reporterId: string }) => ({
        url: "/orders/orders/GetOrderReport",
        method: "POST",
        body: data,
      }),
    }),
    exportOrderReport: builder.mutation({
      query: (data: { start: string; end: string; reporterId: string }) => ({
        url: "/orders/orders/ExportOrderReport",
        method: "POST",
        body: data,
      }),
    }),
    exportOrderReportFile: builder.mutation({
      query: (data: { start: string; end: string; reporterId: string }) => ({
        url: "/orders/orders/ExportOrderReportFile",
        method: "POST",
        body: data,
      }),
    }),
    getOrdersByCustomer: builder.query({
      query: () => ({
        url: "/orders/orders/customer",
        method: "GET",
      }),
      transformResponse: (response: { data: IOrder[] }) => response.data,
    }),
    getTotalRevenue: builder.query({
      query: () => ({
        url: "/orders/orders/GetTotalRevenue",
        method: "GET",
      }),
    }),
    getTotalOrderCreate: builder.query({
      query: () => ({
        url: "/orders/orders/GetTotalOrderCreated",
        method: "GET",
      }),
    }),
  }),
});
export const {
  useCreateOrderMutation,
  useGetOrdersByCustomerQuery,
  useGetOrdersQuery,
  useGetOrdersCustomerQuery,
  useOrderProcessingMutation,
  useExportOrderReportByStatusFileMutation,
  useExportOrderReportByStatusMutation,
  useExportOrderReportFileMutation,
  useExportOrderReportMutation,
  useGetOrderReportByStatusMutation,
  useGetOrderReportMutation,
  useGetOrderQuery,
  useGetTotalOrderCreateQuery,
  useGetTotalRevenueQuery,
} = orderApi;

export default orderApi;
