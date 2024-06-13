import customFetchBase from "../customFetchBase";

import { createApi } from "@reduxjs/toolkit/query/react";

import {
  IReport,
  IReportInput,
  IReportPage,
  IReportParam,
} from "share/types/report";

const reportApi = createApi({
  reducerPath: "report",
  baseQuery: customFetchBase,
  tagTypes: ["add", "remove", "change-status"],
  endpoints: (build) => ({
    getReports: build.query<IReportPage, IReportParam>({
      query: (params) => ({
        url: "/warehouses/reports",
        method: "GET",
        params,
      }),
      providesTags: ["add", "remove", "change-status"],
    }),
    createReport: build.mutation<IReport, IReportInput>({
      query: (data) => ({
        url: "/warehouses/reports",
        method: "POST",
        body: data,
      }),
      transformResponse: ({ data }) => data,
      invalidatesTags: ["add"],
    }),
    getReport: build.query<IReport, string>({
      query: (reportId) => ({
        url: `/warehouses/reports/${reportId}`,
        method: "GET",
      }),
      transformResponse: ({ data }) => data,
    }),
    approveReport: build.mutation<IReport, string>({
      query: (reportId: string) => ({
        url: `/warehouses/reports/approve/${reportId}`,
        method: "POST",
      }),
      transformResponse: ({ data }) => data,
      invalidatesTags: ["change-status"],
    }),
    inspectReport: build.mutation<IReport, string>({
      query: (reportId) => ({
        url: `/warehouses/reports/inspect/${reportId}`,
        method: "POST",
      }),
      transformResponse: ({ data }) => data,

      invalidatesTags: ["change-status"],
    }),
    cancelReport: build.mutation<IReport, string>({
      query: (reportId) => ({
        url: `/warehouses/reports/cancel/${reportId}`,
        method: "POST",
      }),
      transformResponse: ({ data }) => data,
      invalidatesTags: ["change-status"],
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
