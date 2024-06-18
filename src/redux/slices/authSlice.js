import { createSlice } from "@reduxjs/toolkit";
import { fetchAuthMe, userLogin, userRegister } from "../actions/authActions";

// initialize userToken from local storage
const userToken = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;

const initialState = {
  data: null,
  error: null,
  errorPath: null,
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
        state.error = null;
        state.errorPath = null;
      })
      .addCase(userLogin.fulfilled, (state, { payload }) => {
        state.status = "loaded";
        state.data = payload;
        state.userToken = payload.userToken;
      })
      .addCase(userLogin.rejected, (state, { payload }) => {
        state.status = "error";
        state.data = null;
        state.error = payload.data.errors[0].msg;
        state.errorPath = payload.data.errors[0].path;
      })
      .addCase(userRegister.pending, (state) => {
        state.status = "loading";
        state.data = null;
        state.error = null;
      })
      .addCase(userRegister.fulfilled, (state, { payload }) => {
        state.status = "loaded";
        state.data = payload;
        state.userToken = payload.userToken;
      })
      .addCase(userRegister.rejected, (state, { payload }) => {
        state.status = "error";
        state.data = null;
        state.error = payload.data.errors[0].msg;
        state.errorPath = payload.data.errors[0].path;
      })
      .addCase(fetchAuthMe.pending, (state) => {
        state.status = "loading";
        state.data = null;
        state.error = null;
      })
      .addCase(fetchAuthMe.fulfilled, (state, { payload }) => {
        state.status = "loaded";
        state.data = payload;
        state.userToken = payload.userToken;
      })
      .addCase(fetchAuthMe.rejected, (state, { payload }) => {
        state.status = "error";
        state.data = null;
        state.error = payload?.data.errors[0].msg;
        state.errorPath = payload?.data.errors[0].path;
      });
  },
});

export const selectIsAuth = (state) => Boolean(state.auth.data);
export const selectIsError = (state) => Boolean(state.auth.error);

export const authReducer = authSlice.reducer;
export const { logout } = authSlice.actions;
