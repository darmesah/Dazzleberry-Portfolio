import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  token: "",
  isAuth: "false",
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.isAuth = true;
      state.token = action.payload;
    },
    logout(state, action) {
      state.isAuth = false;
      state.token = "";

      localStorage.removeItem("adminData");
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
