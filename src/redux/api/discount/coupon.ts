import { createApi } from "@reduxjs/toolkit/query/react";

import customFetchBase from "../customFetchBase";

import {
  ICoupon,
  ICouponInput,
  ICouponPage,
  ICouponParams,
} from "share/types/coupon";

const couponApi = createApi({
  reducerPath: "coupon",
  baseQuery: customFetchBase,
  tagTypes: ["add", "remove", "change-status"],
  endpoints: (build) => ({
    getCoupons: build.query<ICouponPage, ICouponParams>({
      query: (params) => ({
        url: "/discounts/coupons",
        method: "GET",
        params,
      }),

      providesTags: ["add", "remove", "change-status"],
    }),

    createCoupon: build.mutation<ICoupon, ICouponInput>({
      query: (data) => ({
        url: "/discounts/coupons",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["add"],
      transformResponse: ({ data }) => ({ ...data }),
    }),

    removeCoupon: build.mutation<boolean, string>({
      query: (couponId) => ({
        url: `/discounts/coupons/${couponId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["remove"],
      transformResponse: ({ data }) => ({ ...data }),
    }),

    changeStatusCoupon: build.mutation<ICoupon, string>({
      query: (couponId) => ({
        url: `/discounts/discounts/${couponId}/update-status`,
        method: "PUT",
      }),
      invalidatesTags: ["change-status"],
      transformResponse: ({ data }) => ({ ...data }),
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
