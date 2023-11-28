import { createApi } from "@reduxjs/toolkit/query/react";
import { jwtDecode } from "jwt-decode";
import { changeAuth } from "redux/features/auth/authSlice";
import { logout } from "redux/features/auth/userSlice";
import { logout as logoutUser } from "redux/features/auth/userSlice";

import employeeApi from "../auth/employeeApi";

import customFetchBase from "redux/api/customFetchBase";
const authApi = createApi({
  reducerPath: "auth",
  baseQuery: customFetchBase,
  endpoints(builder) {
    return {
      login: builder.mutation({
        query: (data: { email: string; password: string }) => {
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

            console.log("jwt token ", jwt);
            if (jwt) {
              await dispatch(employeeApi.endpoints.getEmployee.initiate(null));
              const jsonData = JSON.stringify(jwt);
              localStorage.setItem('user', jsonData);
            }
          } catch (error) {}
        },
      }),

      register: builder.mutation({
        query: (data) => {
          return {
            url: "/auths/auth/registerV2",
            method: "POST",
            body: data,
          };
        },
      }),
      logout: builder.mutation({
        query: (data) => {
          return {
            url: "/auths/auth/logout",
            method: "POST",
            body: data,
          };
        },

        async onQueryStarted(args, { dispatch, queryFulfilled }) {
          try {
            const { data } = await queryFulfilled;
            dispatch(logout());
            dispatch(logoutUser());
          } catch (error) {}
        },
      }),
    };
  },
});

export default authApi;
export const { useLoginMutation, useRegisterMutation, useLogoutMutation } =
  authApi;
