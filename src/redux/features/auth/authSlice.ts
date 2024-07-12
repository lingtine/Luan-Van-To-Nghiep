import { createSlice } from "@reduxjs/toolkit";
import { set_cookie, delete_cookie, getCookie } from "utils/cookies/cookies";

interface IUserState {
  accessToken: string | undefined;
  refreshToken: string | undefined;
}

const initialState: IUserState = {
  accessToken: getCookie("accessToken"),
  refreshToken: getCookie("refreshToken"),
};

export const authSlice = createSlice({
  initialState,
  name: "authSlice",
  reducers: {
    logout: (state) => {
      state.accessToken = "";
      state.refreshToken = "";
      delete_cookie("accessToken");
      delete_cookie("refreshToken");
    },
    changeAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    changeRefreshToken: (state, action) => {
      state.refreshToken = action.payload;
    },
    changeAuth: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      set_cookie("accessToken", action.payload.accessToken);
      set_cookie("refreshToken", action.payload.refreshToken);
    },
  },
});

export default authSlice.reducer;

export const { logout, changeAccessToken, changeRefreshToken, changeAuth } =
  authSlice.actions;
