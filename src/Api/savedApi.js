import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

export const saveMovie = createAsyncThunk(
  "saved/addMovies",
  async (movie, thunkAPI) => {
    try {
       await API.post("/movies/saved", {
        movieId: movie._id,
      });

      return movie; // return full movie to Redux
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const deleteMovie = createAsyncThunk(
  "saved/deleteMovies",
  async (id, thunkAPI) => {
    try {
      await API.delete(`/movies/saved/${id}`);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const fetchSavedMovies = createAsyncThunk(
  "saved/getMovies",
  async (_, thunkAPI) => {
    try {
      const res = await API.get("/movies/saved");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);
