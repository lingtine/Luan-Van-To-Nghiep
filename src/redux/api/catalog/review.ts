import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "redux/api/customFetchBase";

const reviewApi = createApi({
  reducerPath: "reviewProduct",
  baseQuery: customFetchBase,
  tagTypes: ["ADD", "UPDATE", "DELETE"],
  endpoints: (builder) => ({
    addReviewProduct: builder.mutation({
      query: (data: {
        productId: string;
        numberOfStar: number;
        comment: string;
        imageUrls: string;
      }) => ({
        url: "/catalogs/reviews",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ADD"],
    }),
    updateReviewProduct: builder.mutation({
      query: ({
        reviewId,
        ...rest
      }: {
        reviewId: string;
        numberOfStar: Number;
        comment: string;
        imageUrls: string;
      }) => ({
        url: `/catalogs/reviews/${reviewId}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: ["UPDATE"],
    }),
    removeReviewProduct: builder.mutation({
      query: (reviewsId) => ({
        url: `/catalogs/reviews/${reviewsId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["DELETE"],
    }),

    getReviewsByProducts: builder.query({
      query: (productId: string) => ({
        url: `/catalogs/reviews/${productId}`,
        method: "GET",
      }),
      providesTags: ["ADD", "DELETE", "UPDATE"],
    }),
  }),
});

export const {
  useAddReviewProductMutation,
  useGetReviewsByProductsQuery,
  useRemoveReviewProductMutation,
  useUpdateReviewProductMutation,
} = reviewApi;

export default reviewApi;
