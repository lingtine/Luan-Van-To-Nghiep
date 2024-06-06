import { createApi } from "@reduxjs/toolkit/query/react";

import customFetchBase from "redux/api/customFetchBase";
import { ICartDetail } from "../types";

import { IProductAddToCart } from "share/types/product";

const cartApi = createApi({
  reducerPath: "cart",
  baseQuery: customFetchBase,
  tagTypes: ["update", "delete", "add"],
  endpoints: (builder) => ({
    getDetailCart: builder.query<ICartDetail, void>({
      query: () => ({
        url: "/orders/carts/detail",
        method: "GET",
      }),
      providesTags: ["add", "delete", "update"],
    }),
    addToCart: builder.mutation<any, IProductAddToCart>({
      query: (data) => {
        return {
          url: `/orders/carts/add-items`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["add"],
    }),

    updateProductQuality: builder.mutation<any, IProductAddToCart[]>({
      query: (data) => {
        return {
          method: "PUT",
          url: "orders/carts/",
          body: data,
        };
      },
      invalidatesTags: ["update"],
    }),
    deleteItems: builder.mutation<any, string>({
      query: (productId) => ({
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
