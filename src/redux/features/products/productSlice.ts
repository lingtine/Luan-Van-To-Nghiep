import { createSlice } from "@reduxjs/toolkit";

interface IProductDetailParams {
  OrderBy?: string;
  IsOrderDesc?: boolean;
  CategoryGroupId?: string;
  CategoryId?: string;
  BrandId?: string;
  MinPrice?: string;
  MaxPrice?: string;
  IsInStock?: number;
  Keyword?: string;
  PageIndex?: number;
  PageSize?: number;
}

const initialState: IProductDetailParams = {};

export const ProductDetailAdmin = createSlice({
  initialState,
  name: "product-detail",
  reducers: {
    clear() {
      return initialState;
    },
    onChange(
      state,
      action: { payload: { label: string; value: number | string | boolean } }
    ) {},
  },
});

export default ProductDetailAdmin.reducer;
