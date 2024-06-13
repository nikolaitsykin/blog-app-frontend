import { createSlice } from "@reduxjs/toolkit";
import { fetchAuthMe, userLogin, userRegister } from "../actions/authActions";

// initialize userToken from local storage
const userToken = localStorage.getItem("token")
  ? localStorage.getItem("token")
  : null;

const initialState = {
  data: null,
  error: null,
  status: "loading",
  userToken,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
      window.localStorage.removeItem("token");
    },
  },
  extraReducers(builder) {
    builder
      .addCase(userLogin.pending, (state) => {
        state.status = "loading";
        state.data = null;
      })
      .addCase(userLogin.fulfilled, (state, { payload }) => {
        state.status = "loaded";
        state.data = payload;
        state.userToken = payload.userToken;
      })
      .addCase(userLogin.rejected, (state) => {
        state.status = "error";
        state.data = null;
      })
      .addCase(userRegister.pending, (state) => {
        state.status = "loading";
        state.data = null;
      })
      .addCase(userRegister.fulfilled, (state, { payload }) => {
        state.status = "loaded";
        state.data = payload;
        state.userToken = payload.userToken;
      })
      .addCase(userRegister.rejected, (state) => {
        state.status = "error";
        state.data = null;
      })
      .addCase(fetchAuthMe.pending, (state) => {
        state.status = "loading";
        state.data = null;
      })
      .addCase(fetchAuthMe.fulfilled, (state, { payload }) => {
        state.status = "loaded";
        state.data = payload;
        state.userToken = payload.userToken;
      })
      .addCase(fetchAuthMe.rejected, (state) => {
        state.status = "error";
        state.data = null;
      });
  },
});

export const selectIsAuth = (state) => Boolean(state.auth.data);
export const authReducer = authSlice.reducer;
export const { logout } = authSlice.actions;
