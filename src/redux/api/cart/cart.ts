import { createApi } from "@reduxjs/toolkit/query/react";

import customFetchBase from "redux/api/customFetchBase";
import { ICartDetail } from "../types";
import { setCart } from "redux/features/auth/cartSlice";

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
      transformResponse: ({ data }) => data,
      async onQueryStarted(args, { dispatch, queryFulfilled, getState }) {
        try {
          const { data } = await queryFulfilled;
          await dispatch(setCart(data));
        } catch (error) {}
      },
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
