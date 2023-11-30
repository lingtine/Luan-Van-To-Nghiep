import { createApi } from "@reduxjs/toolkit/query/react";
import { setUser } from "redux/features/auth/userSlice";
import customFetchBase from "redux/api/customFetchBase";
import { IUserDetail } from "../types";

const customerApi = createApi({
  reducerPath: "customer",
  baseQuery: customFetchBase,
  tagTypes: ["User"],
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
        transformResponse: (response: { data: IUserDetail[] }) => response.data,

        async onQueryStarted(args, { dispatch, queryFulfilled, getState }) {
          try {
            const { data } = await queryFulfilled;
            await dispatch(setUser(data));
          } catch (error) {}
        },
      }),
    };
  },
});

export const { useGetCustomersQuery, useGetCustomerDetailQuery } = customerApi;
export default customerApi;
