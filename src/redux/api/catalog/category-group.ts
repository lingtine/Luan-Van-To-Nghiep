import { createApi } from "@reduxjs/toolkit/query/react";

import customFetchBase from "redux/api/customFetchBase";

interface CategoryGroup {
  categoryGroupId?: string;
  name: string;
  description: string;
}

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
      transformResponse: (response: { data: [] }, meta, arg) => response.data,
    }),
    getCategoryGroups: builder.query({
      query: () => ({
        url: "/catalogs/category-groups",
        method: "GET",
      }),
      providesTags: ["category-group"],
      transformResponse: (response: { data: {}[] }, meta, arg) => response.data,
    }),
    addCategoryGroup: builder.mutation({
      query: (data: CategoryGroup) => {
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
