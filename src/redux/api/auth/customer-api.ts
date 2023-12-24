import { createApi } from "@reduxjs/toolkit/query/react";
import { setUser } from "redux/features/auth/userSlice";
import customFetchBase from "redux/api/customFetchBase";
import { IUserDetail, ICustomerDetail, IDeliveryInfo } from "../types";

const customerApi = createApi({
  reducerPath: "customer",
  baseQuery: customFetchBase,

  tagTypes: [
    "User",
    "add-deliveryInfo",
    "remove-deliveryInfo",
    "change-deliveryInfo-default",
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

      getCustomerDetail: builder.query({
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

      addDeliveryInfo: builder.mutation({
        query: ({ id, ...rest }: IDeliveryInfo) => ({
          url: "/customers/customers/delivery-infos",
          method: "POST",
          body: rest,
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
      getTotalCustomer: builder.query({
        query: () => ({
          url: "/customers/customers/CountCustomer",
          method: "GET",
        }),
      }),
    };
  },
});

export const {
  useGetCustomersQuery,
  useGetCustomerDetailQuery,
  useAddDeliveryInfoMutation,
  useChangeDeliveryInfoDefaultMutation,
  useRemoveDeliveryInfoMutation,
  useGetTotalCustomerQuery,
} = customerApi;
export default customerApi;
