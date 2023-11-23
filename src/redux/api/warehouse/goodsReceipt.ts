import customFetchBase from "../customFetchBase";

import { createApi } from "@reduxjs/toolkit/query/react";

import { IGoodsReceipt } from "../types";

const goodsReceiptApi = createApi({
  reducerPath: "goodsReceipt",
  baseQuery: customFetchBase,

  endpoints: (build) => ({
    createGoodsReceipt: build.mutation({
      query: ({ id, ...rest }: IGoodsReceipt) => ({
        url: "/warehouses/goods-receipt/CreateGoodsReceipt",
        method: "POST",
        body: rest,
      }),
    }),
    approveGoodsReceipt: build.mutation({
      query: (id: string) => ({
        url: "/warehouses/goods-receipt/ApproveGoodsReceipt",
        method: "POST",
        body: { goodsReceiptId: id },
      }),
    }),
    inspectGoodsReceipt: build.mutation({
      query: (id: string) => ({
        url: "/warehouses/goods-receipt/InspectGoodsReceipt",
        method: "POST",
        body: { goodsReceiptId: id },
      }),
    }),
    cancelGoodsReceipt: build.mutation({
      query: (id: string) => ({
        url: "/warehouses/goods-receipt/CancelGoodsReceipt",
        method: "POST",
        body: { goodsReceiptId: id },
      }),
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
