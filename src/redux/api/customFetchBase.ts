import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { Mutex } from "async-mutex";
import { logout } from "../features/auth/authSlice";
import { getCookie } from "utils/cookies/cookies";
import { changeAuth } from "../features/auth/authSlice";

import type { RootState } from "../store";

const baseUrl = process.env.REACT_APP_BACKEND_URL;

// Create a new mutex
const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).authSlice.accessToken;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
      return headers;
    }
  },
});

const customFetchBase: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      const { getState } = api;
      try {
        const refreshToken = (getState() as RootState).authSlice.refreshToken;
        const refreshResult = await baseQuery(
          {
            url: "auths/auth/refresh-token",
            method: "POST",
            body: { refreshToken: refreshToken },
          },
          api,
          extraOptions
        );
        if (refreshResult.data) {
          const data = refreshResult.data as { data: {} };
          await api.dispatch(changeAuth(data.data));
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(logout());
        }
      } catch {
      } finally {
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

export default customFetchBase;
