import { createApi } from "@reduxjs/toolkit/query/react";

import customFetchBase from "redux/api/customFetchBase";

import { ICategoryGroup } from "../types";

const categoryGroupApi = createApi({
  reducerPath: "categoryGroup",
  baseQuery: customFetchBase,
  tagTypes: ["category-group", "remove"],
  endpoints: (builder) => ({
    getAllCategoryGroups: builder.query({
      query: () => ({
        url: "/catalogs/category-groups/all",
        method: "GET",
      }),
      providesTags: ["category-group"],
      transformResponse: (response: { data: [ICategoryGroup] }, meta, arg) =>
        response.data,
    }),
    getCategoryGroups: builder.query({
      query: (params) => ({
        url: "/catalogs/category-groups",
        method: "GET",
        params,
      }),
      providesTags: ["category-group"],
      transformResponse: (
        response: {
          data: {}[];
          pageIndex: number;
          pageSize: number;
          totalCount: number;
        },
        meta,
        arg
      ) => response,
    }),
    addCategoryGroup: builder.mutation({
      query: (data: { name: string; description: string }) => {
        return {
          url: "/catalogs/category-groups",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["category-group"],
    }),

    deleteCategoryGroup: builder.mutation({
      query: (categoryGroupId: string) => ({
        url: `/catalogs/category-groups/${categoryGroupId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["category-group"],
    }),
  }),
});
export const {
  useAddCategoryGroupMutation,
  useDeleteCategoryGroupMutation,
  useGetAllCategoryGroupsQuery,
  useGetCategoryGroupsQuery,
} = categoryGroupApi;

export default categoryGroupApi;
