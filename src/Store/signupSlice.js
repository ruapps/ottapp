import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signupApi } from "../Api/authApi";

export const signupUser = createAsyncThunk(
  "auth/signup",
  async (data, thunkAPI) => {
    try {
      const res = await signupApi(data);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);


const signupSlice = createSlice({
  name: "auth/signup",
  initialState: {
        isLoggedIn: false,
        errors: [],
        status: "Pending",
        oldInput: { },
      },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.errors=[];
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn;
        state.status = action.payload.status;
        state.oldInput = {fullname: " ", email:" ", password: " ", userType:" " };
        state.errors = [];
        console.log(action.payload)
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.errors = action.payload.errors;
        state.status = action.payload.status;
        state.oldInput = action.payload.oldInput;
        console.error(state.errors)
      })

  },
});

export default signupSlice.reducer;
