import { createSlice } from "@reduxjs/toolkit";

const carouselSlice = createSlice({
  name: "carousel",
  initialState: [0, 0, 0, 0],
  reducers: {
    headnext: (state, action) => {
      return state[0] < action.payload.maxIndex
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
      return state[1] < action.payload.maxIndex
        ? (state = [state[0], state[1] + 1, state[2], state[3]])
        : (state = [state[0], 0, state[2], state[3]]);
    },

    topMprev: (state) => {
      return state[1] > 0
        ? (state = [state[0], state[1] - 1, state[2], state[3]])
        : state;
    },
    playerNext: (state, action) => {
      return state[2] < action.payload.maxIndex
        ? (state = [state[0], state[1], state[2] + 1, state[3]])
        : (state = [state[0], state[1], 0, state[3]]);
    },

    playerPrev: (state) => {
      return state[2] > 0
        ? (state = [state[0], state[1], state[2] - 1, state[3]])
        : state;
    },

    // ✅ Pixel-based scrolling for labels
    labelNext: (state, action) => {
      const { maxIndex, step } = action.payload;

      // If not yet at end → scroll normally
      if (state[3] + step < maxIndex) {
        return [state[0], state[1], state[2], state[3] + step];
      }

      // If at or beyond end → reset back to start
      return [state[0], state[1], state[2], 0];
    },
    labelPrev: (state, action) => {
      const { step } = action.payload;
      return state[3] > 0
        ? [state[0], state[1], state[2], Math.max(state[3] - step, 0)]
        : state;
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
  playerNext,
  playerPrev,
  labelNext,
  labelPrev,
} = carouselSlice.actions;
export default carouselSlice.reducer;
