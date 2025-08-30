import { createSlice } from "@reduxjs/toolkit";
import { addLabel, updateLabel } from "../Api/searchapi";

const labelSlice = createSlice({
  name: "labelstate",
  initializer: { status: "", items: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addLabel.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(addLabel.rejected, (state, action) => {
        // state.status = action.payload;
      })
      .addCase(updateLabel.fulfilled, (state, action) => {
        const ind = state.items.findIndex((e) => e.id === action.payload.id);
        state.items.splice(ind, 1, action.payload);
      })
      .addCase(updateLabel.rejected, (state, action) => {})
      .addDefaultCase((state) =>
        !state ? (state = { status: "", items: [], loading: "" }) : state
      );
  },
});

// export const { searched, setMoviesLoading } = searchBarSlice.actions;
export default labelSlice.reducer;
