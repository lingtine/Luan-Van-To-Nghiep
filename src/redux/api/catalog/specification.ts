import { createApi } from "@reduxjs/toolkit/query/react";

import customFetchBase from "redux/api/customFetchBase";

import {
  ISpecification,
  ISpecificationPage,
  ISpecificationInput,
} from "share/types/specification";

const specificationsApi = createApi({
  reducerPath: "specification",
  baseQuery: customFetchBase,
  tagTypes: ["add", "remove"],
  endpoints: (builder) => ({
    getSpecifications: builder.query<ISpecificationPage, any>({
      query: (params) => ({
        url: "/catalogs/specifications",
        method: "GET",
        params,
      }),
      providesTags: ["add", "remove"],
    }),

    addSpecification: builder.mutation<ISpecification, ISpecificationInput>({
      query: (data) => {
        return {
          url: "/catalogs/specifications",
          method: "POST",
          body: data,
        };
      },
      transformResponse: ({ data }) => ({ ...data }),
      invalidatesTags: ["add"],
    }),

    deleteSpecification: builder.mutation<boolean, string>({
      query: (specificationId) => ({
        url: `/catalogs/specifications/${specificationId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["remove"],
    }),
  }),
});
export const {
  useAddSpecificationMutation,
  useDeleteSpecificationMutation,
  useGetSpecificationsQuery,
} = specificationsApi;

export default specificationsApi;
