import customFetchBase from "../customFetchBase";

import { createApi } from "@reduxjs/toolkit/query/react";

const reportingApi = createApi({
  reducerPath: "reporting",
  baseQuery: customFetchBase,
  tagTypes: ["add", "remove", "change-status"],
  endpoints: (build) => ({
    getProductReportByWarehouse: build.mutation({
      query: (warehouseId: string) => ({
        url: `/warehouses/Reporting/GetProductReport/${warehouseId}`,
        method: "GET",
      }),
    }),
    getTransportReportByWarehouse: build.mutation({
      query: (warehouseId: string) => ({
        url: `/warehouses/Reporting/GetTransportReport/${warehouseId}`,
        method: "GET",
      }),
    }),
    getTransportReport: build.mutation({
      query: () => ({
        url: "/warehouses/Reporting/GetTransportReport",
        method: "GET",
      }),
    }),
    getProductReport: build.mutation({
      query: () => ({
        url: "/warehouses/Reporting/GetProductReport",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetProductReportByWarehouseMutation,
  useGetProductReportMutation,
  useGetTransportReportByWarehouseMutation,
  useGetTransportReportMutation,
} = reportingApi;
export default reportingApi;
