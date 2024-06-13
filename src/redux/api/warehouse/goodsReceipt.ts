import customFetchBase from "../customFetchBase";

import { createApi } from "@reduxjs/toolkit/query/react";

import { IGoodsReceiptInput, IGoodsReceipt } from "share/types/goods-receipt";

const goodsReceiptApi = createApi({
  reducerPath: "goodsReceipt",
  baseQuery: customFetchBase,

  endpoints: (build) => ({
    createGoodsReceipt: build.mutation<IGoodsReceipt, IGoodsReceiptInput>({
      query: (data) => ({
        url: "/warehouses/goods-receipt/CreateGoodsReceipt",
        method: "POST",
        body: data,
      }),
      transformResponse: ({ data }) => data,
    }),
    approveGoodsReceipt: build.mutation<IGoodsReceipt, string>({
      query: (id) => ({
        url: "/warehouses/goods-receipt/ApproveGoodsReceipt",
        method: "POST",
        body: { goodsReceiptId: id },
      }),
      transformResponse: ({ data }) => data,
    }),
    inspectGoodsReceipt: build.mutation<IGoodsReceipt, string>({
      query: (id) => ({
        url: "/warehouses/goods-receipt/InspectGoodsReceipt",
        method: "POST",
        body: { goodsReceiptId: id },
      }),
      transformResponse: ({ data }) => data,
    }),
    cancelGoodsReceipt: build.mutation<IGoodsReceipt, string>({
      query: (id) => ({
        url: "/warehouses/goods-receipt/CancelGoodsReceipt",
        method: "POST",
        body: { goodsReceiptId: id },
      }),
      transformResponse: ({ data }) => data,
    }),
  }),
});

export const {
  useApproveGoodsReceiptMutation,
  useCancelGoodsReceiptMutation,
  useCreateGoodsReceiptMutation,
  useInspectGoodsReceiptMutation,
} = goodsReceiptApi;
export default goodsReceiptApi;
