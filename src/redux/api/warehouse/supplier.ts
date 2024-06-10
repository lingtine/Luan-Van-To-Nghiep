import customFetchBase from "../customFetchBase";

import { createApi } from "@reduxjs/toolkit/query/react";

import { ISupplier, ISupplierInput, ISupplierPage } from "share/types/supplier";

const supplierApi = createApi({
  reducerPath: "supplier",
  baseQuery: customFetchBase,
  tagTypes: ["add", "remove", "update"],
  endpoints: (build) => ({
    getSuppliers: build.query<ISupplierPage, void>({
      query: () => ({
        url: "/warehouses/suppliers",
        method: "GET",
      }),
      providesTags: ["add", "remove", "update"],
    }),
    getSupplierDetail: build.query<ISupplier, string>({
      query: (supplierId) => ({
        url: `/warehouses/suppliers/${supplierId}`,
        method: "GET",
      }),
      transformResponse: ({ data }) => data,
      providesTags: ["add", "remove", "update"],
    }),
    createSupplier: build.mutation<ISupplier, ISupplierInput>({
      query: (data) => ({
        url: "/warehouses/suppliers",
        method: "POST",
        body: data,
      }),
      transformResponse: ({ data }) => data,
      invalidatesTags: ["add"],
    }),
    removeSupplier: build.mutation<boolean, string>({
      query: (supplierId) => ({
        url: `/warehouses/suppliers/${supplierId}`,
        method: "DELETE",
      }),
      transformResponse: ({ data }) => data,
      invalidatesTags: ["remove"],
    }),
    updateSupplier: build.mutation<ISupplier, ISupplierInput>({
      query: (data) => ({
        url: `/warehouses/suppliers/${data.id}`,
        method: "PUT",
        body: data,
      }),
      transformResponse: ({ data }) => data,
      invalidatesTags: ["update"],
    }),
    restoreSupplier: build.mutation<ISupplier, string>({
      query: (supplierId) => ({
        url: `/warehouses/suppliers/restore/${supplierId}`,
        method: "PUT",
      }),
      transformResponse: ({ data }) => data,
      invalidatesTags: ["update"],
    }),
  }),
});

export const {
  useGetSuppliersQuery,
  useCreateSupplierMutation,
  useRemoveSupplierMutation,
  useRestoreSupplierMutation,
  useUpdateSupplierMutation,
} = supplierApi;
export default supplierApi;
