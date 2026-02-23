import { createSlice } from "@reduxjs/toolkit";
import { saveFav, deleteFav, fetchFavourites } from "../Api/favouritesApi";

const favAsyncSlice = createSlice({
  name: "saved",
  initialState: { status: false, items: [], flag: {}, error: null },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchFavourites.pending, (state) => {  })
      .addCase(fetchFavourites.fulfilled, (state, action) => {
        state.items = action.payload;

        action.payload.forEach((movie) => {
          state.flag[movie._id] = true;
        });

        state.status = state.items.length > 0;
      })
      .addCase(fetchFavourites.rejected, (state, action) => { state.items = []; state.error = action.payload; console.log(state.error);})
      .addCase(saveFav.fulfilled, (state, action) => {
        const movie = action.payload;
        state.items.push(movie);
        state.flag[movie._id] = true;
        state.status = true;
        console.log("Movie saved successfully:", movie);
      })
      .addCase(saveFav.rejected, (state, action) => { state.error = action.payload; console.log(state.error)})
      .addCase(deleteFav.fulfilled, (state, action) => {
        const id = action.payload;
        delete state.flag[id];
        state.items = state.items.filter((item) => item._id !== id);

        if (state.items.length === 0) {
          state.status = false;
        }
        console.log("Movie deleted successfully:", id); 
      })
      .addCase(deleteFav.rejected, (state, action) => { state.error = action.payload; console.log(state.error)});
  },
});

export default favAsyncSlice.reducer;