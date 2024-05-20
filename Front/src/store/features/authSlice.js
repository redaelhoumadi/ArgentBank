import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const getAccessToken = () => Cookies.get("access_token") || "";

const initialState = {
  access_token: getAccessToken(),
  isAuthenticated: !!getAccessToken(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { access_token } = action.payload;
      state.access_token = access_token;
      state.isAuthenticated = true;
      Cookies.set("access_token", access_token);
    },

    clearCredentials: (state) => {
      state.access_token = "";
      state.isAuthenticated = false;
      Cookies.remove("access_token");
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;
