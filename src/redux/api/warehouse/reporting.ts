import customFetchBase from "../customFetchBase";

import { createApi } from "@reduxjs/toolkit/query/react";
import { IProductReport, ITransportReport } from "share/types/report";

const reportingApi = createApi({
  reducerPath: "reporting",
  baseQuery: customFetchBase,
  tagTypes: ["add", "remove", "change-status"],
  endpoints: (build) => ({
    getProductReportByWarehouse: build.mutation<IProductReport, string>({
      query: (warehouseId: string) => ({
        url: `/warehouses/Reporting/GetProductReport/${warehouseId}`,
        method: "GET",
      }),
      transformResponse: ({ data }) => data,
    }),
    getTransportReportByWarehouse: build.mutation<ITransportReport, string>({
      query: (warehouseId: string) => ({
        url: `/warehouses/Reporting/GetTransportReport/${warehouseId}`,
        method: "GET",
      }),
      transformResponse: ({ data }) => data,
    }),
    getTransportReport: build.mutation<ITransportReport[], void>({
      query: () => ({
        url: "/warehouses/Reporting/GetTransportReport",
        method: "GET",
      }),
      transformResponse: ({ data }) => data,
    }),
    getProductReport: build.mutation<IProductReport[], void>({
      query: () => ({
        url: "/warehouses/Reporting/GetProductReport",
        method: "GET",
      }),
      transformResponse: ({ data }) => data,
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
