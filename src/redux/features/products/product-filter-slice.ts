import { IFilterProduct } from "./../../api/types";
import { createSlice } from "@reduxjs/toolkit";
import { ISort } from "share/types";

import type { PayloadAction } from "@reduxjs/toolkit";

interface IFilterProductParameter {
  sort?: ISort;
  pageSize: number;
  pageIndex: number;
  brandIds: string[];
  categoryIds: string[];
  filterValues: IFilterProduct[];
  isFilter: boolean;
}

const initialState: IFilterProductParameter = {
  brandIds: [],
  categoryIds: [],
  filterValues: [],
  pageIndex: 0,
  pageSize: 24,
  sort: undefined,
  isFilter: false,
};

export const productFilterSlice = createSlice({
  initialState,
  name: "product-filter",
  reducers: {
    handleChangeBrand(state, action: PayloadAction<string>) {
      const brandIndex = state.brandIds.findIndex(
        (brandId) => brandId === action.payload
      );

      if (brandIndex === -1) {
        state.brandIds.push(action.payload);
      } else {
        state.brandIds.splice(brandIndex, 1);
      }

      state.isFilter = !(
        state.brandIds.length === 0 &&
        state.categoryIds.length === 0 &&
        state.filterValues.length === 0
      );
    },

    handleChangeFilter(state, action: PayloadAction<IFilterProduct>) {
      const filterIndex = state.filterValues.findIndex(
        (filter) =>
          filter.specificationId === action.payload.specificationId &&
          filter.value === action.payload.value
      );
      if (filterIndex === -1) {
        state.filterValues.push(action.payload);
      } else {
        state.filterValues.splice(filterIndex, 1);
      }

      state.isFilter = !(
        state.brandIds.length === 0 &&
        state.categoryIds.length === 0 &&
        state.filterValues.length === 0
      );
    },

    handleChangeCategory(state, action: PayloadAction<string>) {
      const categoryIndex = state.categoryIds.findIndex(
        (categoryId) => categoryId === action.payload
      );

      if (categoryIndex === -1) {
        state.categoryIds.push(action.payload);
      } else {
        state.categoryIds.splice(categoryIndex, 1);
      }
      state.isFilter = !(
        state.brandIds.length === 0 &&
        state.categoryIds.length === 0 &&
        state.filterValues.length === 0
      );
    },
    handleSort(state, action: PayloadAction<ISort>) {
      state.sort = action.payload;
    },
    handleChangePage(state, action: PayloadAction<number>) {
      state.pageIndex = action.payload;
    },
    handleClearFilter(state) {
      state.brandIds = [];
      state.categoryIds = [];
      state.filterValues = [];
    },

    handleClearSort(state) {
      state.sort = undefined;
    },
  },
});

export default productFilterSlice.reducer;

export const {
  handleChangeBrand,
  handleChangeCategory,
  handleChangeFilter,
  handleSort,
  handleClearFilter,
  handleClearSort,
  handleChangePage,
} = productFilterSlice.actions;
