import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'

import {
  signUpServiceFunc,
  loginServiceFunc,} from '../../services/user/userService'
// Define your initialState

const initialState = {
  
  userProfile: JSON.parse(localStorage.getItem("userProfile"))
    ? JSON.parse(localStorage.getItem("userProfile"))
    : [],
  data: JSON.parse(localStorage.getItem("user"))
    ? JSON.parse(localStorage.getItem("user"))
    : [],
  loading: false,
  error: null,
  success: false,


}
export const signUpSlicerFunc = createAsyncThunk("signUp", signUpServiceFunc);
export const loginSlicerFunc = createAsyncThunk("login", loginServiceFunc);


// Define your slice

const userSlice = createSlice({
    
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
       .addCase(signUpSlicerFunc.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
 
       })
       .addCase(signUpSlicerFunc.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.data = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
        localStorage.setItem("userProfile", JSON.stringify(action.payload.profile));
       })
       .addCase(signUpSlicerFunc.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.success = false;
       })
       .addCase(loginSlicerFunc.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
       })
       .addCase(loginSlicerFunc.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.userProfile = action.payload.profile;
        state.data = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
        localStorage.setItem("userProfile", JSON.stringify(action.payload.profile));
       })
       .addCase(loginSlicerFunc.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.success = false;
       });
    }
})

// Export the actions

export const {extraReducers} = userSlice.actions;

// Export the reducer

export default userSlice.reducer;










