import { IUserDetail } from "./../types";
import { createApi } from "@reduxjs/toolkit/query/react";
import { setUser } from "redux/features/auth/userSlice";
import customFetchBase from "redux/api/customFetchBase";

import {
  IEmployee,
  IEmployeeInput,
  IProfileInput,
} from "share/types/employees";

const employeeApi = createApi({
  reducerPath: "employee",
  baseQuery: customFetchBase,
  tagTypes: ["User"],
  endpoints(builder) {
    return {
      getAllEmployees: builder.query<IUserDetail[], void>({
        query: () => {
          return {
            method: "GET",
            url: "employees/employees",
          };
        },
      }),
      getEmployeeDetail: builder.query<IUserDetail, void>({
        query: () => {
          return {
            method: "GET",
            url: "employees/employees/detail",
          };
        },
        transformResponse: ({ data }) => data,
        async onQueryStarted(args, { dispatch, queryFulfilled, getState }) {
          try {
            const { data } = await queryFulfilled;

            await dispatch(setUser(data));
          } catch (error) {}
        },
      }),
      getEmployee: builder.mutation<IUserDetail, void>({
        query: () => {
          return {
            method: "GET",
            url: "employees/employees/detail",
          };
        },
        transformResponse: ({ data }) => data,
        async onQueryStarted(__, { dispatch, queryFulfilled, getState }) {
          try {
            const { data } = await queryFulfilled;
            await dispatch(setUser(data));
          } catch (error) {}
        },
      }),
      createAdmin: builder.mutation<IEmployee, IEmployeeInput>({
        query: (data) => {
          return {
            method: "POST",
            url: "employees/employees/create-admin",
            body: data,
          };
        },
        transformResponse: ({ data }) => data,
      }),
      createEmployee: builder.mutation<IEmployee, IEmployeeInput>({
        query: (data) => {
          return {
            method: "POST",
            url: "employees/employees/create-employee",
            body: data,
          };
        },
        transformResponse: ({ data }) => data,
      }),
      updateProfile: builder.mutation<IEmployee, IProfileInput>({
        query: (data) => {
          const bodyFormData = new FormData();
          bodyFormData.append("Name", data.name);
          bodyFormData.append("Address.Number", data.addressNumber);
          bodyFormData.append("Image", data.image);
          bodyFormData.append("Address.Ward", data.addressWard);
          bodyFormData.append("Address.District", data.addressDistrict);
          bodyFormData.append("Address.City", data.addressCity);
          bodyFormData.append("Phone", data.phone);
          bodyFormData.append("Address.Street", data.addressStress);
          return {
            method: "POST",
            url: "employees/employees/update-profile",
            headers: {
              "Content-Type": "multipart/form-data;",
            },
            body: {
              data: bodyFormData,
            },
            formData: true,
          };
        },
        transformResponse: ({ data }) => data,
      }),
    };
  },
});

export const { useGetEmployeeDetailQuery, useGetEmployeeMutation } =
  employeeApi;
export default employeeApi;
