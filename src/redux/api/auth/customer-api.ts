import { createApi } from "@reduxjs/toolkit/query/react";
import { setUser } from "redux/features/auth/userSlice";
import customFetchBase from "redux/api/customFetchBase";
const customerApi = createApi({
  reducerPath: "customer",
  baseQuery: customFetchBase,
  tagTypes: ["User"],
  endpoints(builder) {
    return {
      getCustomerDetail: builder.query({
        query: () => {
          return {
            method: "GET",
            url: "customers/customers/info",
          };
        },
        async onQueryStarted(args, { dispatch, queryFulfilled, getState }) {
          try {
            const { data } = await queryFulfilled;
            await dispatch(setUser(data.data));
          } catch (error) {}
        },
      }),
    };
  },
});

export const { useGetCustomerDetailQuery } = customerApi;
export default customerApi;
