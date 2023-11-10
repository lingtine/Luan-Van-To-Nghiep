import { useGetEmployeeMutation } from "redux/api/employeeApi";
import { createApi } from "@reduxjs/toolkit/query/react";

import customFetchBase from "redux/api/customFetchBase";

interface Category {
  categoryId?: string;
  categoryGroupId?: string;
  name: string;
  description: string;
}

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
      query: () => ({
        url: "/catalogs/categories",
        method: "GET",
      }),
      transformResponse: (response: { data: {}[] }) => response.data,
      providesTags: ["category"],
    }),
    addCategory: builder.mutation({
      query: (data: Category) => {
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
      query: ({ categoryId, ...rest }: Category) => {
        return {
          url: `/catalogs/categories/${categoryId}`,
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
} = categoryApi;

export default categoryApi;
