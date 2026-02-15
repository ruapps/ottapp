import { createSlice } from "@reduxjs/toolkit";
import { saveMovie, deleteMovie, fetchSavedMovies } from "../Api/savedApi";

const savedAsyncSlice = createSlice({
  name: "saved",
  initialState: { status: false, items: [], flag: {}, error: null },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchSavedMovies.pending, (state) => { state.status = false;  })
      .addCase(fetchSavedMovies.fulfilled, (state, action) => {
        state.items = action.payload;

        action.payload.forEach((movie) => {
          state.flag[movie._id] = true;
        });

        state.status = state.items.length > 0;
      })
      .addCase(fetchSavedMovies.rejected, (state, action) => { state.status = false; state.items = []; console.log(action.payload);})
      .addCase(saveMovie.fulfilled, (state, action) => {
        const movie = action.payload;
        state.items.push(movie);
        state.flag[movie._id] = true;
        state.status = true;
        console.log("Movie saved successfully:", movie);
      })
      .addCase(saveMovie.rejected, (state, action) => {  console.log(action.payload)})
      .addCase(deleteMovie.fulfilled, (state, action) => {
        const id = action.payload;
        delete state.flag[id];
        state.items = state.items.filter((item) => item._id !== id);

        if (state.items.length === 0) {
          state.status = false;
        }
        console.log("Movie deleted successfully:", id); 
      })
      .addCase(deleteMovie.rejected, (state, action) => {console.log(action.payload)});
  },
});

export default savedAsyncSlice.reducer;
