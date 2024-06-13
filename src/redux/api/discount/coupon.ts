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
      transformResponse: ({ data }) => data,
    }),

    removeCoupon: build.mutation<boolean, string>({
      query: (couponId) => ({
        url: `/discounts/coupons/${couponId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["remove"],
      transformResponse: ({ data }) => data,
    }),

    changeStatusCoupon: build.mutation<ICoupon, string>({
      query: (couponId) => ({
        url: `/discounts/discounts/${couponId}/update-status`,
        method: "PUT",
      }),
      invalidatesTags: ["change-status"],
      transformResponse: ({ data }) => data,
    }),

    getCouponUsed: build.mutation<ICoupon, string>({
      query: (id) => {
        return {
          url: `/coupons/${id}/used`,
          method: "GET",
        };
      },
      transformResponse: ({ data }) => data,
    }),

    getMultiCoupon: build.mutation<ICoupon[], string[]>({
      query: (data) => {
        return {
          url: "/discounts/coupons/GetByIds",
          method: "POST",
          body: data,
        };
      },
      transformResponse: ({ data }) => data,
    }),
    getCouponDetail: build.query<ICoupon, string>({
      query: (id) => ({
        url: `/discounts/coupons/${id}`,
        method: "GET",
      }),
      transformResponse: ({ data }) => data,
    }),
    updateCoupon: build.mutation<ICoupon, ICouponInput>({
      query: ({ id, ...rest }) => ({
        url: `/discounts/coupons/${id}`,
        method: "PUT",
        body: rest,
      }),
      transformResponse: ({ data }) => data,
    }),
  }),
});

export const {
  useChangeStatusCouponMutation,
  useCreateCouponMutation,
  useGetCouponsQuery,
  useRemoveCouponMutation,
  useGetCouponDetailQuery,
  useUpdateCouponMutation,
  useGetCouponUsedMutation,
  useGetMultiCouponMutation,
} = couponApi;

export default couponApi;
