import { createSlice } from "@reduxjs/toolkit";

const carouselSlice = createSlice({
  name: "carousel",
  initializer: [0, 0, 0, 0],
  reducers: {
    headnext: (state, action) => {
      return state[0] < action.payload - 3
        ? (state = [state[0] + 1, state[1], state[2], state[3]])
        : (state = [0, state[1], state[2], state[3]]);
    },

    headprev: (state) => {
      // return state > 0 ? state - 1 : 0;
      return state[0] > 0
        ? (state = [state[0] - 1, state[1], state[2], state[3]])
        : state;
    },

    topMnext: (state, action) => {
      return state[1] < action.payload - 7
        ? (state = [state[0], state[1] + 1, state[2], state[3]])
        : (state = [state[0], 0, state[2], state[3]]);
    },

    topMprev: (state) => {
      return state[1] > 0
        ? (state = [state[0], state[1] - 1, state[2], state[3]])
        : state;
    },
    clipsNext: (state, action) => {
      return state[2] < action.payload - 4
        ? (state = [state[0], state[1], state[2] + 1, state[3]])
        : (state = [state[0], state[1], 0, state[3]]);
    },
    clipsPrev: (state) => {
      return state[2] > 0
        ? (state = [state[0], state[1], state[2] - 1, state[3]])
        : state;
    },
    labelNext: (state, action) => {
      return state[3] < action.payload - 3
        ? (state = [state[0], state[1], state[2], state[3] + 1])
        : (state = [state[0], state[1], state[2], 0]);
    },
  },

  extraReducers: (builder) => {
    builder.addDefaultCase((state) =>
      !state ? (state = [0, 0, 0, 0]) : state
    );
  },
});

export const {
  headnext,
  headprev,
  topMnext,
  topMprev,
  clipsNext,
  clipsPrev,
  labelNext,
} = carouselSlice.actions;
export default carouselSlice.reducer;
