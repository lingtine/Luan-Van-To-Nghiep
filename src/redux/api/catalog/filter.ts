import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "../customFetchBase";
import { IAddFilter, IFilter } from "../types";

const filterApi = createApi({
  reducerPath: "filter",
  baseQuery: customFetchBase,
  tagTypes: ["add-filter", "update-filter"],
  endpoints: (builder) => ({
    getFilters: builder.query({
      query: (params) => ({
        url: `/catalogs/filters`,
        method: "GET",
        params,
      }),
      transformResponse: (response: {
        data: IFilter[];
        pageIndex: number;
        pageSize: number;
        totalCount: number;
      }) => {
        return response;
      },
    }),
    getFilterByGroupId: builder.query({
      query: (groupId: string) => ({
        url: `/catalogs/filters/${groupId}`,
        method: "GET",
      }),
      transformResponse: (response: { filters: IFilter[] }) =>
        response.filters || [],
      providesTags: ["add-filter", "update-filter"],
    }),
    addFilter: builder.mutation({
      query: (filter: IAddFilter) => ({
        url: `/catalogs/filters`,
        method: "POST",
        body: filter,
      }),
      invalidatesTags: ["add-filter"],
    }),
    updateFilter: builder.mutation({
      query: (filter: IAddFilter) => ({
        url: `/catalogs/filters`,
        method: "PUT",
        body: filter,
      }),
      invalidatesTags: ["update-filter"],
    }),
  }),
});

export const {
  useGetFiltersQuery,
  useGetFilterByGroupIdQuery,
  useAddFilterMutation,
  useUpdateFilterMutation,
} = filterApi;

export default filterApi;
