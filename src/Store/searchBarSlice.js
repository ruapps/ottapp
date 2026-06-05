import { createSlice } from "@reduxjs/toolkit";
import { semanticSearch } from "../Api/searchapi";

const searchBarSlice = createSlice({
  name: "serchedItems",
  initializer: { status: "pending", items: [], loading: "" },
  reducers: {
    setMoviesLoading: (state) => {
      state.loading = true;
    },
    // searched: (state, action) => {
    //   state.loading = false;
    //   const searchedStr = action.payload.searchVal
    //     .toLowerCase()
    //     .split(" ")
    //     .join("");
    //   state.items = action.payload.movies.filter((item, ind) =>
    //     item.Title.toLowerCase().split(" ").join("").includes(searchedStr)
    //   );
    //   state.status = state.items.length !== 0;
    //   // console.log(state.items, action.payload.searchVal);
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(semanticSearch.pending, (state) => {
        state.loading = true;
      })

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
          ? (state = { status: "pending", items: [], loading: "" })
          : state,
      );
  },
});

export const { setMoviesLoading } = searchBarSlice.actions;
export default searchBarSlice.reducer;
