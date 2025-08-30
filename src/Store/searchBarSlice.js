import { createSlice } from "@reduxjs/toolkit";

const searchBarSlice = createSlice({
  name: "serchedItems",
  initializer: { status: "", items: [], loading: "" },
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
      console.log(state.items, action.payload.searchVal);
    },
  },
  extraReducers: (builder) => {
    builder.addDefaultCase((state) =>
      !state ? (state = { status: "", items: [], loading: "" }) : state
    );
  },
});

export const { searched, setMoviesLoading } = searchBarSlice.actions;
export default searchBarSlice.reducer;
