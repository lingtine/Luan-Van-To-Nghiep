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
  tagTypes: ["remove", "update", "add"],
  endpoints: (builder) => ({
    getAllCategoryGroups: builder.query<ICategoryGroup[], void>({
      query: () => ({
        url: "/catalogs/category-groups/all",
        method: "GET",
      }),
      transformResponse: ({ data }) => ({ ...data }),
    }),
    getCategoryGroups: builder.query<ICategoryGroupPage, ICategoryGroupParams>({
      query: (params) => ({
        url: "/catalogs/category-groups",
        method: "GET",
        params,
      }),
      providesTags: ["remove", "update", "add"],
    }),
    getCategoryGroup: builder.query<ICategoryGroup, string>({
      query: (categoryId) => ({
        url: `/catalogs/category-groups/${categoryId}`,
        method: "GET",
      }),
      transformResponse: ({ data }) => ({ ...data }),
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
      invalidatesTags: ["add"],
    }),

    deleteCategoryGroup: builder.mutation<boolean, string>({
      query: (categoryGroupId) => ({
        url: `/catalogs/category-groups/${categoryGroupId}`,
        method: "DELETE",
      }),
      transformResponse: ({ data }) => ({ ...data }),
      invalidatesTags: ["remove"],
    }),
    updateCategoryGroup: builder.mutation<ICategoryGroup, ICategoryGroupInput>({
      query: (data) => {
        return {
          url: `/catalogs/category-groups/${data.id}`,
          body: data,
          method: "PUT",
        };
      },
      invalidatesTags: ["update"],
      transformResponse: ({ data }) => ({ ...data }),
    }),
  }),
});
export const {
  useAddCategoryGroupMutation,
  useDeleteCategoryGroupMutation,
  useGetAllCategoryGroupsQuery,
  useGetCategoryGroupsQuery,
  useGetCategoryGroupQuery,
  useUpdateCategoryGroupMutation,
} = categoryGroupApi;

export default categoryGroupApi;
