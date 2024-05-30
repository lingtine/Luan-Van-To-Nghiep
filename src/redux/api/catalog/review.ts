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
        var bodyFormData = new FormData();

        bodyFormData.append("ProductId", data.productId);
        bodyFormData.append("NumberOfStar", data.numberOfStar.toString());
        bodyFormData.append("Comment", data.comment);
        
        if (data.attachments) {
          for (let i = 0; i < data.attachments.length; i++) {
            bodyFormData.append("Attachments", data.attachments[i]);
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
      transformResponse: (response: { data: IProductReview[] }) =>
        // TODO
        response.data || response,
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
