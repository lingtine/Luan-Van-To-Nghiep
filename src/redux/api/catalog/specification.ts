import { createApi } from "@reduxjs/toolkit/query/react";

import customFetchBase from "redux/api/customFetchBase";

import { ISpecification } from "../types";

const specificationsApi = createApi({
  reducerPath: "specification",
  baseQuery: customFetchBase,
  tagTypes: ["add", "remove"],
  endpoints: (builder) => ({
    getSpecifications: builder.query({
      query: (params) => ({
        url: "/catalogs/specifications",
        method: "GET",
        params,
      }),
      providesTags: ["add", "remove"],
      transformResponse: (
        response: {
          data: ISpecification[];
          pageIndex: number;
          pageSize: number;
          totalCount: number;
        },
        meta,
        arg
      ) => response,
    }),

    addSpecification: builder.mutation({
      query: (data: { name: string; description: string }) => {
        return {
          url: "/catalogs/specifications",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["add"],
    }),

    deleteSpecification: builder.mutation({
      query: (specificationId: string) => ({
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
