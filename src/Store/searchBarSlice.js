import { createSlice } from "@reduxjs/toolkit";
import { semanticSearch } from "../Api/searchapi";

const searchBarSlice = createSlice({
  name: "serchedItems",
  initializer: { status: "pending", items: [], loading: false },
  reducers: {
    setMoviesLoading: (state) => {
      state.loading = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(semanticSearch.fulfilled, (state, action) => {
        state.loading = false;

        state.items = action.payload;

        state.status = action.payload.length > 0;
      })

      .addCase(semanticSearch.rejected, (state) => {
        state.loading = false;

        state.items = [];

        state.status = false;
      })
      .addDefaultCase((state) =>
        !state
          ? (state = { status: "pending", items: [], loading: false })
          : state,
      );
  },
});

export const { setMoviesLoading } = searchBarSlice.actions;
export default searchBarSlice.reducer;
