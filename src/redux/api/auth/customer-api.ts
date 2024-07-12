import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "redux/api/customFetchBase";
import cartApi from "../cart/cart";
import { setUser } from "redux/features/auth/userSlice";
import {
  IUserDetail,
  IDeliveryInput,
  ICustomerDetail,
  IWishlistProduct,
  IUpdateCustomer,
} from "../types";
const customerApi = createApi({
  reducerPath: "customer",
  baseQuery: customFetchBase,

  tagTypes: [
    "User",
    "add-deliveryInfo",
    "remove-deliveryInfo",
    "change-deliveryInfo-default",
    "add-wishlist",
    "delete-wishlist",
    "get-wishlist",
  ],
  endpoints(builder) {
    return {
      getCustomers: builder.query({
        query: (params) => ({
          url: "/customers/customers",
          method: "GET",
          params,
        }),

        transformResponse: (response: {
          data: IUserDetail[];
          pageIndex: number;
          pageSize: number;
          totalCount: number;
        }) => response,
      }),

      getCustomerDetail: builder.query<any, void>({
        query: () => {
          return {
            method: "GET",
            url: "customers/customers/info",
          };
        },

        providesTags: [
          "add-deliveryInfo",
          "add-deliveryInfo",
          "remove-deliveryInfo",
        ],
        transformResponse: (response: {
          data: ICustomerDetail;
          pageIndex: number;
          pageSize: number;
          totalCount: number;
        }) => response.data,

        async onQueryStarted(args, { dispatch, queryFulfilled, getState }) {
          try {
            const { data } = await queryFulfilled;
            await dispatch(setUser(data));
          } catch (error) {}
        },
      }),

      getCustomer: builder.mutation<ICustomerDetail, void>({
        query: () => {
          return {
            method: "GET",
            url: "customers/customers/info",
          };
        },
        transformResponse: ({ data }) => data,
        async onQueryStarted(args, { dispatch, queryFulfilled, getState }) {
          try {
            const { data } = await queryFulfilled;
            await dispatch(cartApi.endpoints.getDetailCart.initiate());
            await dispatch(setUser(data));
          } catch (error) {}
        },
      }),

      addDeliveryInfo: builder.mutation({
        query: (data: IDeliveryInput) => ({
          url: "/customers/customers/delivery-infos",
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["add-deliveryInfo"],
      }),

      changeDeliveryInfoDefault: builder.mutation({
        query: (deliveryInfoId: string) => ({
          url: `/customers/customers/delivery-infos/${deliveryInfoId}`,
          method: "PATCH",
        }),

        invalidatesTags: ["change-deliveryInfo-default"],
      }),

      removeDeliveryInfo: builder.mutation({
        query: (deliveryInfoId: string) => ({
          url: `/customers/customers/delivery-infos/${deliveryInfoId}`,
          method: "DELETE",
        }),

        invalidatesTags: ["remove-deliveryInfo"],
      }),

      getTotalCustomer: builder.query<any, void>({
        query: () => ({
          url: "/customers/customers/CountCustomer",
          method: "GET",
        }),
      }),

      addWishlist: builder.mutation({
        query: (productId: string) => ({
          url: `/customers/customers/wishlist/${productId}`,
          method: "POST",
        }),

        invalidatesTags: ["add-wishlist"],
      }),

      deleteWishlist: builder.mutation({
        query: (productId: string) => ({
          url: `/customers/customers/wishlist/${productId}`,
          method: "DELETE",
        }),

        invalidatesTags: ["delete-wishlist"],
      }),

      getWishlist: builder.query({
        query: () => ({
          url: "/customers/customers/wishlist",
          method: "GET",
        }),

        transformResponse: (response: { data: IWishlistProduct[] }) =>
          response.data,

        providesTags: [
          "User",
          "add-deliveryInfo",
          "remove-deliveryInfo",
          "change-deliveryInfo-default",
          "add-wishlist",
          "delete-wishlist",
          "get-wishlist",
        ],
      }),
      updateProfile: builder.mutation<ICustomerDetail, IUpdateCustomer>({
        query: (data) => {
          const moment = require("moment");

          const bodyFormData = new FormData();
          bodyFormData.append("Name", data.name);
          data.gender && bodyFormData.append("Gender", data.gender);
          data.birthDay &&
            bodyFormData.append(
              "BirthDay",
              moment(data.birthDay).format("DD/MM/YYYY")
            );
          data.phone && bodyFormData.append("Phone", data.phone);
          if (data.image) {
            bodyFormData.append("Image", data.image);
          }

          return {
            url: `/customers/customers/UpdateProfile/${data.id}`,
            method: "PUT",
            body: bodyFormData,
          };
        },
      }),
    };
  },
});

export const {
  useGetCustomersQuery,
  useGetCustomerMutation,
  useGetCustomerDetailQuery,
  useAddDeliveryInfoMutation,
  useChangeDeliveryInfoDefaultMutation,
  useRemoveDeliveryInfoMutation,
  useGetTotalCustomerQuery,
  useAddWishlistMutation,
  useDeleteWishlistMutation,
  useGetWishlistQuery,
  useUpdateProfileMutation,
} = customerApi;
export default customerApi;
