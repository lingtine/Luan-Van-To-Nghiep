import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "../customFetchBase";
import {
  IAddFilter,
  IFilter,
  IFilterOfGroup,
  IFilterPage,
  IParamsFilter,
} from "share/types/filter";

const filterApi = createApi({
  reducerPath: "filter",
  baseQuery: customFetchBase,
  tagTypes: ["add-filter", "update-filter"],
  endpoints: (builder) => ({
    getFilters: builder.query<IFilterPage, IParamsFilter>({
      query: (params) => ({
        url: `/catalogs/filters`,
        method: "GET",
        params,
      }),
    }),
    getFilterByGroupId: builder.query<IFilterOfGroup, string>({
      query: (groupId) => ({
        url: `/catalogs/filters/${groupId}`,
        method: "GET",
      }),
      transformResponse: ({ data }) => data,
      providesTags: ["add-filter", "update-filter"],
    }),
    addFilter: builder.mutation<IFilter, IAddFilter>({
      query: (filter) => ({
        url: `/catalogs/filters`,
        method: "POST",
        body: filter,
      }),
      invalidatesTags: ["add-filter"],
    }),
    updateFilter: builder.mutation<IFilter, IAddFilter>({
      query: (filter) => ({
        url: `/catalogs/filters`,
        method: "PUT",
        body: filter,
      }),
      invalidatesTags: ["update-filter"],
    }),
    deleteFilter: builder.mutation({
      query: (id) => ({
        url: `/catalogs/filters/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetFiltersQuery,
  useGetFilterByGroupIdQuery,
  useAddFilterMutation,
  useUpdateFilterMutation,
  useDeleteFilterMutation
} = filterApi;

export default filterApi;
