import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi, getMeApi, logoutApi } from "../Api/authApi";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (data, {rejectWithValue}) => {
    try {
      const res = await loginApi(data);
      console.log("API success:", res);
      return res.data;
    } catch (err) {
      console.log("API error:", err);

      return rejectWithValue(
        err.response?.data 
      );
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  "auth/getMe",
  async (_, {rejectWithValue}) => {
   try {
      const res = await getMeApi();
      console.log("API success:", res);
      return res.data;
    } catch (err) {
      console.log("API error:", err);

      return rejectWithValue(
        err.response?.data
      );
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, {rejectWithValue}) => {
   try {
      const res = await logoutApi();
      console.log("Logout success:", res);
      return res.data;
    } catch (err) {
      console.log("API error:", err);

      return rejectWithValue(
        err.response?.data  
      );
    }
  }
);


const loginSlice = createSlice({
  name: "login",
  initialState: {
    isLoggedIn: false,
    status: "idle",
    oldInput: {},
    user: {},
    errors: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "Pending";
        state.errors = [];
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload;
        state.status = "Success";
        state.oldInput = {};
        state.errors = [];
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.errors = action.payload?.errors ;
        state.status = "Rejected";
        state.oldInput = action.payload?.oldInput || {};
      

      }).addCase(fetchCurrentUser.pending, (state) => {
        state.status = "Pending";
        state.errors = [];
        console.log(state.errors)

      }).addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload;
        state.status = "Success";
        state.errors = [];

      }).addCase(fetchCurrentUser.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.errors = action.payload.errors ;
        state.status = "Rejected";
        state.user = {};
        console.log(state.errors)

      }).addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoggedIn = false;
        state.user = {};
        state.status = action.payload.status;
      });
  },
});

export default loginSlice.reducer;
