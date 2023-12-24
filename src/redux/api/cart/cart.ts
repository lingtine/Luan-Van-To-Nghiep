import { createApi } from "@reduxjs/toolkit/query/react";

import customFetchBase from "redux/api/customFetchBase";
import { ICartDetail } from "../types";

const cartApi = createApi({
  reducerPath: "cart",
  baseQuery: customFetchBase,
  tagTypes: ["update", "delete", "add"],
  endpoints: (builder) => ({
    getDetailCart: builder.query({
      query: () => ({
        url: "/orders/carts/detail",
        method: "GET",
      }),
      providesTags: ["add", "delete", "update"],
      transformResponse: (response: { data: ICartDetail }) => response.data,
    }),
    addToCart: builder.mutation({
      query: ({
        ...rest
      }: {
        productId: string;
        productName: string;
        quantity: number;
        unitPrice: number;
      }) => {
        const product = {
          productId: rest.productId,
          productName: rest.productName,
          quantity: rest.quantity,
          unitPrice: rest.unitPrice,
        };

        return {
          url: `/orders/carts/add-items`,
          method: "PUT",
          body: product,
        };
      },
      invalidatesTags: ["add"],
    }),

    updateProductQuality: builder.mutation({
      query: (
        data: {
          productId: string;
          productName: string;
          quantity: number;
          unitPrice: number;
        }[]
      ) => {
        return {
          method: "PUT",
          url: "orders/carts/",
          body: data,
        };
      },
      invalidatesTags: ["update"],
    }),
    deleteItems: builder.mutation({
      query: (productId: string) => ({
        url: `/orders/carts/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["delete"],
    }),
  }),
});
export const {
  useAddToCartMutation,
  useGetDetailCartQuery,
  useDeleteItemsMutation,
  useUpdateProductQualityMutation,
} = cartApi;

export default cartApi;
