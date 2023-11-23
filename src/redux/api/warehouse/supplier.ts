import customFetchBase from "../customFetchBase";

import { createApi } from "@reduxjs/toolkit/query/react";

import { ISupplier } from "../types";

const supplierApi = createApi({
  reducerPath: "supplier",
  baseQuery: customFetchBase,
  tagTypes: ["add", "remove"],
  endpoints: (build) => ({
    getSuppliers: build.query({
      query: () => ({
        url: "/warehouses/suppliers",
        method: "GET",
      }),
      providesTags: ["add", "remove"],
      transformResponse: (response: { data: ISupplier[] }) => response.data,
    }),
    createSupplier: build.mutation({
      query: ({ id, ...ref }: ISupplier) => ({
        url: "/warehouses/suppliers",
        method: "POST",
        body: ref,
      }),
      invalidatesTags: ["add"],
    }),
    removeSupplier: build.mutation({
      query: (supplierId: string) => ({
        url: `/warehouses/suppliers/${supplierId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["remove"],
    }),
  }),
});

export const {
  useGetSuppliersQuery,
  useCreateSupplierMutation,
  useRemoveSupplierMutation,
} = supplierApi;
export default supplierApi;
