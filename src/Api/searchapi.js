import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

export const semanticSearch = createAsyncThunk(
  "search/semanticSearch",
  async (query, thunkAPI) => {
    try {
      const res = await API.get(
        `/movies/search?q=${encodeURIComponent(query)}`,
      );

      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  },
);

export const addOrUpdateLabel = createAsyncThunk(
  "labels/addOrUpdate",
  async (text, thunkAPI) => {
    try {
      const res = await API.post("/labels", { text });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);

export const fetchLabels = createAsyncThunk(
  "labels/get",
  async (_, thunkAPI) => {
    try {
      const res = await API.get("/labels");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);
