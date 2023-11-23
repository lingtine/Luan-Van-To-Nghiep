import customFetchBase from "../customFetchBase";

import { createApi } from "@reduxjs/toolkit/query/react";

import { IReport } from "../types";

const reportApi = createApi({
  reducerPath: "report",
  baseQuery: customFetchBase,
  tagTypes: ["add", "remove"],
  endpoints: (build) => ({
    getReports: build.query({
      query: () => ({
        url: "/warehouses/reports",
        method: "GET",
      }),
      providesTags: ["add", "remove"],
      transformResponse: (response: { data: IReport[] }) => response.data,
    }),
    createReport: build.mutation({
      query: ({ id, ...ref }: IReport) => ({
        url: "/warehouses/reports",
        method: "POST",
        body: ref,
      }),
      invalidatesTags: ["add"],
    }),
    getReport: build.query({
      query: (reportId: string) => ({
        url: `/warehouses/reports/${reportId}`,
        method: "GET",
      }),
      transformResponse: (response: { data: IReport }) => response.data,
    }),
    approveReport: build.mutation({
      query: (reportId: string) => ({
        url: `/warehouses/reports/approve/${reportId}`,
        method: "POST",
      }),
    }),
    inspectReport: build.mutation({
      query: (reportId: string) => ({
        url: `/warehouses/reports/inspect/${reportId}`,
        method: "POST",
      }),
    }),
    cancelReport: build.mutation({
      query: (reportId: string) => ({
        url: `/warehouses/reports/cancel/${reportId}`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useApproveReportMutation,
  useCancelReportMutation,
  useCreateReportMutation,
  useGetReportQuery,
  useGetReportsQuery,
  useInspectReportMutation,
} = reportApi;
export default reportApi;
