import { createSlice } from "@reduxjs/toolkit";
import {
  saveFav,
  deleteFavourites,
  fetchFavourites,
} from "../Api/favouritesApi";

const favAsyncSlice = createSlice({
  name: "saved",
  initialState: {
    status: false,
    items: [],
    flag: {},
    error: null,
    loading: {
      save: "idle",
      delete: "idle",
      fetch: "idle",
    },
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchFavourites.pending, (state) => {})
      .addCase(fetchFavourites.fulfilled, (state, action) => {
        state.items = action.payload;

        action.payload.forEach((movie) => {
          state.flag[movie._id] = true;
        });

        state.status = state.items.length > 0;
      })
      .addCase(fetchFavourites.rejected, (state, action) => {
        state.error = action.payload;
        state.items.forEach((movie) => {
          delete state.flag[movie._id];
        });
        state.items = [];
        state.status = false;
        console.log(state.error);
      })
      .addCase(saveFav.fulfilled, (state, action) => {
        const movie = action.payload;
        state.items.push(movie);
        state.flag[movie._id] = true;
        state.status = true;
      })
      .addCase(saveFav.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(deleteFavourites.pending, (state) => {
        state.loading.delete = "pending";
        state.error = null;
      })
      .addCase(deleteFavourites.fulfilled, (state, action) => {
        state.loading.delete = "fulfilled";
        const id = action.payload;
        delete state.flag[id];
        state.items = state.items.filter((item) => item._id !== id);

        if (state.items.length === 0) {
          state.status = false;
        }
      })
      .addCase(deleteFavourites.rejected, (state, action) => {
        state.loading.delete = "rejected";
        state.error = action.payload;
      });
  },
});

export default favAsyncSlice.reducer;
