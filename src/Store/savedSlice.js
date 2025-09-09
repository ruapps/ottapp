import { createSlice } from "@reduxjs/toolkit";

const savedSlice = createSlice({
  name: "saved",
  initializer: { status: false, items: [], flag: {} },
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
      state.flag[action.payload.id] = true;
      state.status = true;
    },
    delItem: (state, action) => {
      delete state.flag[action.payload];
      state.items = state.items.filter((item) => item.id !== action.payload);
      if (state.items.length === 0) state.status = false;
    },
  },

  extraReducers: (builder) => {
    builder.addDefaultCase((state) =>
      !state ? (state = { status: false, items: [], flag: {} }) : state
    );
  },
});

export const { addItem, delItem } = savedSlice.actions;
export default savedSlice.reducer;
