import { IUserDetail } from "./../../api/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
} as {
  user: null | IUserDetail;
};

export const userSlide = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    logout: () => initialState,
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});
export default userSlide;

export const { logout, setUser } = userSlide.actions;
