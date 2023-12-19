import { createApi } from "@reduxjs/toolkit/query/react";

import customFetchBase from "redux/api/customFetchBase";

import { ICategory } from "../types";

const categoryApi = createApi({
  reducerPath: "category",
  baseQuery: customFetchBase,
  tagTypes: ["category"],
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: () => ({
        url: "/catalogs/categories/all",
        method: "GET",
      }),
    }),
    getCategories: builder.query({
      query: (params) => ({
        url: "/catalogs/categories",
        method: "GET",
        params,
      }),
      transformResponse: (response: {
        data: ICategory[];
        pageIndex: number;
        pageSize: number;
        totalCount: number;
      }) => response,
      providesTags: ["category"],
    }),
    getCategoriesByParameters: builder.mutation({
      query: (params) => ({
        url: "/catalogs/categories",
        method: "GET",
        params: params,
      }),
      transformResponse: (response: { data: ICategory[] }) => response.data,
    }),
    addCategory: builder.mutation({
      query: (data: ICategory) => {
        return {
          url: "/catalogs/categories",
          method: "POST",

          body: data,
        };
      },
      invalidatesTags: ["category"],
    }),
    getCategory: builder.query({
      query: (categoryId: string) => ({
        url: `/catalogs/categories/${categoryId}`,
        method: "GET",
      }),
    }),
    updateCategory: builder.mutation({
      query: ({ id, ...rest }: ICategory) => {
        return {
          url: `/catalogs/categories/${id}`,
          method: "PUT",
          body: rest,
        };
      },
    }),
    deleteCategory: builder.mutation({
      query: (categoryId: string) => ({
        url: `/catalogs/categories/${categoryId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["category"],
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
