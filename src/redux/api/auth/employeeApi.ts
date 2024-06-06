import { IUserDetail } from "./../types";
import { createApi } from "@reduxjs/toolkit/query/react";
import { setUser } from "redux/features/auth/userSlice";
import customFetchBase from "redux/api/customFetchBase";
const employeeApi = createApi({
  reducerPath: "employee",
  baseQuery: customFetchBase,
  tagTypes: ["User"],
  endpoints(builder) {
    return {
      getEmployeeDetail: builder.query<IUserDetail[], undefined>({
        query: () => {
          return {
            method: "GET",
            url: "employees/employees/detail",
          };
        },
        transformResponse: ({ data }) => {
          return { ...data };
        },
        async onQueryStarted(args, { dispatch, queryFulfilled, getState }) {
          try {
            const { data } = await queryFulfilled;

            await dispatch(setUser(data));
          } catch (error) {}
        },
      }),
      getEmployee: builder.mutation<IUserDetail[], undefined>({
        query: () => {
          return {
            method: "GET",
            url: "employees/employees/detail",
          };
        },
        transformResponse: ({ data }) => {
          return { ...data };
        },
        async onQueryStarted(__, { dispatch, queryFulfilled, getState }) {
          try {
            const { data } = await queryFulfilled;
            await dispatch(setUser(data));
          } catch (error) {}
        },
      }),
    };
  },
});

export const { useGetEmployeeDetailQuery, useGetEmployeeMutation } =
  employeeApi;
export default employeeApi;
