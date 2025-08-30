import {createSlice} from '@reduxjs/toolkit';

const playerSlice = createSlice({
    name: "player",
    initializer: [],
    reducers: {
        moviePlayer: (state, action) => {
            state[0] = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
          .addDefaultCase(state => !state? state = [] : state)
      },
});

export const { moviePlayer } = playerSlice.actions;
export default playerSlice.reducer;
