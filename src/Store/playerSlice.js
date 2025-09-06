import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const moviePlayer = createAsyncThunk(
  "player/moviePlayer",
  async (payload) => {
    // simulate async fetch
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return payload; // resolved value goes into `fulfilled`
  }
);

const playerSlice = createSlice({
  name: "player",
  initializer: {
    item: null,
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(moviePlayer.pending, (state) => {
        state.status = "pending";
      })
      .addCase(moviePlayer.fulfilled, (state, action) => {
        state.status = "success";
        state.item = action.payload;
      })
      .addDefaultCase((state) =>
        !state
          ? (state = {
              item: null,
              status: "idle",
            })
          : state
      );
  },
});

export default playerSlice.reducer;
