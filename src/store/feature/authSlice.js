import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, isAuthenticated: false },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true; // Set authenticated state
    },
    clearUser(state) {
      state.user = null;
      state.isAuthenticated = false; // Clear authenticated state
    },
    setAccessToken(state, action) {
      localStorage.setItem("accessToken", action.payload); // Save access token in localStorage
    },
    clearAccessToken() {
      localStorage.removeItem("accessToken");
    },
  },
});

export const { setUser, clearUser, setAccessToken, clearAccessToken } =
  authSlice.actions;
export default authSlice.reducer;
