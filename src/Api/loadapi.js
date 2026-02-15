import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});
 const fetchMovies = createAsyncThunk(
  "movie/getMovies",
  async (_, thunkAPI) => {
    try {
      const res= await API.get("/movies");

      return res.data; // return full movie to Redux
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export {fetchMovies};
