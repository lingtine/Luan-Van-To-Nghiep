import { createApi } from "@reduxjs/toolkit/query/react";

import customFetchBase from "redux/api/customFetchBase";

import { IBrand, IBrandInput } from "../types";

const brandApi = createApi({
  reducerPath: "brand",
  baseQuery: customFetchBase,
  tagTypes: ["brand"],
  endpoints: (builder) => ({
    getAllBrands: builder.query({
      query: () => ({
        url: "/catalogs/brands/all",
        method: "GET",
      }),
      transformResponse: (response: { data: IBrand[] }) => response.data,

      providesTags: ["brand"],
    }),
    getBrands: builder.query({
      query: (params) => ({
        url: "/catalogs/brands",
        method: "GET",
        params,
      }),
      providesTags: ["brand"],
      transformResponse: (response: {
        data: IBrand[];
        pageIndex: number;
        pageSize: number;
        totalCount: number;
      }) => response,
    }),
    getBrandsByParameter: builder.mutation({
      query: (params) => ({
        url: "/catalogs/brands",
        method: "GET",
        params,
      }),
      transformResponse: (response: { data: IBrand[] }) => response.data,
    }),
    addBrand: builder.mutation({
      query: (data: IBrandInput) => {
        var bodyFormData = new FormData();
        bodyFormData.append("Name", data.name);
        bodyFormData.append("Description", data.description);
        bodyFormData.append("Image", data.image);
        return {
          url: "/catalogs/brands",
          method: "POST",

          body: bodyFormData,
          formData: true,
        };
      },
      invalidatesTags: ["brand"],
    }),
    getBrand: builder.query({
      query: (brandId: string) => ({
        url: `/catalogs/brands/${brandId}`,
        method: "GET",
      }),
    }),
    updateBrand: builder.mutation({
      query: (data: IBrandInput) => {
        var bodyFormData = new FormData();
        bodyFormData.append("Name", data.name);
        bodyFormData.append("Description", data.description);
        bodyFormData.append("Image", data.image);
        return {
          url: `/catalogs/brands/${data.id}`,
          method: "PUT",
          headers: {
            "Content-Type": "multipart/form-data;",
          },
          body: {
            data: bodyFormData,
          },
          formData: true,
        };
      },
    }),
    deleteBrand: builder.mutation({
      query: (brandId: string) => ({
        url: `/catalogs/brands/${brandId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["brand"],
    }),
  }),
});
export const {
  useAddBrandMutation,
  useDeleteBrandMutation,
  useGetAllBrandsQuery,
  useGetBrandQuery,
  useGetBrandsQuery,
  useUpdateBrandMutation,
  useGetBrandsByParameterMutation,
} = brandApi;

export default brandApi;
