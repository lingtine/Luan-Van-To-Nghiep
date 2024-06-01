import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "redux/api/customFetchBase";
import { IProductReview, IReviewRequest } from "../types";

const reviewApi = createApi({
  reducerPath: "reviewProduct",
  baseQuery: customFetchBase,
  tagTypes: ["ADD", "UPDATE", "DELETE"],
  endpoints: (builder) => ({
    addReviewProduct: builder.mutation({
      query: (data: IReviewRequest) => {
        const bodyFormData = new FormData();

        bodyFormData.append("ProductId", data.productId);
        bodyFormData.append("NumberOfStar", data.numberOfStar.toString());
        bodyFormData.append("Comment", data.comment);

        if (data.attachments) {
          for (const element of data.attachments) {
            bodyFormData.append("Attachments", element);
          }
        }
        return {
          url: `/catalogs/reviews`,
          method: "POST",
          body: bodyFormData,
          formData: true,
        };
      },
      invalidatesTags: ["ADD"],
    }),

    updateReviewProduct: builder.mutation({
      query: ({
        reviewId,
        ...rest
      }: {
        reviewId: string;
        numberOfStar: number;
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
      query: ({
        productId,
        params,
      }: {
        productId: string;
        params: {
          pageIndex: number;
          pageSize: number;
        };
      }) => ({
        url: `/catalogs/reviews/${productId}`,
        method: "GET",
        params,
      }),
      providesTags: ["ADD", "DELETE", "UPDATE"],
      transformResponse: (response: {
        data: IProductReview[];
        pageIndex: number;
        pageSize: number;
        totalCount: number;
      }) => response,
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
