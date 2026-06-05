import { createSlice } from "@reduxjs/toolkit";
import { fetchRecommendations } from "../Api/recommendationApi";

const recommendationSlice =
    createSlice({
        name: "recommendations",

        initialState: {
            items: [],
            loading: false,
            error: null
        },

        reducers: {},

        extraReducers: (builder) => {

            builder

                .addCase(
                    fetchRecommendations.pending,
                    (state) => {

                        state.loading = true;

                    }
                )

                .addCase(
                    fetchRecommendations.fulfilled,
                    (state, action) => {

                        state.loading = false;

                        state.items =
                            action.payload;

                    }
                )

                .addCase(
                    fetchRecommendations.rejected,
                    (state, action) => {

                        state.loading = false;

                        state.error =
                            action.payload;

                    }
                );

        }

    });

export default
    recommendationSlice.reducer;