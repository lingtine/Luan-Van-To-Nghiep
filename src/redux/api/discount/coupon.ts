import { createApi } from "@reduxjs/toolkit/query/react";

import customFetchBase from "../customFetchBase";

import { ICoupon } from "../types";

const couponApi = createApi({
  reducerPath: "coupon",
  baseQuery: customFetchBase,
  tagTypes: ["add", "remove", "change-status"],
  endpoints: (build) => ({
    getCoupons: build.query({
      query: () => ({
        url: "/discounts/coupons",
        method: "GET",
      }),

      providesTags: ["add", "remove", "change-status"],
      transformResponse: (response: { data: ICoupon[] }) => response.data,
    }),

    createCoupon: build.mutation({
      query: ({ id, ...rest }: ICoupon) => ({
        url: "/discounts/coupons",
        method: "POST",
        body: rest,
      }),
      invalidatesTags: ["add"],
    }),

    removeCoupon: build.mutation({
      query: (couponId: string) => ({
        url: `/discounts/coupons/${couponId}`,
        method: "DELETE",
      }),

      invalidatesTags: ["remove"],
    }),

    changeStatusCoupon: build.mutation({
      query: (couponId) => ({
        url: `/discounts/discounts/${couponId}/update-status`,
        method: "PUT",
      }),
      invalidatesTags: ["change-status"],
    }),
  }),
});

export const {
  useChangeStatusCouponMutation,
  useCreateCouponMutation,
  useGetCouponsQuery,
  useRemoveCouponMutation,
} = couponApi;

export default couponApi;
