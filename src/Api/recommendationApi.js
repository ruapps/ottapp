import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

export const fetchRecommendations =
  createAsyncThunk(
    "recommendations/get",
    async (_, thunkAPI) => {
      try {

        const res = await API.get(
          "/movies/recommendations"
        );

        return res.data;

      } catch (err) {

        return thunkAPI.rejectWithValue(
          err.response?.data
        );

      }
    }
  );