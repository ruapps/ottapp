import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const SAVED_MOVIES_URL = process.env.REACT_APP_MOVIES_API_URL;

const saveMovie = createAsyncThunk("saved/addMovies", async (item) => {
  const response = await axios.post(`${SAVED_MOVIES_URL}/items`, item);
  console.log(SAVED_MOVIES_URL, "savedmovies:", response);

  return response.data;
});

const deleteMovie = createAsyncThunk("saved/deleteMovies", async (id) => {
  await axios.delete(`${SAVED_MOVIES_URL}/items/${id}`);
  return id;
});

export { saveMovie, deleteMovie };
