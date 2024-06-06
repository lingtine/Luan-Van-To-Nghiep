import { createApi } from "@reduxjs/toolkit/query/react";

import customFetchBase from "redux/api/customFetchBase";

import { ICategoryGroup, ICategoryGroupInput } from "../types";

const categoryGroupApi = createApi({
  reducerPath: "categoryGroup",
  baseQuery: customFetchBase,
  tagTypes: ["category-group", "remove"],
  endpoints: (builder) => ({
    getAllCategoryGroups: builder.query<ICategoryGroup[], void>({
      query: () => ({
        url: "/catalogs/category-groups/all",
        method: "GET",
      }),
      providesTags: ["category-group"],
      transformResponse: ({ data }) => ({ ...data }),
    }),
    getCategoryGroups: builder.query<
      {
        data: ICategoryGroup[];
        pageIndex: number;
        pageSize: number;
        totalCount: number;
      },
      any
    >({
      query: (params) => ({
        url: "/catalogs/category-groups",
        method: "GET",
        params,
      }),
      providesTags: ["category-group"],
    }),
    getListCategoryGroups: builder.query({
      query: (categoryId) => ({
        url: `/catalogs/category-groups/${categoryId}`,
        method: "GET",
      }),
      providesTags: ["category-group"],
    }),
    addCategoryGroup: builder.mutation<any, ICategoryGroupInput>({
      query: (data) => {
        return {
          url: "/catalogs/category-groups",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["category-group"],
    }),

    deleteCategoryGroup: builder.mutation<any, string>({
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
  useGetListCategoryGroupsQuery,
} = categoryGroupApi;

export default categoryGroupApi;
