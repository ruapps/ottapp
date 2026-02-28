import { createSlice } from "@reduxjs/toolkit";
import { updateProfile, fetchProfile } from "../Api/profileApi";

const profilecSlice = createSlice({
  name: "profile",
  initialState: {
    profile: {
      _id: " ",
      bio: " ",
      phoneNumber: " ",
      location: " ",
      user: {
        _id: " ",
        fullName: " ",
        email: " ",
        userType: " ",
      },
    },
    error: null,
    loading: {
      update: "idle",
      fetch: "idle",
    },
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading.fetch = "pending";
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading.fetch = "fulfilled";
        state.profile = action.payload;
        state.error = null;
        console.log(action.payload);
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading.fetch = "rejected";
        state.error = action.payload;
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading.update = "pending";
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading.update = "fulfilled";
        state.profile = action.payload;
        state.error = null;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading.update = "rejected";
        state.error = action.payload;
      });
  },
});

export default profilecSlice.reducer;
