import customFetchBase from "../customFetchBase";

import { createApi } from "@reduxjs/toolkit/query/react";

import { IStock, IStockInput } from "share/types/stock";

const stockApi = createApi({
  reducerPath: "productStock",
  baseQuery: customFetchBase,
  tagTypes: ["add", "remove", "update"],
  endpoints: (build) => ({
    getProductInStocks: build.query<IStock[], void>({
      query: () => ({
        url: "/warehouses/product-instock",
        method: "GET",
      }),
      providesTags: ["add", "remove", "update"],
      transformResponse: ({ data }) => data,
    }),
    createProductInStock: build.mutation<IStock, IStockInput>({
      query: (data) => ({
        url: "/warehouses/product-instock",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["add"],
    }),
    removeProductStock: build.mutation<boolean, string>({
      query: (stockId) => ({
        url: `/warehouses/product-instock/${stockId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["remove"],
    }),
  }),
});

export const {
  useCreateProductInStockMutation,
  useGetProductInStocksQuery,
  useRemoveProductStockMutation,
} = stockApi;
export default stockApi;
