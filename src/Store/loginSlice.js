import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi, getMeApi, logoutApi } from "../Api/authApi";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (data, thunkAPI) => {
    try {
      const res = await loginApi(data);
      console.log("API success:", res);
      return res.data;
    } catch (err) {
      console.log("API error:", err);

      return thunkAPI.rejectWithValue(
        err.response?.data || { errors: ["Something went wrong"] }
      );
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  "auth/getMe",
  async (_, thunkAPI) => {
   try {
      const res = await getMeApi();
      console.log("API success:", res);
      return res.data;
    } catch (err) {
      console.log("API error:", err);

      return thunkAPI.rejectWithValue(
        err.response?.data || { errors: ["Something went wrong"] }
      );
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, thunkAPI) => {
   try {
      const res = await logoutApi();
      console.log("Logout success:", res);
      return res.data;
    } catch (err) {
      console.log("API error:", err);

      return thunkAPI.rejectWithValue(
        err.response?.data || { errors: ["Something went wrong"] }
      );
    }
  }
);


const loginSlice = createSlice({
  name: "login",
  initialState: {
    isLoggedIn: false,
    errors: [],
    status: null,
    oldInput: {},
    user: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "Pending";
        state.errors = [];
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn;
        state.user = action.payload.user;
        state.status = action.payload.status;
        state.oldInput = {};
        state.errors = [];
        console.log(action.payload)
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.errors = action.payload?.errors || ["Login failed"];
        state.status = "Rejected";
        state.oldInput = action.payload?.oldInput || {};
        console.log(state.errors)

      }).addCase(fetchCurrentUser.pending, (state) => {
        state.status = "Pending";
      }).addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn;
        state.user = action.payload.user;
        state.status = action.payload.status;
        state.oldInput = {};
        state.errors = [];
      }).addCase(fetchCurrentUser.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.errors = action.payload?.errors || ["Failed to fetch user"];
        state.status = "Rejected";
        state.oldInput = {};
        console.log(state.errors)
      }).addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn;
        state.user = {};
        state.status = action.payload.status;
        state.oldInput = {};
        state.errors = [];
      });
  },
});

export default loginSlice.reducer;
