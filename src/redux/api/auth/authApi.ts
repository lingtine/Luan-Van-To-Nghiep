import { createApi } from "@reduxjs/toolkit/query/react";
import { jwtDecode } from "jwt-decode";
import { changeAuth, logout } from "redux/features/auth/authSlice";
import { logout as clearUser } from "redux/features/auth/userSlice";
import { clearCart } from "redux/features/auth/cartSlice";

import cartApi from "../cart/cart";
import customerApi from "./customer-api";
import employeeApi from "../auth/employeeApi";

import customFetchBase from "redux/api/customFetchBase";

import { ILogin, ILogout, IRegister, ILoginRes } from "share/types/auth";
import { ChangePasswordRequest } from "../types";

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
              await dispatch(
                employeeApi.endpoints.getEmployeeDetail.initiate()
              );
            } else {
              if (jwt.role === "Customer") {
                await dispatch(
                  customerApi.endpoints.getCustomerDetail.initiate()
                );
                await dispatch(cartApi.endpoints.getDetailCart.initiate());
              } else if (jwt.role === "Employee") {
                await dispatch(
                  employeeApi.endpoints.getEmployeeDetail.initiate()
                );
              }
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
            dispatch(clearCart());
            dispatch(clearUser());
          } catch (error) {}
        },
      }),
      changePassword: builder.mutation<any, ChangePasswordRequest>({
        query: (data) => {
          return {
            url: "/auths/auth/change-password",
            method: "POST",
            body: data,
          };
        },
      }),
    };
  },
});

export default authApi;
export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useChangePasswordMutation,
} = authApi;
