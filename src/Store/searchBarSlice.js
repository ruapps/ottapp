import { createSlice } from "@reduxjs/toolkit";

const searchBarSlice = createSlice({
  name: "serchedItems",
  initializer: { status: "pending", items: [], loading: "" },
  reducers: {
    setMoviesLoading: (state) => {
      state.loading = true;
    },
    searched: (state, action) => {
      state.loading = false;
      const searchedStr = action.payload.searchVal
        .toLowerCase()
        .split(" ")
        .join("");
      state.items = action.payload.movies.filter((item, ind) =>
        item.Title.toLowerCase().split(" ").join("").includes(searchedStr)
      );
      state.status = state.items.length !== 0;
      // console.log(state.items, action.payload.searchVal);
    },
  },
  extraReducers: (builder) => {
    builder.addDefaultCase((state) =>
      !state ? (state = { status: "pending", items: [], loading: "" }) : state
    );
  },
});

export const { searched, setMoviesLoading } = searchBarSlice.actions;
export default searchBarSlice.reducer;
