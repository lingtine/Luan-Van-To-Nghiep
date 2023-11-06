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
const baseUrl = `http://ecommerce.quochao.id.vn/`;

// Create a new mutex
const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl,
});

const customFetchBase: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  if ((result.error?.data as any)?.message === "You are not logged in") {
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

          console.log(refreshResult.data);
          // await api.dispatch(changeAuth(refreshResult.data.data));
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(logout());
        }
      } finally {
        // release must be called once the mutex should be released again.
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
