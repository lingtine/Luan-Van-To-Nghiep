import { createApi } from "@reduxjs/toolkit/query/react";

import customFetchBase from "redux/api/customFetchBase";

import {
  ICategory,
  ICategoryInput,
  ICategoryPage,
  ICategoryParams,
} from "share/types/category";

const categoryApi = createApi({
  reducerPath: "category",
  baseQuery: customFetchBase,
  tagTypes: ["ADD", "DELETE", "UPDATE"],
  endpoints: (builder) => ({
    getAllCategories: builder.query<ICategory[], void>({
      query: () => ({
        url: "/catalogs/categories/all",
        method: "GET",
      }),
      transformResponse: ({ data }) => data,
    }),
    getCategories: builder.query<ICategoryPage, ICategoryParams>({
      query: (params) => ({
        url: "/catalogs/categories",
        method: "GET",
        params,
      }),

      providesTags: ["ADD", "UPDATE", "DELETE"],
    }),
    getCategoriesByParameters: builder.mutation<ICategory[], ICategoryParams>({
      query: (params) => ({
        url: "/catalogs/categories",
        method: "GET",
        params: params,
      }),
      transformResponse: ({ data }) => data,
    }),
    addCategory: builder.mutation<ICategory, ICategoryInput>({
      query: (data) => {
        return {
          url: "/catalogs/categories",
          method: "POST",
          body: data,
        };
      },
      transformResponse: ({ data }) => data,
      invalidatesTags: ["ADD"],
    }),
    getCategory: builder.query<ICategory, string>({
      query: (categoryId) => ({
        url: `/catalogs/categories/${categoryId}`,
        method: "GET",
      }),
      transformResponse: ({ data }) => data,
    }),
    updateCategory: builder.mutation<ICategory, ICategoryInput>({
      query: ({ id, ...rest }) => {
        return {
          url: `/catalogs/categories/${id}`,
          method: "PUT",
          body: rest,
        };
      },
      invalidatesTags: ["UPDATE"],
      transformResponse: ({ data }) => data,
    }),
    deleteCategory: builder.mutation<boolean, string>({
      query: (categoryId) => ({
        url: `/catalogs/categories/${categoryId}`,
        method: "DELETE",
      }),
      transformResponse: ({ data }) => data,
      invalidatesTags: ["DELETE"],
    }),
  }),
});
export const {
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useGetAllCategoriesQuery,
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useUpdateCategoryMutation,
  useGetCategoriesByParametersMutation,
} = categoryApi;

export default categoryApi;
