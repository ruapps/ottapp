import { createSlice } from "@reduxjs/toolkit";
import { fetchLabels, addOrUpdateLabel } from "../Api/searchapi";

const labelSlice = createSlice({
  name: "labels",
  initialState: { items: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLabels.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(addOrUpdateLabel.fulfilled, (state, action) => {
        const updated = action.payload;

        const index = state.items.findIndex(
          (l) => l._id === updated._id
        );

        if (index !== -1) {
          state.items[index] = updated;
        } else {
          state.items.push(updated);
        }
      })
      .addDefaultCase((state) =>
        !state ? (state = { items: []}) : state
      );
  },
});

export default labelSlice.reducer;
