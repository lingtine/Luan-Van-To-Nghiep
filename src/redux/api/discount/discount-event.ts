import { createApi } from "@reduxjs/toolkit/query/react";

import customFetchBase from "../customFetchBase";

import {
  IDiscountEvent,
  IDiscountEventInput,
  IDiscountEventPage,
  IDiscountEventParams,
  DiscountEventStatus,
} from "share/types/discount-event";

const discountEventApi = createApi({
  reducerPath: "discountEvent",
  baseQuery: customFetchBase,
  tagTypes: ["remove", "add", "change-status"],
  endpoints: (build) => ({
    getDiscountEvents: build.query<IDiscountEventPage, IDiscountEventParams>({
      query: (params) => ({
        url: "/discounts/discounts",
        method: "GET",
        params,
      }),
      providesTags: ["add", "change-status", "remove"],
    }),

    createDiscountEvent: build.mutation<IDiscountEvent, IDiscountEventInput>({
      query: (data) => ({
        url: "/discounts/discounts",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["add"],
      transformResponse: ({ data }) => ({ ...data }),
    }),

    getAllDiscountEvents: build.query<IDiscountEvent[], void>({
      query: () => ({
        url: "/discounts/discounts/all",
        method: "GET",
      }),
      providesTags: ["add", "change-status", "remove"],
      transformResponse: ({ data }) => ({ ...data }),
    }),

    removeDiscountEvent: build.mutation<boolean, string>({
      query: (discountEventId) => ({
        url: `/discounts/discounts/${discountEventId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["remove"],
      transformResponse: ({ data }) => ({ ...data }),
    }),

    changeStatusDiscountEvent: build.mutation<
      IDiscountEvent,
      {
        id: string;
        status: DiscountEventStatus;
      }
    >({
      query: ({ id, status }) => ({
        url: `/discounts/discounts/${id}/${status}`,
        method: "PATCH",
      }),
      invalidatesTags: ["change-status"],
      transformResponse: ({ data }) => ({ ...data }),
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
