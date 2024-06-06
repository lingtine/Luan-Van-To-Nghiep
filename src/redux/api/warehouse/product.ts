import customFetchBase from "../customFetchBase";

import { createApi } from "@reduxjs/toolkit/query/react";

import { IProductWarehouse } from "share/types/product";

const productWarehouseApi = createApi({
  reducerPath: "productWarehouse",
  baseQuery: customFetchBase,
  tagTypes: ["add", "remove"],
  endpoints: (build) => ({
    getProductWarehouse: build.query({
      query: (params) => ({
        url: "/warehouses/warehouse-products",
        method: "GET",
        params,
      }),
      providesTags: ["add", "remove"],
      transformResponse: (response: {
        data: IProductWarehouse[];
        pageIndex: number;
        pageSize: number;
        totalCount: number;
      }) => response,
    }),
  }),
});

export const { useGetProductWarehouseQuery } = productWarehouseApi;
export default productWarehouseApi;
