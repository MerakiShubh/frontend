import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Access the environment variable correctly
const baseUrl = import.meta.env.VITE_BASE_URL;

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl }), // Use the `baseUrl` variable here
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/users/login", // This will append to the `baseUrl`
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation } = apiSlice;
