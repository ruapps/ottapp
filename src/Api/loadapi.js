import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const fetchMovies = createAsyncThunk("movie/getMovies", async () => {
  const response = await axios.get(`${BASE_URL}/movies`);
  return response.data;
});

export { fetchMovies };

console.log("API BASE_URL:", BASE_URL);
