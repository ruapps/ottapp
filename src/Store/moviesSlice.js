import { createSlice } from "@reduxjs/toolkit";
import { fetchMovies } from "../Api/loadapi";

const movieSlice = createSlice({
  name: "movie",
  initializer: { status: "", items: [] },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.items = action.payload;
        // console.log(state.items)
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = action.payload;
      })
      .addDefaultCase((state) =>
        !state ? (state = { status: "", items: [] }) : state
      );
  },
});

export default movieSlice.reducer;
