import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./feature/authSlice.js";
import { apiSlice } from "../api/apiSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer, // Your auth slice
    [apiSlice.reducerPath]: apiSlice.reducer, // Add the apiSlice reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware), // Add RTK Query middleware
});

export default store;
