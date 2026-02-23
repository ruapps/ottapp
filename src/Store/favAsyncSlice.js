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
    loading: { save: null, delete: null, fetch: null },
  },
  reducers: {
    savedFlag: (state, action) => {
      state.flag[action.payload] = true;
    },
    delFlag: (state, action) => {
      delete state.flag[action.payload];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchFavourites.pending, (state) => {
        state.loading.fetch = "pending";
        state.error = null;
      })
      .addCase(fetchFavourites.fulfilled, (state, action) => {
        state.items = action.payload;

        action.payload.forEach((movie) => {
          state.flag[movie._id] = true;
        });

        state.status = state.items.length > 0;
        state.loading.fetch = "fulfilled";
      })
      .addCase(fetchFavourites.rejected, (state, action) => {
        state.error = action.payload;
        state.items.forEach((movie) => {
          delete state.flag[movie._id];
        });
        state.items= [];
        state.status = false;
        state.loading.fetch = "rejected";
        console.log(state.error);
      })
      .addCase(saveFav.fulfilled, (state, action) => {
        const movie = action.payload;
        state.items.push(movie);
        state.status = true;
        state.flag[movie._id] = true;
        state.loading.save = "fulfilled";
        console.log("Movie saved successfully:", movie);
      })
      .addCase(saveFav.rejected, (state, action) => {
        state.error = action.payload;
        state.loading.save = "rejected";
        console.log(state.error);
      })
      .addCase(
        deleteFavourites.pending,
        (state) => (state.loading.delete = "pending"),
      )
      .addCase(deleteFavourites.fulfilled, (state, action) => {
        const id = action.payload;
        state.items = state.items.filter((item) => item._id !== id);

        if (state.items.length === 0) {
          state.status = false;
        }
        delete state.flag[id];
        state.loading.delete = "fulfilled";
        console.log("Movie deleted successfully:", id);
      })
      .addCase(deleteFavourites.rejected, (state, action) => {
        state.error = action.payload;
        state.loading.delete = "rejected";
        console.log(state.error);
      });
  },
});

export const { savedFlag, delFlag } = favAsyncSlice.actions;

export default favAsyncSlice.reducer;
