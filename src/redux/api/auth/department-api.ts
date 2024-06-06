import { IDepartmentInput } from "./../types";
import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "../customFetchBase";

const departmentApi = createApi({
  reducerPath: "department",
  baseQuery: customFetchBase,
  endpoints(build) {
    return {
      getAllDepartment: build.query({
        query: () => {
          return {
            url: "/employees/Department/Get",
            method: "GET",
          };
        },
      }),
      getDepartmentDetail: build.query({
        query: (departmentId: string) => {
          return {
            url: `/employees/Department/Get/${departmentId}`,
          };
        },
      }),
      addDepartment: build.mutation({
        query: (data: IDepartmentInput) => {
          return {
            url: "employees/Department/Create",
            method: "POST",
            body: data,
          };
        },
      }),
      removeDepartment: build.mutation({
        query: (departmentId: string) => {
          return {
            url: `/employees/Department/Delete/${departmentId}`,
            method: "POST",
          };
        },
      }),
      addEmployees: build.mutation({
        query: (data: { departmentId: string; employeeIds: string[] }) => {
          return {
            url: "employees/Department/AddEmployees",
            method: "POST",
            body: data,
          };
        },
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
