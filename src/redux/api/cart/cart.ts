import { createApi } from "@reduxjs/toolkit/query/react";

import customFetchBase from "redux/api/customFetchBase";
import { IOrder } from "../types";

const cartApi = createApi({
  reducerPath: "cart",
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    getDetailCart: builder.query({
        query: () => ({
            url: "/orders/carts",
            method: "GET",
          }),
    
          transformResponse: (response: { data: any }) => response.data,
    }),
    addToCart: builder.mutation({
      query: ({
        ...rest
      }: {
        productId: string;
        productName: string;
        quantity: any;
        unitPrice: number;
      }) => {
        var bodyFormData = new FormData();
        bodyFormData.append("productId", rest.productId);
        bodyFormData.append("productName", rest.productName);
        bodyFormData.append("quantity", rest.quantity);
        bodyFormData.append("UnitPrice", rest.unitPrice.toString());

        return {
          url: `/orders/carts/add-items`,
          method: "PUT",
          body: bodyFormData,
        };
      },
    }),
    deleteItems: builder.mutation({
      query: (productId: string) => ({
        url: `/orders/carts/${productId}`,
        method: "DELETE",
      }),
    }),
  }),
});
export const { useAddToCartMutation, useGetDetailCartQuery, useDeleteItemsMutation } = cartApi;

export default cartApi;
