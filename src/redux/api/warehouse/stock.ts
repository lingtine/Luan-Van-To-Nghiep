import customFetchBase from "../customFetchBase";

import { createApi } from "@reduxjs/toolkit/query/react";

import { IStock } from "../types";

const stockApi = createApi({
  reducerPath: "productStock",
  baseQuery: customFetchBase,
  tagTypes: ["add", "remove"],
  endpoints: (build) => ({
    getProductStocks: build.query({
      query: () => ({
        url: "/warehouses/product-instock",
        method: "GET",
      }),
      providesTags: ["add", "remove"],
      transformResponse: (response: { data: IStock[] }) => response.data,
    }),
    createProductStock: build.mutation({
      query: ({ id, ...ref }: IStock) => ({
        url: "/warehouses/product-instock",
        method: "POST",
        body: ref,
      }),
      invalidatesTags: ["add"],
    }),
    removeProductStock: build.mutation({
      query: (stockId: string) => ({
        url: `/warehouses/product-instock/${stockId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["remove"],
    }),
  }),
});

export const {
  useCreateProductStockMutation,
  useGetProductStocksQuery,
  useRemoveProductStockMutation,
} = stockApi;
export default stockApi;
