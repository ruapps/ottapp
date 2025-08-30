import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchMovies = createAsyncThunk("movie/getMovies", async () => {
  const response = await axios.get(" http://localhost:8001/movies");
  return response.data;
});

export { fetchMovies };
