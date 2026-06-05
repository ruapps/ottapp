import { createSlice } from "@reduxjs/toolkit";

const carouselSlice = createSlice({
  name: "carousel",
  initialState: [0, 0, 0, 0, 0, 0, 0, 0],
  reducers: {
    headnext: (state, action) => {
      return state[0] < action.payload.maxIndex
        ? (state = [state[0] + 1, state[1], state[2], state[3], state[4], state[5], state[6], state[7]])
        : (state = [0, state[1], state[2], state[3], state[4], state[5], state[6], state[7]]);
    },

    headprev: (state) => {
      // return state > 0 ? state - 1 : 0;
      return state[0] > 0
        ? (state = [state[0] - 1, state[1], state[2], state[3], state[4], state[5], state[6], state[7]])
        : state;
    },

    topMnext: (state, action) => {
      return state[1] < action.payload.maxIndex
        ? (state = [state[0], state[1] + 1, state[2], state[3], state[4], state[5], state[6], state[7]])
        : (state = [state[0], 0, state[2], state[3], state[4], state[5], state[6], state[7]]);
    },

    topMprev: (state) => {
      return state[1] > 0
        ? (state = [state[0], state[1] - 1, state[2], state[3], state[4], state[5], state[6], state[7]])
        : state;
    },
    recommendationNext: (state, action) => {
      return state[2] < action.payload.maxIndex
        ? (state = [state[0], state[1], state[2] + 1, state[3], state[4], state[5], state[6], state[7]])
        : (state = [state[0], state[1], 0, state[3], state[4], state[5], state[6], state[7]]);
    },

    recommendationPrev: (state) => {
      return state[2] > 0
        ? (state = [state[0], state[1], state[2] - 1, state[3], state[4], state[5], state[6], state[7]])
        : state;
    },

    playerMovieClipNext: (state, action) => {
      return state[3] < action.payload.maxIndex
        ? (state = [state[0], state[1], state[2], state[3] + 1 , state[4], state[5], state[6], state[7]])
        : (state = [state[0], state[1], state[2], 0, state[4], state[5], state[6], state[7]]);
    },

    playerMovieClipPrev: (state) => {
      return state[3] > 0
        ? (state = [state[0], state[1], state[2], state[3] - 1, state[4], state[5], state[6], state[7]])
        : state;
    },

    playerEpisodesNext: (state, action) => {
      return state[4] < action.payload.maxIndex
        ? (state = [state[0], state[1], state[2], state[3], state[4] + 1, state[5], state[6], state[7]])
        : (state = [state[0], state[1], state[2], state[3], 0, state[5], state[6], state[7]]);
    },

    playerEpisodesPrev: (state) => {
      return state[4] > 0
        ? (state = [state[0], state[1], state[2], state[3], state[4] - 1, state[5], state[6], state[7]])
        : state;
    },

    //  Pixel-based scrolling for labels
    labelNext: (state, action) => {
      const { maxIndex, step } = action.payload;

      // If not yet at end → scroll normally
      if (state[5] + step < maxIndex) {
        return [state[0], state[1], state[2], state[3], state[4], state[5] + step, state[6], state[7]];
      }

      // If at or beyond end → reset back to start
      return [state[0], state[1], state[2], state[3], state[4], 0, state[6], state[7]];
    },
    labelPrev: (state, action) => {
      const { step } = action.payload;
      return state[5] > 0
        ? [state[0], state[1], state[2], state[3], state[4], Math.max(state[5] - step, 0), state[6], state[7]]
        : state;
    },
    savedNext: (state, action) => {
      return state[6] < action.payload.maxIndex
        ? (state = [state[0], state[1], state[2], state[3], state[4], state[5], state[6] + 1, state[7]])
        : (state = [state[0], state[1], state[2], state[3], state[4], state[5], 0, state[7]]);
    },

    savedPrev: (state) => {
      return state[6] > 0
        ? (state = [state[0], state[1], state[2], state[3], state[4], state[5], state[6] - 1, state[7]])
        : state;
    },
    animeNext: (state, action) => {
      return state[7] < action.payload.maxIndex
        ? (state = [
            state[0],
            state[1],
            state[2],
            state[3],
            state[4],
            state[5],
            state[6],
            state[7] + 1
          ])
        : (state = [state[0], state[1], state[2], state[3], state[4], state[5], state[6], 0]);
    },

    animePrev: (state) => {
      return state[7] > 0
        ? (state = [
            state[0],
            state[1],
            state[2],
            state[3],
            state[4],
            state[5],
            state[6],
            state[7] - 1,
          ])
        : state;
    },
  },

  extraReducers: (builder) => {
    builder.addDefaultCase((state) =>
      !state ? (state = [0, 0, 0, 0, 0, 0, 0 ,0]) : state
    );
  },
});

export const {
  headnext,
  headprev,
  topMnext,
  topMprev,
  recommendationNext,
  recommendationPrev,
  playerMovieClipNext,
  playerMovieClipPrev,
  playerEpisodesNext,
  playerEpisodesPrev,
  labelNext,
  labelPrev,
  savedNext,
  savedPrev,
  animeNext,
  animePrev,
} = carouselSlice.actions;
export default carouselSlice.reducer;
