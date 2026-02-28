import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

export const updateProfile = createAsyncThunk(
  "profile/update",
  async (profileData, thunkAPI) => {
    try {
       const res = await API.put("/profile", profileData);
        console.log("in thunk:", res.data)
      return res.data; // return updated profile data to Redux
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const fetchProfile = createAsyncThunk(
  "profile/fetch",
  async (_, thunkAPI) => {
    try {
      const res = await API.get("/profile");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);
