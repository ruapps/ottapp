import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

export const addWatchHistory = createAsyncThunk(
  "history/add",
  async (movieId, thunkAPI) => {
    try {
      const res = await API.post(
        "/watch-history",
        { movieId }
      );

      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data
      );
    }
  }
);