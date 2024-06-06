import { createApi } from "@reduxjs/toolkit/query/react";

import customFetchBase from "redux/api/customFetchBase";
import {
  ICategoryGroup,
  ICategoryGroupInput,
  ICategoryGroupPage,
  ICategoryGroupParams,
} from "../../../share/types/category-group";

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
    getCategoryGroups: builder.query<ICategoryGroupPage, ICategoryGroupParams>({
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
    addCategoryGroup: builder.mutation<ICategoryGroup, ICategoryGroupInput>({
      query: (data) => {
        return {
          url: "/catalogs/category-groups",
          method: "POST",
          body: data,
        };
      },
      transformResponse: ({ data }) => ({ ...data }),
      invalidatesTags: ["category-group"],
    }),

    deleteCategoryGroup: builder.mutation<boolean, string>({
      query: (categoryGroupId) => ({
        url: `/catalogs/category-groups/${categoryGroupId}`,
        method: "DELETE",
      }),
      transformResponse: ({ data }) => ({ ...data }),
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
