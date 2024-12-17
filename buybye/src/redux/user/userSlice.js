/* eslint-disable no-debugger */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  signUpServiceFunc,
  loginServiceFunc,
} from "../../services/user/userService";
// Define your initialState

const initialState = {
  userProfile: localStorage.getItem("userProfile")
    ? JSON.parse(localStorage.getItem("userProfile"))
    : null,
  data: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  loading: false,
  error: null,
  success: false,
};

export const signUpSlicerFunc = createAsyncThunk("signUp", signUpServiceFunc);
export const loginSlicerFunc = createAsyncThunk("login", loginServiceFunc);

// Define your slice

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUpSlicerFunc.pending, (state) => {
        debugger;
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(signUpSlicerFunc.fulfilled, (state, action) => {
        debugger;
        state.loading = false;
        state.success = true;
        state.data = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
        localStorage.setItem("userProfile", JSON.stringify(action.payload));
      })
      .addCase(signUpSlicerFunc.rejected, (state, action) => {
        debugger;
        state.loading = false;
        state.error = action.error.message;
        state.success = false;
      })
      .addCase(loginSlicerFunc.pending, (state) => {
        debugger;
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(loginSlicerFunc.fulfilled, (state, action) => {
        debugger;
        state.loading = false;
        state.success = true;
        state.userProfile = action.payload;
        state.data = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
        localStorage.setItem("userProfile", JSON.stringify(action.payload));
      })
      .addCase(loginSlicerFunc.rejected, (state, action) => {
        debugger;
        state.loading = false;
        state.error = action.error.message;
        state.success = false;
      });
  },
});

// Export the actions

// Export the reducer

export default userSlice.reducer;
