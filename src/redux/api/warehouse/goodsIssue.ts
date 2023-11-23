import customFetchBase from "../customFetchBase";

import { createApi } from "@reduxjs/toolkit/query/react";

import { IGoodsIssue } from "../types";

const goodsIssueApi = createApi({
  reducerPath: "goodsIssue",
  baseQuery: customFetchBase,

  endpoints: (build) => ({
    createGoodsIssue: build.mutation({
      query: ({ id, ...rest }: IGoodsIssue) => ({
        url: "/warehouses/goods-issue/CreateGoodsIssue",
        method: "POST",
        body: rest,
      }),
    }),
    approveGoodsIssue: build.mutation({
      query: (id: string) => ({
        url: "/warehouses/goods-issue/ApproveGoodsIssue",
        method: "POST",
        body: { goodsIssueId: id },
      }),
    }),
    inspectGoodsIssue: build.mutation({
      query: (id: string) => ({
        url: "/warehouses/goods-issue/InspectGoodsIssue",
        method: "POST",
        body: { goodsIssueId: id },
      }),
    }),
    cancelGoodsIssue: build.mutation({
      query: (id: string) => ({
        url: "/warehouses/goods-issue/CancelGoodsIssue",
        method: "POST",
        body: { goodsIssueId: id },
      }),
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
