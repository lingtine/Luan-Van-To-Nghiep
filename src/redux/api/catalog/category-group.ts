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
  endpoints: (builder) => ({
    getAllCategoryGroups: builder.query({
      query: () => ({
        url: "/catalogs/category-groups/all",
        method: "GET",
      }),
    }),
    getCategoryGroups: builder.query({
      query: () => ({
        url: "/catalogs/category-groups",
        method: "GET",
      }),
    }),
    addCategoryGroup: builder.mutation({
      query: (data: CategoryGroup) => {
        return {
          url: "/catalogs/category-groups",
          method: "POST",
          body: data,
        };
      },
    }),

    deleteCategoryGroup: builder.query({
      query: (categoryGroupId: string) => ({
        url: `/catalogs/category-groups/${categoryGroupId}`,
        method: "DELETE",
      }),
    }),
  }),
});
export const {
  useAddCategoryGroupMutation,
  useDeleteCategoryGroupQuery,
  useGetAllCategoryGroupsQuery,
  useGetCategoryGroupsQuery,
} = categoryGroupApi;

export default categoryGroupApi;
