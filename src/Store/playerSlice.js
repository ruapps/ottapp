import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const moviePlayer = createAsyncThunk(
  "player/moviePlayer",
  async (payload) => {
    // simulate async fetch
    await new Promise((resolve) => {
      let timeout;
      (function delay() {
        clearTimeout(timeout);
        timeout = setTimeout(resolve, 2000);
      })();
    });

    return payload; // resolved value goes into `fulfilled`
  }
);

const playerSlice = createSlice({
  name: "player",
  initializer: {
    item: null,
    status: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(moviePlayer.pending, (state) => {
        state.status = false;
      })
      .addCase(moviePlayer.fulfilled, (state, action) => {
        state.status = true;
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
