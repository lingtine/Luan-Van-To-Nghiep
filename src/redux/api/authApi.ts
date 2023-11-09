import { createApi } from "@reduxjs/toolkit/query/react";
import { jwtDecode } from "jwt-decode";
import { changeAuth } from "redux/features/auth/authSlice";
import employeeApi from "./employeeApi";

import customFetchBase from "redux/api/customFetchBase";
const authApi = createApi({
  reducerPath: "auth",
  baseQuery: customFetchBase,
  endpoints(builder) {
    return {
      login: builder.mutation({
        query: (data) => {
          return {
            url: "auths/auth/login",
            method: "POST",
            body: data,
          };
        },
        transformResponse: ({ data }) => {
          return {
            ...data,
          };
        },
        async onQueryStarted(args, { dispatch, queryFulfilled }) {
          try {
            const { data } = await queryFulfilled;

            await dispatch(changeAuth(data));
            let jwt = jwtDecode(data.accessToken);
            if (jwt) {
              await dispatch(employeeApi.endpoints.getEmployee.initiate(null));
            }
          } catch (error) {}
        },
      }),

      register: builder.mutation({
        query: (data) => {
          return {
            url: "/register",
            method: "POST",
            body: data,
          };
        },
      }),
    };
  },
});

export default authApi;
export const { useLoginMutation, useRegisterMutation } = authApi;
