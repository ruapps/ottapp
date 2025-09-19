import { createSlice } from "@reduxjs/toolkit";

const carouselSlice = createSlice({
  name: "carousel",
  initialState: [0, 0, 0, 0, 0, 0],
  reducers: {
    headnext: (state, action) => {
      return state[0] < action.payload.maxIndex
        ? (state = [state[0] + 1, state[1], state[2], state[3], state[4]])
        : (state = [0, state[1], state[2], state[3], state[5]]);
    },

    headprev: (state) => {
      // return state > 0 ? state - 1 : 0;
      return state[0] > 0
        ? (state = [state[0] - 1, state[1], state[2], state[3], state[4]])
        : state;
    },

    topMnext: (state, action) => {
      return state[1] < action.payload.maxIndex
        ? (state = [state[0], state[1] + 1, state[2], state[3], state[4]])
        : (state = [state[0], 0, state[2], state[3], state[4]]);
    },

    topMprev: (state) => {
      return state[1] > 0
        ? (state = [state[0], state[1] - 1, state[2], state[3], state[4]])
        : state;
    },
    playerNext: (state, action) => {
      return state[2] < action.payload.maxIndex
        ? (state = [state[0], state[1], state[2] + 1, state[3], state[4]])
        : (state = [state[0], state[1], 0, state[3], state[4]]);
    },

    playerPrev: (state) => {
      return state[2] > 0
        ? (state = [state[0], state[1], state[2] - 1, state[3], state[4]])
        : state;
    },

    // ✅ Pixel-based scrolling for labels
    labelNext: (state, action) => {
      const { maxIndex, step } = action.payload;

      // If not yet at end → scroll normally
      if (state[3] + step < maxIndex) {
        return [state[0], state[1], state[2], state[3] + step, state[4]];
      }

      // If at or beyond end → reset back to start
      return [state[0], state[1], state[2], 0, state[4]];
    },
    labelPrev: (state, action) => {
      const { step } = action.payload;
      return state[3] > 0
        ? [state[0], state[1], state[2], Math.max(state[3] - step, 0), state[4]]
        : state;
    },
    savedNext: (state, action) => {
      return state[4] < action.payload.maxIndex
        ? (state = [state[0], state[1], state[2], state[3], state[4] + 1])
        : (state = [state[0], state[1], state[2], state[3], 0]);
    },

    savedPrev: (state) => {
      return state[4] > 0
        ? (state = [state[0], state[1], state[2], state[3], state[4] - 1])
        : state;
    },
    animeNext: (state, action) => {
      return state[5] < action.payload.maxIndex
        ? (state = [
            state[0],
            state[1],
            state[2],
            state[3],
            state[4],
            state[5] + 1,
          ])
        : (state = [state[0], state[1], state[2], state[3], state[4], 0]);
    },

    animePrev: (state) => {
      return state[5] > 0
        ? (state = [
            state[0],
            state[1],
            state[2],
            state[3],
            state[4],
            state[5] - 1,
          ])
        : state;
    },
  },

  extraReducers: (builder) => {
    builder.addDefaultCase((state) =>
      !state ? (state = [0, 0, 0, 0, 0, 0]) : state
    );
  },
});

export const {
  headnext,
  headprev,
  topMnext,
  topMprev,
  playerNext,
  playerPrev,
  labelNext,
  labelPrev,
  savedNext,
  savedPrev,
  animeNext,
  animePrev,
} = carouselSlice.actions;
export default carouselSlice.reducer;
