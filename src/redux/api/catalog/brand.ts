import { createApi } from "@reduxjs/toolkit/query/react";

import customFetchBase from "redux/api/customFetchBase";

import {
  IBrand,
  IBrandInput,
  IBrandPage,
  IBrandParams,
} from "../../../share/types/brand";

const brandApi = createApi({
  reducerPath: "brand",
  baseQuery: customFetchBase,
  tagTypes: ["brand"],
  endpoints: (builder) => ({
    getAllBrands: builder.query<IBrand[], void>({
      query: () => ({
        url: "/catalogs/brands/all",
        method: "GET",
      }),
      transformResponse: ({ data }) => data,

      providesTags: ["brand"],
    }),
    getBrands: builder.query<IBrandPage, IBrandParams>({
      query: (params) => ({
        url: "/catalogs/brands",
        method: "GET",
        params,
      }),
      providesTags: ["brand"],
    }),
    getBrandsByParameter: builder.mutation<IBrand[], IBrandParams>({
      query: (params) => ({
        url: "/catalogs/brands",
        method: "GET",
        params,
      }),
      transformResponse: ({ data }) => data,
    }),
    addBrand: builder.mutation<IBrand[], IBrandInput>({
      query: (data) => {
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
      transformResponse: ({ data }) => data,
      invalidatesTags: ["brand"],
    }),
    getBrand: builder.query<IBrand, string>({
      query: (brandId) => ({
        url: `/catalogs/brands/${brandId}`,
        method: "GET",
      }),
      transformResponse: ({ data }) => data,
    }),
    updateBrand: builder.mutation<IBrand, IBrandInput>({
      query: (data) => {
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
      transformResponse: ({ data }) => data,
    }),
    deleteBrand: builder.mutation<boolean, string>({
      query: (brandId) => ({
        url: `/catalogs/brands/${brandId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["brand"],
      transformResponse: ({ data }) => data,
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
