import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

export const saveFav = createAsyncThunk(
  "saved/addFavourite",
  async (movie, thunkAPI) => {
    try {
       await API.post("/myhub/favourites", {
        movieId: movie._id,
      });

      return movie; // return full movie to Redux
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const deleteFav = createAsyncThunk(
  "saved/deleteFavourite",
  async (id, thunkAPI) => {
    try {
      await API.delete(`/myhub/favourites/${id}`);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const fetchFavourites = createAsyncThunk(
  "saved/fetchFavourites",
  async (_, thunkAPI) => {
    try {
      const res = await API.get("/myhub/favourites");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);
