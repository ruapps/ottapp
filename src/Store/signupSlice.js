import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signupApi } from "../Api/authApi";

export const signupUser = createAsyncThunk(
  "auth/signup",
  async (data, {rejectWithValue}) => {
    try {
      const res = await signupApi(data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);


const signupSlice = createSlice({
  name: "auth/signup",
  initialState: {
        isLoggedIn: false,
        errors: [],
        status: "idle",
        oldInput: { },
      },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.errors=[];
        state.status = "Pending";
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.status = "Success";
        state.oldInput = {fullname: " ", email:" ", password: " ", userType:" " };
        state.errors = [];
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.errors = action.payload.errors;
        state.status = "Rejected";
        state.oldInput = action.payload.oldInput;
      })

  },  
});

export default signupSlice.reducer;
