import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const fetchMovies = createAsyncThunk("movie/getMovies", async () => {
  const response = await axios.get(`${BASE_URL}'/movies'`);
  console.log(BASE_URL, "movies:", response);

  return response.data.movies;
});

export { fetchMovies };
