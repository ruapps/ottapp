import { createSlice } from "@reduxjs/toolkit";
import { fetchMovies } from "../Api/loadapi";

const movieSlice = createSlice({
  name: "movie",
  initializer: { status: "", items: [] },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = action.payload;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.items = action.payload;
        // console.log(state.items)
      })
      .addDefaultCase((state) =>
        !state ? (state = { status: "", items: [] }) : state
      );
  },
});

// export const {  } = carouselSlice.actions;
export default movieSlice.reducer;
