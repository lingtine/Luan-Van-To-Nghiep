import { createApi } from "@reduxjs/toolkit/query/react";

import customFetchBase from "redux/api/customFetchBase";

import {
  ISpecification,
  ISpecificationPage,
  ISpecificationInput,
  ISpecificationParams,
} from "share/types/specification";

const specificationsApi = createApi({
  reducerPath: "specification",
  baseQuery: customFetchBase,
  tagTypes: ["add", "remove", "update"],
  endpoints: (builder) => ({
    getSpecifications: builder.query<ISpecificationPage, ISpecificationParams>({
      query: (params) => ({
        url: "/catalogs/specifications",
        method: "GET",
        params,
      }),
      providesTags: ["add", "remove", "update"],
    }),
    getSpecificationDetail: builder.query<ISpecification, string>({
      query: (specificationId) => ({
        url: `/catalogs/specifications/${specificationId}`,
        method: "GET",
      }),
      transformResponse: ({ data }) => data,
    }),

    addSpecification: builder.mutation<ISpecification, ISpecificationInput>({
      query: (data) => {
        return {
          url: "/catalogs/specifications",
          method: "POST",
          body: data,
        };
      },
      transformResponse: ({ data }) => data,
      invalidatesTags: ["add"],
    }),
    addMultiSpecification: builder.mutation<
      ISpecification,
      ISpecificationInput[]
    >({
      query: (data) => {
        return {
          url: "/catalogs/specifications/AddMany",
          method: "POST",
          body: data,
        };
      },
      transformResponse: ({ data }) => data,
      invalidatesTags: ["add"],
    }),

    deleteSpecification: builder.mutation<boolean, string>({
      query: (specificationId) => ({
        url: `/catalogs/specifications/${specificationId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["remove"],
    }),
    updateSpecification: builder.mutation<ISpecification, ISpecificationInput>({
      query: ({ id, ...rest }) => {
        return {
          url: `/catalogs/specifications/${id}`,
          method: "PUT",
          data: rest,
        };
      },
      invalidatesTags: ["update"],
      transformResponse: ({ data }) => data,
    }),
  }),
});
export const {
  useAddSpecificationMutation,
  useDeleteSpecificationMutation,
  useGetSpecificationsQuery,
  useAddMultiSpecificationMutation,
  useGetSpecificationDetailQuery,
  useUpdateSpecificationMutation,
} = specificationsApi;

export default specificationsApi;
