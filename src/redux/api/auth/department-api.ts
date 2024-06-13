import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "../customFetchBase";
import {
  IDepartmentInput,
  IAddEmployeeInput,
  IDepartment,
} from "share/types/department";
const departmentApi = createApi({
  reducerPath: "department",
  baseQuery: customFetchBase,
  endpoints(build) {
    return {
      getAllDepartment: build.query<IDepartment[], void>({
        query: () => {
          return {
            url: "/employees/Department/Get",
            method: "GET",
          };
        },
      }),
      getDepartmentDetail: build.query<IDepartment, string>({
        query: (departmentId) => {
          return {
            url: `/employees/Department/Get/${departmentId}`,
            method: "GET",
          };
        },
      }),
      addDepartment: build.mutation<IDepartment, IDepartmentInput>({
        query: (data) => {
          return {
            url: "employees/Department/Create",
            method: "POST",
            body: data,
          };
        },
        transformResponse: ({ data }) => data,
      }),
      removeDepartment: build.mutation<boolean, string>({
        query: (departmentId) => {
          return {
            url: `/employees/Department/Delete/${departmentId}`,
            method: "DELETE",
          };
        },
        transformResponse: ({ data }) => data,
      }),
      addEmployees: build.mutation<IDepartment, IAddEmployeeInput>({
        query: (data) => {
          return {
            url: "employees/Department/AddEmployees",
            method: "POST",
            body: data,
          };
        },
        transformResponse: ({ data }) => data,
      }),
    };
  },
});

export default departmentApi;

export const {
  useAddDepartmentMutation,
  useAddEmployeesMutation,
  useGetAllDepartmentQuery,
  useGetDepartmentDetailQuery,
  useRemoveDepartmentMutation,
} = departmentApi;
