import { createSlice } from "@reduxjs/toolkit";
import { ICartDetail } from "./../../api/types";
const initialState = {
  cart: null,
} as {
  cart: null | ICartDetail;
};

export const cartSlide = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    clearCart: () => {
      console.log(1);
      return initialState;
    },
    setCart: (state, action) => {
      state.cart = action.payload;
    },
  },
});
export default cartSlide;

export const { clearCart, setCart } = cartSlide.actions;
