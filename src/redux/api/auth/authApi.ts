import { createApi } from "@reduxjs/toolkit/query/react";
import { jwtDecode } from "jwt-decode";
import { changeAuth } from "redux/features/auth/authSlice";
import { logout } from "redux/features/auth/userSlice";
import { logout as logoutUser } from "redux/features/auth/userSlice";
import customerApi from "./customer-api";
import employeeApi from "../auth/employeeApi";

import customFetchBase from "redux/api/customFetchBase";

import { ILogin, ILogout, IRegister, ILoginRes } from "share/types/auth";

const authApi = createApi({
  reducerPath: "auth",
  baseQuery: customFetchBase,
  endpoints(builder) {
    return {
      login: builder.mutation<ILoginRes, ILogin>({
        query: (data) => {
          return {
            url: "auths/auth/login",
            method: "POST",
            body: data,
          };
        },
        transformResponse: ({ data }) => {
          return { ...data };
        },
        async onQueryStarted(args, { dispatch, queryFulfilled }) {
          try {
            const { data } = await queryFulfilled;

            await dispatch(changeAuth(data));
            let jwt = jwtDecode(data.accessToken) as {
              role: [] | string;
            };

            if (Array.isArray(jwt.role)) {
              await dispatch(employeeApi.endpoints.getEmployee.initiate(null));
            } else if (jwt.role) {
              await dispatch(
                customerApi.endpoints.getCustomerDetail.initiate(null)
              );
            }
          } catch (error) {}
        },
      }),

      register: builder.mutation<any, IRegister>({
        query: (data: IRegister) => {
          return {
            url: "/auths/auth/registerV2",
            method: "POST",
            body: data,
          };
        },
      }),
      logout: builder.mutation<any, ILogout>({
        query: (data) => {
          return {
            url: "/auths/auth/logout",
            method: "POST",
            body: data,
          };
        },

        async onQueryStarted(args, { dispatch, queryFulfilled }) {
          try {
            await queryFulfilled;
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
