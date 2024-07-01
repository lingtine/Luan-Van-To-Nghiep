import { createApi } from "@reduxjs/toolkit/query/react";

import customFetchBase from "redux/api/customFetchBase";
import {
  IOrder,
  IOrderDetail,
  IOrderAdmin,
  IOrderInfo,
  IOrderReport,
  IOrderParams,
  IOrderPage,
} from "share/types/order";
import { IOrderReportResponse, OrderReportType } from "share/types/report";

const orderApi = createApi({
  reducerPath: "order",
  baseQuery: customFetchBase,
  tagTypes: ["processing-Order", "create-order", "change-process", "report"],
  endpoints: (builder) => ({
    getOrders: builder.query<IOrderPage, IOrderParams>({
      query: (params) => ({
        url: "/orders/orders",
        method: "GET",
        params,
      }),

      providesTags: ["processing-Order"],
    }),
    getOrdersCustomer: builder.query<
      {
        data: IOrder[];
        pageIndex: number;
        pageSize: number;
        totalCount: number;
      },
      IOrderParams
    >({
      query: (params) => ({
        url: "/orders/orders/customer",
        method: "GET",
        params,
      }),
    }),
    createOrder: builder.mutation<any, IOrderInfo>({
      query: (data) => ({
        url: "/orders/orders",
        method: "POST",
        body: data,
      }),
    }),
    getOrder: builder.query<IOrderDetail, string>({
      query: (orderId: string) => ({
        url: `/orders/orders/GetOrderDetail/${orderId}`,
        method: "GET",
      }),
      transformResponse: ({ data }) => data,
      providesTags: (result, error, arg) => {
        return [{ type: "change-process", id: arg }];
      },
    }),
    orderProcessing: builder.mutation<any, string>({
      query: (orderId: string) => ({
        url: `orders/orders/process/${orderId}`,
        method: "POST",
      }),
      invalidatesTags: (result, error, arg) => {
        return [{ type: "change-process", id: arg }, "processing-Order"];
      },
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
    getOrdersByCustomer: builder.query<IOrder[], void>({
      query: () => ({
        url: "/orders/orders/customer",
        method: "GET",
      }),
      transformResponse: ({ data }) => data,
    }),
    getTotalRevenue: builder.query<any, void>({
      query: () => ({
        url: "/orders/orders/GetTotalRevenue",
        method: "GET",
      }),
    }),
    getTotalOrderCreate: builder.query<any, void>({
      query: () => ({
        url: "/orders/orders/GetTotalOrderCreated",
        method: "GET",
      }),
    }),
    getOrderReportInRange: builder.mutation<
      IOrderReportResponse,
      { date: Date; type: OrderReportType }
    >({
      query: (body: { date: Date; type: OrderReportType }) => ({
        url: "/orders/orders/GetOrderReportInRange",
        method: "POST",
        body: body,
      }),
      transformResponse: (response: IOrderReportResponse) => {
        return response;
      },
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
  useGetOrderReportInRangeMutation,
} = orderApi;

export default orderApi;
