import customFetchBase from "../customFetchBase";

import { createApi } from "@reduxjs/toolkit/query/react";

import {
  IStockReportRequest,
  IStockReportResponse,
  IWarehouse,
  IWarehouseInput,
  IWarehousePage,
  IWarehouseParam,
} from "share/types/warehouse";
const warehouseApi = createApi({
  reducerPath: "warehouse",
  baseQuery: customFetchBase,
  tagTypes: ["add", "remove", "update", "restore"],
  endpoints: (build) => ({
    getWarehouses: build.query<IWarehousePage, IWarehouseParam>({
      query: (params) => ({
        url: "/warehouses/warehouses",
        method: "GET",
        params,
      }),
      providesTags: ["add", "remove", "update"],
    }),
    getWarehouseDetail: build.query<IWarehouse, string>({
      query: (warehouser) => ({
        url: `/warehouses/warehouses/${warehouser}`,
        method: "GET",
      }),
      transformResponse: ({ data }) => data,
    }),
    createWarehouse: build.mutation<IWarehouse, IWarehouseInput>({
      query: (data) => ({
        url: "/warehouses/warehouses",
        method: "POST",
        body: data,
      }),
      transformResponse: ({ data }) => data,
      invalidatesTags: ["add"],
    }),
    removeWarehouse: build.mutation<boolean, string>({
      query: (warehouseId) => ({
        url: `/warehouses/warehouses/${warehouseId}`,
        method: "DELETE",
      }),
      transformResponse: ({ data }) => data,
      invalidatesTags: ["remove"],
    }),
    updateWarehouse: build.mutation<IWarehouse, IWarehouseInput>({
      query: ({ id, ...rest }) => ({
        url: `/warehouses/warehouses/${id}`,
        method: "PUT",
        body: rest,
      }),
      transformResponse: ({ data }) => data,
      invalidatesTags: ["update"],
    }),
    restoreWarehouse: build.mutation<IWarehouse, string>({
      query: (warehouseId) => ({
        url: `/warehouses/warehouses/restore/${warehouseId}`,
        method: "PUT",
      }),
      transformResponse: ({ data }) => data,
      invalidatesTags: ["restore"],
    }),
    stockReport: build.mutation<IStockReportResponse, IStockReportRequest>({
      query: (data) => ({
        url: `/warehouses/Reporting/GetStockReport`,
        method: "POST",
        body: data,
      }),
      // transformResponse: ({ data }) => data,
    })
  }),
});

export const {
  useCreateWarehouseMutation,
  useGetWarehousesQuery,
  useRemoveWarehouseMutation,
  useGetWarehouseDetailQuery,
  useUpdateWarehouseMutation,
  useRestoreWarehouseMutation,
  useStockReportMutation,
} = warehouseApi;
export default warehouseApi;
