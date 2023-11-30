import { createApi } from "@reduxjs/toolkit/query/react";

import customFetchBase from "../customFetchBase";

import { IDiscountEvent } from "../types";

const discountEventApi = createApi({
  reducerPath: "discountEvent",
  baseQuery: customFetchBase,
  tagTypes: ["remove", "add", "change-status"],
  endpoints: (build) => ({
    getDiscountEvents: build.query({
      query: (params) => ({
        url: "/discounts/discounts",
        method: "GET",
        params,
      }),
      providesTags: ["add", "change-status", "remove"],
      transformResponse: (response: {
        data: IDiscountEvent[];
        pageIndex: number;
        pageSize: number;
        totalCount: number;
      }) => response,
    }),

    createDiscountEvent: build.mutation({
      query: ({ id, ...rest }: IDiscountEvent) => ({
        url: "/discounts/discounts",
        method: "POST",
        body: rest,
      }),
      invalidatesTags: ["add"],
    }),

    getAllDiscountEvents: build.query({
      query: () => ({
        url: "/discounts/discounts/all",
        method: "GET",
      }),
      providesTags: ["add", "change-status", "remove"],
      transformResponse: (response: { data: IDiscountEvent[] }) =>
        response.data,
    }),

    removeDiscountEvent: build.mutation({
      query: (discountEventId: string) => ({
        url: `/discounts/discounts/${discountEventId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["remove"],
    }),

    changeStatusDiscountEvent: build.mutation({
      query: ({
        discountEventId,
        status,
      }: {
        discountEventId: string;
        status: string;
      }) => ({
        url: `/discounts/discounts/${discountEventId}/${status}`,
        method: "PATCH",
      }),
      invalidatesTags: ["change-status"],
    }),
  }),
});

export const {
  useChangeStatusDiscountEventMutation,
  useCreateDiscountEventMutation,
  useGetAllDiscountEventsQuery,
  useGetDiscountEventsQuery,
  useRemoveDiscountEventMutation,
} = discountEventApi;

export default discountEventApi;
