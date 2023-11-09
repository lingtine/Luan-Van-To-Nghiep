import { authSlice } from "./../features/auth/authSlice";
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

const baseUrl = `http://ecommerce.quochao.id.vn/`;

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
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401  ) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();

      try {
        const refreshToken = getCookie("refreshToken");
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
          // Retry the initial query\
          const data = refreshResult.data as { data: {} };

          await api.dispatch(changeAuth(data.data));

          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(logout());
        }
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
