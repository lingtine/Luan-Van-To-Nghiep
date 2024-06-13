import customFetchBase from "../customFetchBase";

import { createApi } from "@reduxjs/toolkit/query/react";

import { IGoodsIssue, IGoodsIssueInput } from "share/types/goods-issue";

const goodsIssueApi = createApi({
  reducerPath: "goodsIssue",
  baseQuery: customFetchBase,

  endpoints: (build) => ({
    createGoodsIssue: build.mutation<IGoodsIssue, IGoodsIssueInput>({
      query: (data) => ({
        url: "/warehouses/goods-issue/CreateGoodsIssue",
        method: "POST",
        body: data,
      }),
      transformResponse: ({ data }) => data,
    }),
    approveGoodsIssue: build.mutation<any, string>({
      query: (id) => ({
        url: "/warehouses/goods-issue/ApproveGoodsIssue",
        method: "POST",
        body: { goodsIssueId: id },
      }),
      transformResponse: ({ data }) => data,
    }),
    inspectGoodsIssue: build.mutation<any, string>({
      query: (id) => ({
        url: "/warehouses/goods-issue/InspectGoodsIssue",
        method: "POST",
        body: { goodsIssueId: id },
      }),
      transformResponse: ({ data }) => data,
    }),
    cancelGoodsIssue: build.mutation<any, string>({
      query: (id) => ({
        url: "/warehouses/goods-issue/CancelGoodsIssue",
        method: "POST",
        body: { goodsIssueId: id },
      }),
      transformResponse: ({ data }) => data,
    }),
  }),
});

export const {
  useApproveGoodsIssueMutation,
  useCancelGoodsIssueMutation,
  useCreateGoodsIssueMutation,
  useInspectGoodsIssueMutation,
} = goodsIssueApi;
export default goodsIssueApi;
