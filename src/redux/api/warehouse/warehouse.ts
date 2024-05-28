import customFetchBase from "../customFetchBase";

import { createApi } from "@reduxjs/toolkit/query/react";

import { IWarehouse, IWarehouseInput } from "../types";

const warehouseApi = createApi({
  reducerPath: "warehouse",
  baseQuery: customFetchBase,
  tagTypes: ["add", "remove"],
  endpoints: (build) => ({
    getWarehouses: build.query({
      query: (params) => ({
        url: "/warehouses/warehouses",
        method: "GET",
        params,
      }),
      providesTags: ["add", "remove"],
      transformResponse: (response: {
        data: IWarehouse[];
        pageIndex: number;
        pageSize: number;
        totalCount: number;
      }) => response,
    }),
    createWarehouse: build.mutation({
      query: (data: IWarehouseInput) => ({
        url: "/warehouses/warehouses",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["add"],
    }),
    removeWarehouse: build.mutation({
      query: (warehouseId: string) => ({
        url: `/warehouses/warehouses/${warehouseId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["remove"],
    }),
  }),
});

export const {
  useCreateWarehouseMutation,
  useGetWarehousesQuery,
  useRemoveWarehouseMutation,
} = warehouseApi;
export default warehouseApi;
