import { createSlice } from "@reduxjs/toolkit";
import { saveMovie, deleteMovie } from "../Api/savedApi";

const savedSlice = createSlice({
  name: "saved",
  initializer: { status: false, items: [], flag: {} },

  extraReducers: (builder) => {
    builder
      .addCase(saveMovie.fulfilled, (state, action) => {
        if (action.payload) {
          state.items.push(action.payload);
          state.flag[action.payload.id] = !state.flag[action.payload.id];
          if (!state.status) state.status = true;
          // console.log(state.flag);
        }
      })
      .addCase(saveMovie.rejected, (state, action) => {
        // state.items = action.payload;
        // console.log(state.items)
      })
      .addCase(deleteMovie.fulfilled, (state, action) => {
        delete state.flag[action.payload];
        state.items = state.items.filter((item) => item.id !== action.payload);
        if (state.items.length === 0) state.status = false;
        // console.log(action.payload.id);
        return state;
      })
      .addCase(deleteMovie.rejected, (state, action) => {
        // state.items = action.payload;
        // console.log(state.items)
      })

      .addDefaultCase((state) =>
        !state ? (state = { status: false, items: [], flag: {} }) : state
      );
  },
});

export const { addItems, delItems } = savedSlice.actions;
export default savedSlice.reducer;
