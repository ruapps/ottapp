import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const saveMovie = createAsyncThunk("saved/addMovies", async (item) => {
  const response = await axios.post(" http://localhost:8000/items", item);
  return response.data;
});

const deleteMovie = createAsyncThunk("saved/deleteMovies", async (id) => {
  await axios.delete(`http://localhost:8000/items/${id}`);
  return id;
});

export { saveMovie, deleteMovie };
