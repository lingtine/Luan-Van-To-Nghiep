import customFetchBase from "../customFetchBase";

import { createApi } from "@reduxjs/toolkit/query/react";

import { IStock } from "../types";

const productWarehouseApi = createApi({
  reducerPath: "productWarehouse",
  baseQuery: customFetchBase,
  tagTypes: ["add", "remove"],
  endpoints: (build) => ({
    getProductWarehouse: build.query({
      query: () => ({
        url: "/warehouses/warehouse-products",
        method: "GET",
      }),
      providesTags: ["add", "remove"],
      transformResponse: (response: { data: any }) => response.data,
    }),
  }),
});

export const {} = productWarehouseApi;
export default productWarehouseApi;
