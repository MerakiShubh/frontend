import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  setAccessToken,
  clearUser,
  clearAccessToken,
} from "../store/feature/authSlice.js";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl,
    credentials: "include", // Include cookies in every request
    prepareHeaders: (headers, { getState }) => {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "/users/login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setAccessToken(data.data.accessToken)); // Store access token
          dispatch(setUser(data.data.user)); // Store user details
        } catch (err) {
          console.error(err);
        }
      },
    }),
    refreshAccessToken: builder.mutation({
      query: () => ({
        url: "/users/refresh-token",
        method: "POST",
      }),
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setAccessToken(data.data.accessToken)); // Refresh the access token
        } catch (err) {
          dispatch(clearUser());
          dispatch(clearAccessToken());
          console.error("Token refresh failed:", err);
        }
      },
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "/users/logout",
        method: "POST",
      }),
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          dispatch(clearUser());
          dispatch(clearAccessToken());
        } catch (err) {
          console.error("Logout failed:", err);
        }
      },
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRefreshAccessTokenMutation,
  useLogoutUserMutation,
} = apiSlice;
